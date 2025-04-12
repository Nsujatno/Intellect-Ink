import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { textStyles } from "../stylesheets/textStyles";
import Buttons from "../components/buttons";
import { useTimeTracker } from "../hooks/useTimeTracker";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios'
import { transform } from "@babel/core";
import { ngrokPath, isExpoMode } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SubjectItem {
  id: string;
  type: string;
  image?: string;
  title: string;
  author: string;
  link?: string;
  summary?: string;
  poem?: string;
}

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [state, setState] = useState({ page: 0 });
  const [level, setLevel] = useState(0);
  // const [percent, setPercent] = useState(50);
  const [percent, setPercent] = useState(0);
  const [viewedCategories, setViewedCategories] = useState<Set<string>>(new Set());
  const [dailyGoal, setDailyGoal] = useState(30);
  const [timeReadToday, setTimeReadToday] = useState(0);

  // Store liked and favorited items
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [favoritedItems, setFavoritedItems] = useState<{ [key: string]: boolean }>({});

  // Time tracking for different categories
  const booksTracker = useTimeTracker("books");
  const poemsTracker = useTimeTracker("poem");
  const newsTracker = useTimeTracker("news");

  const [forYouItems, setForYouItems] = useState<SubjectItem[]>([]);
  const [exploreItems, setExploreItems] = useState<SubjectItem[]>([]);


  useEffect(() => {
    const loadProgress = async () => {
      const localData = await AsyncStorage.getItem("userProgress");
      if (localData) {
        const { level, percent, viewedCategories, dailyGoal, timeReadToday } = JSON.parse(localData);
        setLevel(level || 0);
        setPercent(percent || 0);
        setViewedCategories(new Set(viewedCategories || []));
        setDailyGoal(dailyGoal || 30);
        setTimeReadToday(timeReadToday || 0);
      }
    };
    loadProgress();
  }, []);

  const saveProgress = async () => {
    const progressData = {
      viewedCategories: [...viewedCategories],
      dailyGoal,
      timeReadToday,
      level,
      percent
    };
    await AsyncStorage.setItem("userProgress", JSON.stringify(progressData));
  };

  // calculate updated progress
  useEffect(() => {
    // for every different category the user views, awards 26.6% per category to reach a 80% max
    const categoryProgress = (viewedCategories.size / 3) * 80; // adjust this once more categories are implemented

    // awards 20% for progress if daily reading goal is completed
    const goalProgress = timeReadToday >= dailyGoal ? 20 : 0; // const goalProgress = Math.min((timeReadToday / dailyGoal) * 67, 67);
    
    // 100% max
    const totalProgress = Math.round(categoryProgress + goalProgress);
    setPercent(totalProgress);
    if (totalProgress >= 100) {
      setLevel(prev => prev + 1);
      setPercent(0);
      saveProgress();
    }
  }, [viewedCategories, timeReadToday, dailyGoal]);

  const handleBookmark = async (item: ItemProps) => {
    try{
      const payload = {
        favorites: {
          itemId: item.id,
          itemType: item.type
        }
      };
      const token = await AsyncStorage.getItem('token');
      // console.log("handling bookmark")
      // console.log("payload: " + JSON.stringify(payload))
      
      const response = await axios.put(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/update-favorites`, payload, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          Authorization: `Bearer ${token}`,
        }
      })
      // console.log(response);
    } catch (error){
      console.log("error")
    }
    
  }

  const handleReadMore = (item: ItemProps) => {
    // track category
    const updatedCategories = new Set(viewedCategories).add(item.type);
    setViewedCategories(updatedCategories);

    // start timing
    if (item.type === "book") booksTracker.startTiming();
    else if (item.type === "poem") poemsTracker.startTiming();
    else if (item.type === "news") newsTracker.startTiming();

    router.push({ pathname: "/readMore", params: { item: JSON.stringify(item) } });
  };

  type ItemProps = {
    id: string,
    type: string,
    image?: string,
    title: string;
    author: string;
    summary?: string;
    poem?: string;
    link?: string;
  };

  const Item = ({ item }: { item: ItemProps }) => (
    <View style={styles.contentContainer}>
      {item.image ?(
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <Image source={require('../../assets/images/Homebg.png')} style={styles.image} />
      )}
      <View style={styles.mediaTag}>
        <Text style={textStyles.subheadingWhite}>{item.type}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={textStyles.heading2purple}>{item.title}</Text>
        {item.author && <Text style={[textStyles.subheading, {marginBottom: 20}]}>By: {item.author}</Text>}
        {item.type === "poem" ? (
          <View style={{height: 200, overflow: 'hidden'}}>
            <Text style={textStyles.subheading}>{item.poem}</Text>
          </View>
        ) : (
          <View style={{height: 200, overflow: 'hidden'}}>
            <Text style={textStyles.heading2purple}>Summary:</Text>
            <Text style={textStyles.subheading}>{item.summary}</Text>
          </View>
        )}
      </View>
      <View style={styles.pageButtons}>
        <View style={{ flexDirection: "row", flex: 1, marginRight: 100 }}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => {
              setLikedItems((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }));
            }}
          >
            <Ionicons name={likedItems[item.id] ? "heart" : "heart-outline"} size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => {
              handleBookmark(item);
              setFavoritedItems((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }));
            }}
          >
            <Ionicons name={favoritedItems[item.id] ? "bookmark" : "bookmark-outline"} size={27} color={"white"} />
          </TouchableOpacity>
        </View>
        <Buttons
          title="Read More"
          variant="purple"
          onPress={() => handleReadMore(item)} // Start timing based on type
        />
      </View>
    </View>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = await AsyncStorage.getItem('token');
        if (!token) return;
        const profileResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/get-profile`, {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            Authorization: `Bearer ${token}`
          }
        });
        
        let media: string[] = profileResponse.data.media;
        console.log("user media is: " + media)
        
        
        // Fetch and process explore content
        const exploreItemsArr: SubjectItem[] = [];
        const forYouItemsArr: SubjectItem[] = [];

        //article
        try{
          const response = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/article/shuffle`);

          for(let i = 0; i < response.data.length; i++){
            response.data[i].author = response.data[i].author.substr(3);
            const transformedData = {
              id: response.data[i]._id,
              type: "article",
              image: `https://static01.nyt.com/${response.data[i].urlToImage}` || "",
              title: response.data[i].title,
              author: response.data[i].author,
              link: response.data[i].url,
              summary: response.data[i].description,
            }
            if (!exploreItemsArr.some(subject => subject.id === transformedData.id)) {
              exploreItemsArr.push(transformedData);
            }
            // console.log(response.data[i])
          }
        } catch(error){
          console.log(error);
        }
        

        // books
        try{
          
          const bookResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/book/shuffle`);

          for(let i = 0; i < bookResponse.data.length; i++){
            if(bookResponse.data[i].author.length == 0){
              bookResponse.data[i].author = bookResponse.data[i].publisher
            }
            else{
              bookResponse.data[i].author = bookResponse.data[i].author[0]
            }
            const transformedData = {
              id: bookResponse.data[i]._id,
              type: "book",
              image: bookResponse.data[i].thumbnail || "",
              title: bookResponse.data[i].title,
              author: bookResponse.data[i].author,
              link: bookResponse.data[i].previewLink,
              summary: bookResponse.data[i].description,
            }
            if (!exploreItemsArr.some(subject => subject.id === transformedData.id)) {
              exploreItemsArr.push(transformedData);
            }
          }
        }catch(error){
          console.log(error);
        }
        


        // news
        try{
          const newsResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/news/shuffle`);
          for(let i = 0; i < newsResponse.data.length; i++){
            const transformedData = {
              id: newsResponse.data[i]._id,
              type: "news",
              image: newsResponse.data[i].urlToImage || "",
              title: newsResponse.data[i].title,
              author: newsResponse.data[i].author,
              link: newsResponse.data[i].url,
              summary: newsResponse.data[i].description,
            }
            if (!exploreItemsArr.some(subject => subject.id === transformedData.id)) {
              exploreItemsArr.push(transformedData);
            }
          }
        }catch(error){
          console.log(error)
        }
        


        //poem
        try{
          const poemResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/poem/shuffle`);
          for(let i = 0; i < poemResponse.data.length; i++){
            let poem = "";
            for(let j = 0; j < poemResponse.data[i].lines.length; j++){
              poem = poem + poemResponse.data[i].lines[j] + "\n"
            }
            const transformedData = {
              id: poemResponse.data[i]._id,
              type: "poem",
              title: poemResponse.data[i].title,
              author: poemResponse.data[i].author,
              poem: poem,
            }
            
            if (!exploreItemsArr.some(subject => subject.id === transformedData.id)) {
              exploreItemsArr.push(transformedData);
            }
          }
        }catch(error){
          console.log(error)
        }

        //research paper
        try{
          const paperResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/paper/shuffle`);
          for(let i = 0; i < paperResponse.data.length; i++){
            let author = "";
            if(paperResponse.data[i].author[0] == "Unknown Author") author = "";
            const transformedData = {
              id: paperResponse.data[i]._id,
              type: "paper",
              title: paperResponse.data[i].title,
              author: author,
              summary: paperResponse.data[i].abstract,
              link: paperResponse.data[i].url,
            }
            
            if (!exploreItemsArr.some(subject => subject.id === transformedData.id)) {
              exploreItemsArr.push(transformedData);
            }
          }
        }catch(error){
          console.log(error)
        }
        
        for (let i = exploreItemsArr.length - 1; i >= 0; i--) {
          if (media.includes(exploreItemsArr[i].type)) {
            forYouItemsArr.push(exploreItemsArr[i]);
            exploreItemsArr.splice(i, 1);
          }
        }

        // randomizes explore page
        const randomizedExplore = [...exploreItemsArr];
        for (let i = randomizedExplore.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedExplore[i], randomizedExplore[j]] = [randomizedExplore[j], randomizedExplore[i]];
        }
        // randomizes for you page
        const randomizedForYou = [...forYouItemsArr];
        for (let i = randomizedForYou.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedForYou[i], randomizedForYou[j]] = [randomizedForYou[j], randomizedForYou[i]];
        }
        setExploreItems(randomizedExplore);
        setForYouItems(randomizedForYou)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground
        source={require('../../assets/images/Homebg.png')}
        style={styles.imagebg}>

        <View style={styles.container}>
            <SwitchSelector
                initial={0}
                onPress={(value: number) => setState({ page: value })}
                textColor={"white"}
                selectedColor={"#413F6F"}
                backgroundColor={"#736F96"}
                buttonColor={"#E3E2EA"}
                borderColor={"#736F96"}
                hasPadding
                valuePadding={3}
                style={{ width: 200, marginTop: 50, marginBottom: 15 }}
                options={[
                { label: "For You", value: 0 },
                { label: "Explore", value: 1 },
                ]}
            />
            {state.page === 0 ? (
              <FlatList
              data={forYouItems}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              pagingEnabled={true}
              showsVerticalScrollIndicator={false}
              horizontal={false}
            />
          ) : (
            <FlatList
              data={exploreItems}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.id}
              pagingEnabled={true}
              showsVerticalScrollIndicator={false}
              horizontal={false}
            />
            )}
            <View style={styles.lvlContainer}>
                <View style={styles.lvlBar}>
                    <View style={[styles.lvlFill, {width: `${percent}%`}]}>
                        {/* <Image
                            source={require('../../assets/images/fish.png')}
                            style={{alignSelf: "flex-end"}}
                        /> */}
                    </View>        
                </View>
                <View style={styles.lvlText}>
                    <Text style={[textStyles.pageHeader, {fontSize: 17}]}>{percent}%</Text>
                    <Text style={[textStyles.pageHeader, {fontSize: 17}]}>LVL {level}</Text>
                </View>
            </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "flex-start",
    textAlign: "center",
    height: 610,
    width: 370,
    marginBottom: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  lvlContainer: {
    borderRadius: 30,
    width: 370,
    height: 50,
    marginVertical: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  lvlBar: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 15,
    width: 370,
    height: 50,
    marginVertical: 15,
  },
  lvlFill: {
    backgroundColor: "white",
    borderRadius: 0,
    height: 42,
  },
  lvlText: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 18,
  },
  image: {
    width: "100%",
    height: "25%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  circleButton: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: "#413F6F",
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pageButtons: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  mediaTag: {
    width: 70,
    height: 35,
    backgroundColor: "#413F6F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    top: 110,
    right: 10,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  imagebg: {
    resizeMode: 'cover',
    width: '100%',
    height: undefined,
    aspectRatio: 0.51,
    flex: 1,
  },
});
