import { Text, View, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTimeTracker } from "../app/hooks/useTimeTracker";
import { textStyles } from "./stylesheets/textStyles";
import { LinearGradient } from "expo-linear-gradient";
import Buttons from "./components/buttons";
import TrackWrapper from "../app/layouts/trackWrapper";
import Item from "./components/item";
import { ngrokPath, isExpoMode } from "./utils";
import axios from "axios";

export default function ReadMore() {
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const parseItem = JSON.parse(item as string);
    
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
      const [recommended, setRecommended] = useState<favorites[]>([]);

    console.log("item is: " + item);
    console.log(parseItem);
    console.log(parseItem.type)

    useEffect(() => {
        const fetchData = async () => {
            const recommendedArr: favorites[] = [];
            if(parseItem.type === "article") {
                try{
                    const response = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/article/shuffle`);
          
                    for(let i = 0; i < 2; i++){
                      response.data[i].author = response.data[i].author.substr(3);
                      const transformedData = {
                        id: response.data[i]._id,
                        type: "article",
                        image: `https://static01.nyt.com/${response.data[i].urlToImage}` || "",
                        title: response.data[i].title,
                        author: response.data[i].author,
                        link: response.data[i].url,
                        summary: response.data[i].description,
                        topic: response.data[i].topic,
                      }
                        recommendedArr.push(transformedData);
                      // console.log(response.data[i])
                    }
                  } catch(error){
                    console.log(error);
                  }
            }
            if(parseItem.type === "book") {
                try{
          
                    const bookResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/book/shuffle`);
          
                    for(let i = 0; i < 2; i++){
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
                        topic: bookResponse.data[i].topic,
                      }
                        recommendedArr.push(transformedData);
                    }
                  }catch(error){
                    console.log(error);
                  }
            }
            if(parseItem.type === "news") {
                try{
                    const newsResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/news/shuffle`);
                    for(let i = 0; i < 2; i++){
                      const transformedData = {
                        id: newsResponse.data[i]._id,
                        type: "news",
                        image: newsResponse.data[i].urlToImage || "",
                        title: newsResponse.data[i].title,
                        author: newsResponse.data[i].author,
                        link: newsResponse.data[i].url,
                        summary: newsResponse.data[i].description,
                        topic: newsResponse.data[i].topic,
                      }
                        recommendedArr.push(transformedData);
                    }
                  }catch(error){
                    console.log(error)
                  }
            }
            if(parseItem.type === "poem") {
                try{
                    const poemResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/poem/shuffle`);
                    for(let i = 0; i < 2; i++){
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
                        topic: poemResponse.data[i].topic,
                      }
                      
                        recommendedArr.push(transformedData);
                    }
                  }catch(error){
                    console.log(error)
                  }
            }
            if(parseItem.type === "paper") {
                try{
                    const paperResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/paper/shuffle`);
                    for(let i = 0; i < 2; i++){
                      let author = "";
                      if(paperResponse.data[i].author[0] == "Unknown Author") author = "";
                      const transformedData = {
                        id: paperResponse.data[i]._id,
                        type: "paper",
                        title: paperResponse.data[i].title,
                        author: author,
                        summary: paperResponse.data[i].abstract,
                        link: paperResponse.data[i].url,
                        topic: paperResponse.data[i].topic,
                      }
                      
                        recommendedArr.push(transformedData);
                    }
                  }catch(error){
                    console.log(error)
                  }
            }
        
            setRecommended(recommendedArr);
        }

        
        fetchData();
    }, []);

    
    
       

    return (
        <TrackWrapper>
        <LinearGradient
        colors={["#4F3F7F", "#615796", "#646EA3"]}
        style={styles.container}
        >
            <ScrollView style={styles.container}>
              <View style={styles.textContainer}>
                <TouchableOpacity
                    style={{alignSelf: 'flex-start', marginBottom: 20}}
                    onPress={() => {router.back()}}>
                    <Text style={textStyles.subheadingWhite}>{`< Back`}</Text>
                </TouchableOpacity>
              
                <View style={styles.contentContainer}>
                    <View style={styles.mediaTag}>
                        <Text style={textStyles.subheadingWhite}>{parseItem.type}</Text>
                    </View>      
                    <View style={{ padding: 10 }}>
                        <Text style={textStyles.heading2purple}>{parseItem.title}</Text>
                        {parseItem.author && <Text style={[textStyles.subheading, {marginBottom: 20}]}>By: {parseItem.author}</Text> }
                        {parseItem.type === "poem" ? (
                        <Text style={textStyles.subheading}>{parseItem.poem}</Text>
                        ) : (
                        <View>
                            <Text style={textStyles.heading2purple}>Summary:</Text>
                            <Text style={textStyles.subheading}>{parseItem.summary}</Text>
                        </View>
                        )}
                    </View>

                    <View style={{width: '75%', alignSelf: 'center', paddingVertical: 20}}>
                        <Buttons
                            title='More info'
                            variant='purple'
                            onPress={() => Linking.openURL(parseItem.link)}
                        />
                        <Buttons
                            title='Discussion'
                            variant='purple'
                            onPress={() => router.push(`/discussion?id=${parseItem.id}`)}
                        />
                    </View>
                </View>
                    <Text style={textStyles.heading2}>You may also like</Text>
                    
                    {/* allocate data to these and use formatting from search page for each item */}
                    {/* <View style={styles.relevantBox}>
                        <View>
                            <Text style={textStyles.heading2purple}>
                                Title
                            </Text>
                            <Text style={textStyles.subheading}>
                                Author
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyles.heading2purple}> {`>`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.relevantBox}>
                        <View>
                            <Text style={textStyles.heading2purple}>
                                Title
                            </Text>
                            <Text style={textStyles.subheading}>
                                Author
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyles.heading2purple}> {`>`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}

                {recommended.map((item) => (
                    <Item key={item.id} item={item} />
                ))}

             </View>
            </ScrollView>
        </LinearGradient>
        </TrackWrapper>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      marginTop: 50,
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    mediaTag: {
        width: "100%",
        height: 40,
        backgroundColor: "#736F96",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      contentContainer: {
        backgroundColor: "white",
        borderRadius: 15,
        textAlign: "center",
        width: 370,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      relevantBox: {
        width: 370,
        height: 90,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        marginTop: 20,
        padding: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
});