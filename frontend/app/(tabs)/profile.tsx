import { Text, ScrollView, View, Switch, Image, StyleSheet, TextInput, TouchableOpacity, FlatList} from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import CheckBox from "../components/checkbox";
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { ngrokPath, isExpoMode } from "../utils";

export default function Profile() {
  const [image, setImage] = useState("");
  const selectPhoto = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  const router = useRouter();
  const [name, setName] = useState("name")
  const [isEditing, setIsEditing] = useState(false);
  const [medias, setMedias] = useState<string[]>([]);
  const options = [
    { value: 'poem', label: 'poem' },
    { value: 'article', label: 'article' },
    { value: 'book', label: 'book' },
    { value: 'news', label: 'news' },
    { value: 'paper', label: 'paper' },
  ];
  interface favorites {
    id: string;
    type: string;
    image?: string;
    title: string;
    author: string;
    link?: string;
    summary?: string;
    poem?: string;
  }
  const [favoriteItems, setFavorites] = useState<favorites[]>([]);
  const favorite: favorites[] = [];

  const Item = ({ item }: { item: ItemProps }) => (
    <View style={styles.favorites}>
    <Text style={textStyles.heading2purple}>{item.title}</Text>
  </View>
  );
  type ItemProps = {
    id: string,
    title: string,
    };

  const [dailyNotifications, setDailyNotifications] = useState(false);
  const [time, setTimeState] = useState(new Date());
  const handleTimeChange = (event: any, date: Date | undefined) => {
    const { type } = event;
    if (type === 'set' && date) {
      setTimeState(date);
    }
  };

  const [count,setCount]=useState(0)
    const plus = ()=>{
      setCount(count + 5)
    }
    const minus = ()=>{
      if (count > 0)
        setCount(count - 5)
    }
  

  const handleSubmit = async () => {
    // console.log("handling submit");
    setIsEditing(!isEditing)
    try{
      const payload = {
        name: name,
        media: medias,
        dailyReadingTime: count,
        notification: dailyNotifications,
        // notificationTime: time,
      }
      // if(name){
      //   console.log(name + medias + count + dailyNotifications)
      // }
      
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/update-profile`, payload, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          Authorization: `Bearer ${token}`
        }
      })
    }
    catch (error){
      if (axios.isAxiosError(error)) {
        if(error.response){
            console.log('Error: ', error.response.data)
        }
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/get-profile`, {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            Authorization: `Bearer ${token}`
          }
        });

        // setProfile(response.data);
        setCount(response.data.dailyReadingTime)
        setName(response.data.name)
        setMedias(response.data.media)
        setDailyNotifications(response.data.notification)
        // favorite.push(response.data.favorites)
        // console.log(response.data.favorites)
        
        for(let i = 0; i < response.data.favorites.itemType.length; i++){
          // console.log(response.data.favorites.itemType[i]);
          if(response.data.favorites.itemType[i] == "article"){
            // route to get article based on objectId
            console.log("processing article");
            let id = response.data.favorites.itemId[i]
            const articleById = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/article/getById`, {itemId: id}, {
              headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });
            favorite.push(articleById.data.articleById);
            console.log(articleById.data.articleById);
          }

          if(response.data.favorites.itemType[i] == "book"){
            // route to get book based on objectId
            console.log("processing book");
            let id = response.data.favorites.itemId[i]
            const bookById = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/book/getById`, {itemId: id}, {
              headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });
            favorite.push(bookById.data.bookById);
            console.log(bookById.data.bookById);
          }

          if(response.data.favorites.itemType[i] == "poem"){
            // route to get poem based on objectId
            console.log("processing poem");
            let id = response.data.favorites.itemId[i]
            const poemById = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/poem/getById`, {itemId: id}, {
              headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });
            favorite.push(poemById.data.poemById);
            console.log(poemById.data.poemById);
          }

          if(response.data.favorites.itemType[i] == "news"){
            // route to get news based on objectId
            console.log("processing news");
            let id = response.data.favorites.itemId[i]
            const newsById = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/news/getById`, {itemId: id}, {
              headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });
            favorite.push(newsById.data.newsById);
            console.log(newsById.data.newsById);
          }

          if(response.data.favorites.itemType[i] == "paper"){
            // route to get paper based on objectId
            console.log("processing paper");
            let id = response.data.favorites.itemId[i]
            const paperById = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/paper/getById`, {itemId: id}, {
              headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });
            favorite.push(paperById.data.paperById);
            console.log(paperById.data.paperById);
          }
        }
        // I want to be able to take this id and find the right article




        // setFavorites(favorite)
        // console.log("favorite array: " + favorite);
        // setTimeState(response.data.notificationTime)
        console.log(response.data)
        // console.log("Favorites: " + JSON.stringify(favorite))
        setFavorites(favorite);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []));

  return (
    <ScrollView style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/profilebg.png')}
          style={styles.image}/>
      </View>

      <View style={styles.textContainer}>
        
        <Text style={textStyles.pageHeader}>{isEditing?"Edit Profile":"Profile"}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 60,}}>
            {isEditing? (
              <TouchableOpacity onPress={selectPhoto}>
                <Image
                  source={image ? { uri: image } : require('../../assets/images/pfp.png')}
                  style={styles.pfpImg}/>
              </TouchableOpacity>
            ):(
              <Image
                source={image ? { uri: image } : require('../../assets/images/pfp.png')}
                style={styles.pfpImg}/>
            )}
            {isEditing? (
              <View>
                <TouchableOpacity
                    style={[styles.button, {marginBottom: 10}]}
                    onPress={handleSubmit/*()=>setIsEditing(!isEditing)*/}>
                    <Text style={textStyles.subheading}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>setIsEditing(!isEditing)}>
                  <Text style={textStyles.subheading}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ):(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>setIsEditing(!isEditing)}>
                    <Text style={textStyles.subheading}>Edit Profile</Text>
                </TouchableOpacity>
            )}
            
        </View>

        <View style={styles.leftContainer}>
            {isEditing? (
                <View style={{marginTop: 20}}>
                    <Text style={textStyles.heading2}>Change Name</Text>
                    <TextInput style={styles.inputContainer} value={name} onChangeText={setName}/>
                </View>
            ):(
                <View style={{marginTop: 45, marginBottom: 40, alignSelf: 'center'}}>
                    <Text style={textStyles.heading1}>Hello, {name}</Text>
                </View>
            )}
          
          <Text style={[textStyles.heading1, {marginTop: 30}]}>Preferences</Text>
        
          <Text style={[textStyles.heading2, {marginVertical: 20}]}>Media</Text>
          <CheckBox
            options={options}
            checkedValues={medias}
            onChange={isEditing ? (updatedValues) => setMedias(updatedValues) : () => {}}
          />
          <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Daily Goal</Text>
        
        </View>

        {isEditing? (
            <View style={styles.goalContainer}>
            <Text style={textStyles.subheading}>Set your daily time goal</Text>

            {<View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={minus}>
                <Text style={textStyles.pageHeader}>-</Text>
                </TouchableOpacity>
                <Text style={textStyles.pageHeader}> {count} </Text>
                <TouchableOpacity onPress={plus}>
                <Text style={textStyles.pageHeader}>+</Text>
                </TouchableOpacity>
            </View>}

            <Text style={textStyles.subheading}>minutes/day</Text>
            </View>
        ):(
            <View style={styles.goalContainer}>
            <Text style={textStyles.subheading}>Your daily time goal is</Text>
                <Text style={textStyles.pageHeader}> {count} </Text>
            <Text style={textStyles.subheading}>minutes/day</Text>
            </View>
        )}

        <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Notifications</Text>
        <View style={styles.notifications}>
          <Text style={[textStyles.subheading]}>Daily Reminder</Text>
          {isEditing? (
            <Switch value={dailyNotifications}
            onValueChange={() => setDailyNotifications((previousState) => !previousState)}
            trackColor={{false: "#E2E2E2", true: "#646EA3"}}
            thumbColor={dailyNotifications ? "#413F6F" : "white"}
          />
          ):(
            <Text style={textStyles.subheading}>{dailyNotifications?"ON":"OFF"}</Text>
          )}
          
        </View>
        {isEditing && dailyNotifications && (
            <View style={styles.notificationsExpanded}>
              <Text style={textStyles.subheading}>Set Time</Text>
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                onChange={handleTimeChange}
                themeVariant="light"
                accentColor="#413F6F"
              />
            </View>
        )}
        <Text style={[textStyles.heading1, {marginVertical: 20, marginTop: 50,}]}>Favorites</Text>
        <View style={{width: 315}}>
        <FlatList
            data={favoriteItems.filter(item => item && item.id)}
            renderItem={({ item }) => <Item item={item} />}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
        />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  imageContainer: {
      width: '100%',
      height: '60%',
      marginTop: 120,
  },
  image: {
      resizeMode: 'cover',
      width: '100%',
      height: undefined,
      aspectRatio: 0.275,
  },
  pfpImg: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    borderRadius: 55,
    borderColor: '#646EA3',
    borderWidth: 4,
},
  textContainer: {
      position: "absolute",
      top: 50,
      alignSelf: 'center',
  },
  leftContainer: {
      alignSelf: 'flex-start',
      width: '100%',
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderRadius: 5,
      elevation: 10,
      alignItems: 'center',
      height: 50,
      fontSize: 20,
      paddingHorizontal: 15,
      marginBottom: 15,
  },
  button: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      height: 45,
      width: 160,
      marginLeft: 20,
  },
  goalContainer: {
    width: '100%',
    height: 170,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  notifications: {
    width: '100%',
    height: 50,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
  },
  notificationsExpanded: {
    width: '100%',
    height: 50,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: -7,
  },
  favorites: {
    backgroundColor: 'white',
    padding: 10,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
});
