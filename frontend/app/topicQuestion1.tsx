import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";
import axios from "axios";

export default function TopicQuestion() {
    const router = useRouter();
    const { id, title, description } = useLocalSearchParams();
    const [inputText, setInputText] = useState("");
    const maxChars = 1400;

    // const topicData = {
    //     "1": {
    //         title: "Topic Question 1",
    //         description: "Description"
    //     },
    //     "2": {
    //         title: "Topic Question 2",
    //         description: "Description"
    //     }
    // };

    // const currentTopic = topicData[id] || topicData["1"];

    const handleComment = () => {
        if (inputText.trim() === "") {
            Alert.alert("Please enter your thoughts before submitting.");
        } else if (inputText.trim().length < 150) {
            Alert.alert("Please enter at least 30 words (150 characters)");
        } else {
            router.push({
                pathname: '/quest1view',
                params: {
                  topicId: id,
                  title: title,
                  description: description
                }
              });              
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/discussionanswer_bg.png')}
                    style={styles.imagebg}
                />
            </View>
            <TouchableOpacity
                style={{ alignSelf: 'flex-start', marginTop: 50, marginBottom: -20, left: 20 }}
                onPress={() => { router.back() }}>
                <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, { marginTop: 20, marginHorizontal: 10, fontSize: 27}]}>{title}</Text>
                <Text style={[textStyles.subheading2, { fontSize: 20, marginHorizontal: 10, color: '#646EA3' }]}>
                    {description}
                </Text>

            </View>

            <View style={styles.answerBox}>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    multiline
                    maxLength={maxChars}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                {!inputText && (
                    <Text style={styles.placeholder}>Your thoughts here...</Text>
                )}
            </View>
            <Text style={styles.charCount}>
                {`${inputText.length} / ${maxChars} characters`}
            </Text>
            <View style={styles.buttonContainer}>
                <Buttons
                    title='Comment'
                    variant='purple2'
                    onPress={handleComment}
                />
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
        marginTop: 250,
        aspectRatio: 0.855,
    },
    imageContainer: {
        width: '100%',
        position: 'absolute',
        marginTop: 350,
        pointerEvents: 'none',
    },
    textContainer: {
        position: 'absolute',
        marginTop: 100,
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginTop: -10,
        right: 40,
        zIndex: 2,
    },
    answerBox: {
        alignSelf: 'center',
        zIndex: 1,
        width: '80%',
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop: 170,
    },
    input: {
        width: '100%',
        height: 280,
        fontSize: 16,
        color: '#504F4F',
        textAlign: 'left',
        padding: 5,
    },
    placeholder: {
        position: 'absolute',
        fontSize: 16,
        color: '#504F4F',
        textAlign: 'left',
        padding: 10,
    },
    charCount: {
        fontSize: 14,
        color: '#646EA3',
        marginTop: 10,
        left: 45,
    }
});