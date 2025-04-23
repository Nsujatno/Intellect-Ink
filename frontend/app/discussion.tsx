import {
  Text, View, Image, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ngrokPath, isExpoMode } from "./utils";
import { useLocalSearchParams } from "expo-router";


interface CommentItem {
  id: string;
  title: string;
  description: string;
  isEditing: boolean;
  mediaId: string;
}

const defaultTopics: CommentItem[] = [
  {
    id: "1",
    title: "What are your thoughts?",
    description: "Feel free to share your opinions and insights.",
    isEditing: false,
    mediaId: "default1",
  },
  {
    id: "2",
    title: "Relation to current events?",
    description: "How does this relate to current events.",
    isEditing: false,
    mediaId: "default2",
  },
];

export default function Discussion() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const maxChars = 600;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);

  // const [topics, setTopics] = useState([
  //   { id: "1", title: "Topic Question 1", description: "Description", isEditing: false },
  //   // { id: "2", title: "Topic Question 2", description: "Description", isEditing: false },
  // ]);

  const [topics, setTopics] = useState<CommentItem[]>(defaultTopics);
  const topicsArr: CommentItem[] = [];

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.post(
          `${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/comments/get-comments`,
          {
            mediaId: id,
            headers: {"ngrok-skip-browser-warning": "skip-browser-warning"},
          }
        );
        console.log("Fetched topics:", response.data);

        const fetchedTopics: CommentItem[] = response.data.map((topic: any) => ({
          id: topic._id,
          title: topic.question,
          description: topic.body,
          mediaId: topic.mediaId,
          isEditing: false,
        }));
        setTopics([...defaultTopics, ...fetchedTopics]);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    if (id) {
      fetchTopics();
    }
  }, [id]);

  const handlePost = async () => {
    

    const token = await AsyncStorage.getItem('token');
    if (!token) return;
      const profileResponse = await axios.get(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/get-profile`, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          Authorization: `Bearer ${token}`
        }
      });
        // console.log(profileResponse.data.email)
      const userEmail = profileResponse.data.email;
      const payload = {
        email: profileResponse.data.email, 
        question: title,
        body: description,
        mediaId: id
      };
      const response = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/comments/post-comment`, payload, {
        headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
      });
    if (title && description) {
      const newTopic = {
        id: response.data._id,
        mediaId: response.data.mediaId,
        title: response.data.question,
        description: response.data.body,
        isEditing: false,
        isNew: true,
      };
      // setTopics([...topics, newTopic]);

      // topicsArr.push(newTopic);


      setTopics((prevTopics) => [...prevTopics, newTopic]);
      setTitle("");
      setDescription("");
      setShowInput(false);
    }
    console.log(response.data)
  }


  const toggleEdit = (index) => {
    const updated = [...topics];
    updated[index].isEditing = !updated[index].isEditing;
    setTopics(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...topics];
    updated[index][field] = value;
    setTopics(updated);
  };

  const handleSave = (index) => {
    const updated = [...topics];
    updated[index].isEditing = false;
    setTopics(updated);
  };

  const handleDelete = async (index) => {
    console.log("handling delete")
    const topicId = topics[index].id;
    console.log("topicId", topicId)
    const response = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/comments/delete-comment`, {_id: topicId}, {
      headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
    });
    console.log("Delete response:", response.data)
    const updated = [...topics];
    updated.splice(index, 1);
    setTopics(updated);
    
  };

  const renderItem = ({ item, index }) => (

    <View style={styles.boxContainer}>
      <Image source={require("../assets/images/discussion_topicBox.png")} style={styles.boxImage} />
      <View style={styles.textButtonContainer}>
        <View style={styles.textContainer}>
          {item.isEditing ? (
            <>
              <TextInput
                style={styles.inputTitle}
                value={item.title}
                onChangeText={(text) => updateField(index, "title", text)}
                placeholder="Question Title"
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                value={item.description}
                onChangeText={(text) => updateField(index, "description", text)}
                placeholder="Description"
                placeholderTextColor="#888"
                multiline
              />
            </>
          ) : (
            <>
              <Text style={[textStyles.heading2purple, styles.topicTitle]}>{item.title}</Text>
              <Text style={[textStyles.subheading2, styles.topicDescription]}>{item.description}</Text>
            </>
          )}
        </View>

        <View style={styles.buttonWrapper}>
          {item.isEditing ? (
            <Buttons
              title="Save"
              variant="purple2"
              onPress={() => handleSave(index)}
            />
          ) : (
            <>
              <Buttons
                title="Answer"
                variant="purple2"
                onPress={() => router.push({
                  pathname: `/quest1view`,
                  params: {
                    topicId: item.id,
                    title: item.title,
                    description: item.description,
                  }
                })}
                
              />


              {item.isNew && (
                <View style={styles.editDeleteRow}>
                  <Buttons
                    title="Edit"
                    variant="small"
                    onPress={() => toggleEdit(index)}
                  />
                  <Buttons
                    title="Delete"
                    variant="small"
                    onPress={() => handleDelete(index)}
                  />
                </View>
              )}
            </>
          )}
        </View>

      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/discussion_bg.png")}
              style={styles.imagebg} />
          </View>

          <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginTop: 50, left: 20, marginBottom: -50 }}
            onPress={() => { router.back() }}>
            <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
          </TouchableOpacity>

          <View style={styles.textHeaderContainer}>
            <Text style={[textStyles.pageHeader, { marginLeft: 0}]}>Discussions</Text>
          </View>

          <FlatList
            data={topics}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => setShowInput(true)}
                >
                  <Text style={styles.submitButtonText}>Ask a Question +</Text>
                </TouchableOpacity>

                {showInput && (
                  <View style={styles.boxContainer}>
                    <Image
                      source={require("../assets/images/discussion_topicBox.png")}
                      style={styles.boxImage}
                    />
                    <View style={styles.textButtonContainer}>
                      <View style={styles.textContainer}>
                        <TextInput
                          style={styles.inputTitle}
                          placeholder="Question"
                          value={title}
                          onChangeText={setTitle}
                          placeholderTextColor="#888"
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Description"
                          value={description}
                          onChangeText={setDescription}
                          multiline
                          maxLength={maxChars}
                          placeholderTextColor="#888"
                        />
                      </View>
                      <View style={styles.buttonWrapper}>
                        <Buttons
                          title="Post"
                          variant="purple2"
                          onPress={handlePost}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagebg: {
    resizeMode: 'cover',
    width: '100%',
    height: 680,
    aspectRatio: 0.6317,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
    marginTop: 350,
  },
  textHeaderContainer: {
    marginTop: 70,
    alignSelf: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingTop: 70,
    paddingBottom: 150,
    alignSelf: 'center',
    gap: 50,
  },
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxImage: {
    width: 380,
    height: 180,
    position: 'absolute',
  },
  buttonWrapper: {
    width: 105,
    bottom: -55,
    alignItems: 'flex-start',
    marginLeft: -50,
  },
  editDeleteRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -42,
    transform: [{ translateX: -240 }],
  },
  textButtonContainer: {
    flexDirection: 'row',
    width: 380,
    height: 160,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginTop: 40,
  },
  topicTitle: {
    fontSize: 21.5,
    color: '#03045E',
    textAlign: 'left',
    top: -30,
  },
  topicDescription: {
    fontSize: 17,
    color: '#646EA3',
    textAlign: 'left',
    top: -30,
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
    height: 100,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#646EA3',
    textAlignVertical: 'top',
    padding: 5,
  },
  placeholder: {
    position: 'absolute',
    fontSize: 16,
    color: '#504F4F',
    textAlign: 'left',
    padding: 10,
  },
  footer: {
    marginTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
    gap: 20,
  },
  inputTitle: {
    width: '100%',
    fontSize: 20,
    color: '#03045E',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 5,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#413F6F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
