import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";

export default function Discussion() {
      const router = useRouter();

      return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                {/* <Image
                  source={require('../../assets/images/profilebg.png')}
                  style={styles.imagebg}/> */}
            </View>

            <View style={styles.textContainer}>
                <Text style={textStyles.pageHeader}>Discussions</Text>
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
      height: undefined,
      aspectRatio: 0.275,
    },
    imageContainer: {
      width: '100%',
      marginTop: 130,
    },
    textContainer: {
        position: 'absolute',
      },
});