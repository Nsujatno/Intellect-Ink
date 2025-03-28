import { Text, View, Image, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function topicQuestion1() {
    const router = useRouter();
    const [inputText, setInputText] = useState("");
    const maxChars = 1250;
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/discussion_reply.png')}
                    style={styles.imagebg}
                />
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
                        title='Reply'
                        variant='purple'
                        onPress={() => router.push('/viewReplies')}
                    />
                </View>

            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, {right: 40}]}>Topic Question 1</Text>
                <Text style={[textStyles.subheading2, {fontSize: 25, right: 120, color: '#646EA3'}]}>Reply</Text>
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
        marginTop: 300,
        aspectRatio: 1.540,
    },    
    imageContainer: {
        width: '100%',
        position: 'absolute',
        marginTop: 350,
        pointerEvents: 'none',
    },
    textContainer: {
        position: 'absolute',
        marginTop: 70,
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
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop: 400,
    },
    input: {
        width: '100%',
        height: 280,
        fontSize: 16,
        color: '#504F4F',
        textAlign: 'left',
        padding: 10,
    },
    placeholder: {
        position: 'absolute',
        fontSize: 16,
        color:'#504F4F',
        textAlign: 'left',
        padding: 10,
    },
    charCount: {
        fontSize: 14,
        color: '#646EA3',
        marginTop: 10,
        left: 45,
    }
})