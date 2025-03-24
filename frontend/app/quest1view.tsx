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
                    source={require('../assets/images/discussionanswer_bg.png')}
                    style={styles.imagebg}
                />
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
        marginTop: 180,
        aspectRatio: 0.855,
    },    
    imageContainer: {
        width: '100%',
        position: 'absolute',
        marginTop: 350,
    },
    textContainer: {
        position: 'absolute',
        marginTop: 70,
        alignSelf: 'center',
        alignItems: 'center',
    },
})