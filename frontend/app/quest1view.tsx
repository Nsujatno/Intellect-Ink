import { Text, View, Image, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function topicQuestion1() {
    const router = useRouter();
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/discussion_viewbg.png')}
                    style={styles.imagebg}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, {right: 40}]}>Topic Question 1</Text>
                <Text style={[textStyles.subheading2, {fontSize: 25, right: 85, color: '#646EA3'}]}>View Discussion</Text>
            </View>
        </ScrollView>
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagebg: {
        resizeMode: 'cover',
        width: '100%',
        height: undefined,
        marginTop: 200,
        aspectRatio: 0.524,
    },    
    imageContainer: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        marginTop: 70,
        alignSelf: 'center',
        alignItems: 'center',
    },
})