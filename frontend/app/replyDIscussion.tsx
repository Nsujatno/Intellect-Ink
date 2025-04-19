import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function ReplyDiscussion() {
    const router = useRouter();
    // const params = useLocalSearchParams();
    const { id, title, description } = useLocalSearchParams();
    const [inputText, setInputText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const maxChars = 1400;

    const { topicId, replyId, replyName, replyText } = useLocalSearchParams();

    useEffect(() => {
        if (replyId) {
            setReplyingTo({
                id: replyId,
                name: replyName,
                text: replyText
            });
        }
    }, [replyId, replyName, replyText]);

    const handleSubmit = useCallback(() => {
        if (inputText.trim() === "") {
            Alert.alert("Please enter your thoughts before submitting.");
        // } else if (inputText.trim().length < 50) {
        //     Alert.alert("Please enter at least 50 characters");
        } else {
            router.push('/viewReplies');
            params: {topicId}
        }
    }, [inputText, router, topicId]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/discussionanswer_bg.png')}
                    style={styles.imagebg}
                />
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, { right: 40 }]}>{title}</Text>
                <Text style={[textStyles.subheading2, { fontSize: 25, right: 140, color: '#646EA3' }]}>Reply</Text>
            </View>

            {replyingTo && (
                <View style={styles.replyContainer}>
                    <View style={styles.indivReplyContainer}>
                        <View style={styles.profileSection}>
                            <Image
                                source={require('../assets/images/pfp.png')}
                                style={styles.profileImage}
                            />
                            <Text style={styles.nameText}>{replyingTo.name}</Text>
                        </View>
                        <Text style={styles.replyText}>{replyingTo.text}</Text>
                    </View>
                </View>
            )}

            <View style={styles.answerBox}>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    multiline
                    maxLength={maxChars}
                    value={inputText}
                    onChangeText={setInputText}
                />
                {!inputText && (
                    <Text style={styles.placeholder}>Your thoughts here...</Text>
                )}
            </View>

            <Text style={styles.charCount}>
    {inputText.length} / {maxChars} characters
</Text>


            <View style={styles.buttonContainer}>
                <Buttons
                    title='Comment'
                    variant='purple2'
                    onPress={handleSubmit}
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
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: -20,
        left: 20,
    },
    textContainer: {
        position: 'absolute',
        marginTop: 100,
        alignSelf: 'center',
        alignItems: 'center',
    },
    replyContainer: {
        position: 'relative',
        marginBottom: 20,
        marginTop: 170, // match topicQuestion1 layout
    },
    indivReplyContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 5,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    replyText: {
        fontSize: 14,
        color: '#504F4F',
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
        marginTop: 20,
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
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginTop: -10,
        right: 40,
        zIndex: 2,
    },
});