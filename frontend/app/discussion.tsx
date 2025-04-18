import {
  Text, View, Image, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, StyleSheet
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function Discussion() {
  const router = useRouter();
  const maxChars = 600;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [topics, setTopics] = useState([
    { id: "1", title: "Topic Question 1", description: "Description", isEditing: false },
    // { id: "2", title: "Topic Question 2", description: "Description", isEditing: false },
  ]);

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

  const handleDelete = (index) => {
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
                  pathname: `/topicQuestion1`,
                  params: {
                    id: item.id,
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
            <Text style={[textStyles.pageHeader, { marginRight: 200 }]}>Discussions</Text>
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
                          onPress={() => {
                            if (title && description) {
                              const newTopic = {
                                id: Date.now().toString(),
                                title,
                                description,
                                isEditing: false,
                                isNew: true
                              };
                              setTopics([...topics, newTopic]);
                              setTitle("");
                              setDescription("");
                              setShowInput(false);
                            }
                          }}
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
    width: 120,
    bottom: -55,
    alignItems: 'flex-start',
  },
  editDeleteRow: {
    flexDirection: 'row',
    gap: 8,
    transform: [{ translateX: -220 }],
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
    flex: 1
  },
  topicTitle: {
    fontSize: 25,
    color: '#03045E',
    textAlign: 'left',
    top: -30,
  },
  topicDescription: {
    fontSize: 18,
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
