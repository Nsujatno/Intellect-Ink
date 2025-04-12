import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { textStyles } from "./stylesheets/textStyles";
import { useRouter } from "expo-router";
import { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Achievements() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/images/achievements_bg.png")}
                    style={styles.imagebg}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={textStyles.pageHeader}>Achievements</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagebg: {
        resizeMode: 'cover',
        width: '100%',
        height: undefined,
        aspectRatio: 0.457,
    },
    imageContainer: {
        width: '100%',
        marginTop: 130,
    },
    textContainer: {
        marginTop: 50,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
    },
})