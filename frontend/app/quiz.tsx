import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function Quiz() {
    const router = useRouter();
    const [percent, setPercent] = useState(25);
    const [questionIndex, setQuestionIndex] = useState(0);
    const testQuestions = [
        { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 0 },
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 1 },
        { question: 'What is our team name?', options: ['IntellectInk', 'CometClaim', 'WanderLust', 'Abis'], answer: 0 },
      ];
    
      return (
        <ScrollView style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/images/discussion_bg.png')}
                  style={styles.imagebg}/>
              </View>
        
              <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, {alignSelf: 'flex-start', marginHorizontal: 30,}]}>Quiz</Text>
                <View style={styles.lvlContainer}>
                    <View style={styles.lvlBar}>
                        <View style={[styles.lvlFill, {width: `${percent}%`}]}></View>        
                    </View>
                    <View style={styles.lvlText}>
                        <Text style={[textStyles.pageHeader, {fontSize: 17}]}>{percent}%</Text>
                    </View>
                </View>

                <View style={styles.topicContainer}>
                  <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Quiz Title</Text>
                  <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Description</Text>
                    <Buttons
                    title='Start'
                    variant='purple'
                    onPress={() => router.push('/topicQuestion1')}
                    />
              </View>
              </View> 
        </ScrollView>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imagebg: {
      resizeMode: 'cover',
      width: '100%',
      height: 680,
      aspectRatio: 0.6317,
    },
    imageContainer: {
      width: '100%',
      position: 'absolute',
      marginTop: 350,
    },
    textContainer: {
      marginTop: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topicContainer: {
      marginTop: '30%',
      backgroundColor: 'white',
      width: '80%',
      height: 250,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
      padding: 10,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.25,
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
});