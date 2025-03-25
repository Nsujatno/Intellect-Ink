import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function Discussion() {
      const router = useRouter();

      return (
        <ScrollView style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/images/discussion_bg.png')}
                  style={styles.imagebg}/>
              </View>
        
              <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, {right: 100}]}>Discussions</Text>
                <View style={styles.topicContainer}>
                  <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Topic Question 1</Text>
                  <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Topic Question 2</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Description</Text>
                  <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Description</Text>
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <Buttons
                  title='Comment'
                  variant='purple'
                  onPress={() => router.push('/topicQuestion1')}
                />
                <Buttons
                  title='Comment'
                  variant='purple'
                  onPress={() => router.push('/home')}
                />
              </View>
              <View style={styles.boxContainer}>
                <Image
                  source={require('../assets/images/discussion_topicBox.png')}
                  style={styles.boxImage}/>
                <Image
                  source={require('../assets/images/discussion_topicBox.png')}
                  style={styles.boxImage}/>
              </View>
        </ScrollView>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imagebg: { // Background Image
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
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
    },
    topicContainer: {
      position: 'relative',
      marginTop: 135,
      flexDirection: 'column',
      gap: 175,
      right: 50,
      zIndex: 1,
    },
    descriptionContainer: {
      position: 'absolute',
      marginTop: 170,
      flexDirection: 'column',
      gap: 170,
      right: 150,
      zIndex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      marginTop: 292,
      flexDirection: 'column',
      gap: 155,
      right: 35,
      zIndex: 1,
    },
    boxContainer: {
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 70,
      gap: 50,
    },
    boxImage: {
      width: 380,
      height: 160,
    },
});