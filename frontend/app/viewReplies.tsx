import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function viewReplies() {
    const router = useRouter();
    const [like, setLike] = useState<"heart-outline" | "heart">("heart-outline");
    const [replies, setReplies] = useState([
        {
            id: '1',
            name: 'Name',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
        },
        {
            id: '2',
            name: 'Name',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    ]);
    
    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/images/reply_view.png')}
                            style={styles.imagebg}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[textStyles.pageHeader, {right: 40}]}>Topic Question 1</Text>
                        <Text style={[textStyles.subheading2, {fontSize: 25, right: 85, color: '#646EA3'}]}>View Replies</Text>
                    </View>
                </>
            }
            data={replies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.replyContainer}>
                <View style={styles.indivReplyContainer}>
                    <View style={styles.profileSection}>
                        <Image
                            source={require('../assets/images/pfp.png')}
                            style={styles.profileImage}
                        />
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <Text style={textStyles.bodytext5}>{item.text}</Text>
                </View>

                    <View style={styles.replyButtonContainer}>
                        <Buttons
                            title="Reply"
                            variant="gray"
                            onPress={() => router.push("/replyDiscussion")}
                        />
                        <Buttons
                            title="Replies"
                            variant="purple"
                            onPress={() => router.push("/replyDiscussion")}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            setLike((prevIcon) => (prevIcon === "heart-outline" ? "heart" : "heart-outline"))
                        }
                    ><Ionicons name={like} size={30} color={"white"} />
                    </TouchableOpacity>
            </View>
            )}
        />
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
        aspectRatio: 0.4615,
    },
    imageContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 70,
    },
    replyContainer: {
        position: 'relative',
        marginTop: 70,
        marginBottom: 10,
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
        marginTop: 10,
        right: 50,
        width: 70,
        height: 10,
        left: 70,
    },
    heartContainer: {
        width: 7,
        height: 4,
        left: 30,
    },
    buttonContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
});
