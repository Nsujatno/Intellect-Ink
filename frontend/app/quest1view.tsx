import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { ngrokPath, isExpoMode } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReplyItem {
  id: string;
  name: string;
  text: string;
  commentId: string;
}

export default function question1View() {
    const router = useRouter();
    const maxLength = 200;
    
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [replies, setReplies] = useState<ReplyItem[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
  
    const { topicId, title, description, newComment, articleId } = useLocalSearchParams();
    console.log("topic id: " + topicId);
  
    useEffect(() => {
      const fetchReplies = async () => {
        try {
            // get email
            const token = await AsyncStorage.getItem("token");
            if (!token) return;

            const profileResponse = await axios.get(
            `${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/user/get-profile`,
            {
                headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "skip-browser-warning",
                Authorization: `Bearer ${token}`,
                },
            }
            );
            setUserEmail(profileResponse.data.email);


          // Fetch replies from the backend
          const response = await axios.post(
            `${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/replys/get-replys`,
            {
              commentId: topicId,
            },
            {
              headers: { "ngrok-skip-browser-warning": "skip-browser-warning" },
            }
          );
          console.log("Fetched replies:", response.data);
  
          // Map the fetched replies to the ReplyItem structure
          const fetchedReplies: ReplyItem[] = response.data.map((reply: any) => ({
            id: reply._id,
            name: reply.email || "Anonymous", // Use email or default to "Anonymous"
            text: reply.text,
            commentId: reply.commentId,
          }));
  
          // Add the new comment if provided
          if (newComment) {
            fetchedReplies.push({
              id: Date.now().toString(),
              name: "You",
              text: newComment,
              commentId: topicId as string,
            });
          }
  
          // Update the replies state
          setReplies(fetchedReplies);
        } catch (err) {
          console.error("Error fetching replies:", err);
        }
      };
  
      if (topicId) {
        fetchReplies();
      }
    }, [topicId, newComment]);
  
    
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
                onPress={() => { router.back() }
                }
            >
            <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
            </TouchableOpacity>

            <View style={styles.topButtonWrapper}>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() =>
                        router.push({
                            pathname: "/topicQuestion1",
                            params: {
                                topicId: topicId,
                                title: title,
                                description: description,
                            },
                        })
                    }
                >
                    <Text style={styles.submitButtonText}>Comment +</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.textContainer}>
                <Text style={[textStyles.pageHeader, { fontSize: 25 }]}>{title}</Text>
                <Text style={[textStyles.subheading2, { fontSize: 22, color: '#646EA3', textAlign: 'center', }]}>View Discussion</Text>
            </View>

            <FlatList
                data={replies}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={[
                        styles.replyContainer,
                        index === 0 && { marginTop: 12 } // add space above the first reply
                    ]}>
                        <View style={styles.indivReplyContainer}>
                            <View style={styles.profileSection}>
                                <Image
                                    source={require('../assets/images/pfp.png')}
                                    style={styles.profileImage}
                                />
                                <Text style={styles.nameText}>{item.name === userEmail ? "You": item.name}</Text>
                            </View>
                
                            <Text style={textStyles.bodytext5}>
                                {expanded[item.id] ? item.text : item.text.slice(0, maxLength) + '...'}
                            </Text>
                
                            <TouchableOpacity onPress={() => toggleExpanded(item.id)}>
                                <Text style={styles.viewMoreText}>
                                    {expanded[item.id] ? "View Less" : "View More"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                
                        <View style={styles.replyButtonContainer}>
                            <Buttons
                                title="Reply"
                                variant="gray2"
                                onPress={() => router.push({
                                    pathname: "/viewReplies",
                                    params: item ? {
                                        replyId: item.id,
                                        replyName: item.name,
                                        replyText: item.text,
                                        title: title,
                                        description: description,
                                        topicId: topicId
                                    } : {}
                                })}
                            />
                        </View>
                    </View>
                )}                
                // renderItem={({ item }) => (
                //     <View style={styles.replyContainer}>
                //         <View style={styles.indivReplyContainer}>
                //             <View style={styles.profileSection}>
                //                 <Image
                //                     source={require('../assets/images/pfp.png')}
                //                     style={styles.profileImage}
                //                 />
                //                 <Text style={styles.nameText}>{item.name}</Text>
                //             </View>

                //             <Text style={textStyles.bodytext5}>
                //                 {expanded[item._id] ? item.text : item.text.slice(0, maxLength) + '...'}
                //             </Text>

                //             <TouchableOpacity onPress={() => toggleExpanded(item._id)}>
                //                 <Text style={styles.viewMoreText}>
                //                     {expanded[item._id] ? "View Less" : "View More"}
                //                 </Text>
                //             </TouchableOpacity>
                //         </View>

                //         <View style={styles.replyButtonContainer}>
                //             <Buttons
                //                 title="Reply"
                //                 variant="gray2"
                //                 onPress={() => router.push({
                //                     pathname: "/viewReplies",
                //                     params: item ? {
                //                         replyId: item._id,
                //                         replyName: item.name,
                //                         replyText: item.text,
                //                         title: title,
                //                         description: description,
                //                         topicId: topicId
                //                     } : {}
                //                 })}
                //             />
                //             {/* <Buttons
                //                 title="More Replies"
                //                 variant="purple3"
                //                 onPress={() =>
                //                     router.push({
                //                         pathname: "/viewReplies",
                //                         params: {
                //                             topicId,
                //                             title,
                //                             description,
                //                             commentId: item._id,
                //                             commentName: item.name,
                //                             commentText: item.text,
                //                         },
                //                     })
                //                 }
                //             /> */}

                //         </View>
                //     </View>
                // )}
                // ListFooterComponent={
                //     <View style={styles.footer}>
                //         <TouchableOpacity
                //             style={styles.submitButton}
                //             onPress={() =>
                //                 router.push({
                //                     pathname: "/topicQuestion1",
                //                     params: {
                //                         topicId: topicId,
                //                         title: title,
                //                         description: description,
                //                     },
                //                 })
                //             }
                //         >
                //             <Text style={styles.submitButtonText}>Add a comment +</Text>
                //         </TouchableOpacity>

                //     </View>
                // }
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
        paddingHorizontal: 20,
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
    topButtonWrapper: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    submitButton: {
        backgroundColor: '#D9D9D9',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    submitButtonText: {
        color: '#413F6F',
        fontSize: 16,
        fontWeight: 'bold',
    },

});