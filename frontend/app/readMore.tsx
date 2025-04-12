import { Text, View, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTimeTracker } from "../app/hooks/useTimeTracker";
import { textStyles } from "./stylesheets/textStyles";
import { LinearGradient } from "expo-linear-gradient";
import Buttons from "./components/buttons";
import TrackWrapper from "../app/layouts/trackWrapper";
import Item from "./components/item";

export default function ReadMore() {
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const parseItem = JSON.parse(item as string);
    
    const testSubjects = [
        {
            id: '1',
            type: 'book',
            image: 'https://i5.walmartimages.com/seo/Harry-Potter-and-the-Chamber-of-Secrets-9780807281949_57baa93a-bf72-475f-a16a-a8a68527b723.8bcd0fed9c3a1130f7ead9251ea885be.jpeg',
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'JK Rowling',
            summary: 'Harry a 2nd year student at Hogwarts starts hearing mysterious voices in serpent’s tongue. When unusual tragedies start occurring, him and his friends search for answers.',
            link: 'https://www.barnesandnoble.com/w/harry-potter-and-the-chamber-of-secrets-j-k-rowling/1004338523?ean=9780439064866',    
        },
        {
            id: '2',
            type: 'news',
            image: '',
            title: 'Chuck E. Cheese wants to be the Costco of family fun',
            author: 'Savannah Sellers and Alexandra Byrne',
            summary: 'Chuck E. Cheese wants you to stop by as frequently as you pick up groceries, and it’s selling subscription plans to sweeten the pitch',
            link: 'https://www.nbcnews.com/business/consumer/chuck-e-cheese-wants-costco-family-fun-rcna195652',    
        },
    ]
       

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
                            onPress={() => router.push('/discussion')}
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

                {testSubjects.map((item) => (
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