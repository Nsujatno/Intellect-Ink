import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function viewReplies() {
    const router = useRouter();
    const maxLength = 200;
    const [expanded, setExpanded] = useState([]);
    const { topicId } = useLocalSearchParams();

    const [replies, setReplies] = useState([
        {
            id: '1',
            name: 'Name',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
        },
        {
            id: '2',
            name: 'Name',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]);

    // const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(""); // api link
                setReplies(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error)
            }
        };

        if (topicId) fetchComments();
    }, [topicId])

    const toggleExpanded = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/discussion_viewbg.png')}
                    style={styles.imagebg}
                />
            </View>

            <TouchableOpacity
                style={{ alignSelf: 'flex-start', marginTop: 50, marginBottom: -20, left: 20 }}
                onPress={() => { router.back() }}
            >
                <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, { right: 40 }]}>Topic Question {topicId}</Text>
                <Text style={[textStyles.subheading2, { fontSize: 25, right: 100, color: '#646EA3' }]}>View Replies</Text>
            </View>

            <FlatList
                data={replies}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.replyContainer}>
                        <View style={styles.indivReplyContainer}>
                            <View style={styles.profileSection}>
                                <Image
                                    source={require('../assets/images/pfp.png')}
                                    style={styles.profileImage}
                                />
                                <Text style={styles.nameText}>{item.name}</Text>
                            </View>

                            <Text style={textStyles.bodytext5}>
                                {expanded[item._id] ? item.text : `${item.text.slice(0, maxLength)}...`}
                            </Text>

                            <TouchableOpacity onPress={() => toggleExpanded(item._id)}>
                                <Text style={styles.viewMoreText}>
                                    {expanded[item._id] ? "View Less" : "View More"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.replyButtonContainer}>
                            {index !== 1 && (
                                <Buttons
                                    title="Reply"
                                    variant="gray2"
                                    onPress={() => router.push({
                                        pathname: "/replyDiscussion",
                                        params: { 
                                            topicId,
                                            replyId: item.id,
                                            replyName: item.name,
                                            replyText: item.text
                                        }
                                    })}
                                />
                            )}
                            {index !== 0 && (
                                <Buttons
                                    title="More Replies"
                                    variant="purple3"
                                    onPress={() => router.push("/viewReplies")}
                                />
                            )}
                        </View>

                        {/* {index === 0 && (
                            <Image
                                source={require('../assets/images/line-12.png')}
                                style={styles.lineImage}
                            />
                        )} */}
                    </View>
                )}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
            />
        </View>
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
        marginTop: 235,
        aspectRatio: 0.524,
    },
    imageContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 60,
    },
    replyContainer: {
        position: 'relative',
        marginBottom: 20,
        flexDirection: 'column',
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
    replyButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        marginTop: 10,
        marginLeft: 25,
    },
    viewMoreText: {
        color: '#321383',
        marginTop: 5,
        fontSize: 14,
    },
    buttonContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    // lineImage: {
    //     width: '100%',
    //     height: 2.5,
    //     marginTop: 30,
    //     paddingHorizontal: 20,
    // },
});
