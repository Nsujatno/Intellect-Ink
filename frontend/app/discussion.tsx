import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function Discussion() {
  const router = useRouter();

  const topics = [
    { id: "1", title: "Topic Question 1", description: "Description" },
    { id: "2", title: "Topic Question 2", description: "Description" }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.boxContainer}>
      <Image source={require("../assets/images/discussion_topicBox.png")} style={styles.boxImage} />
      <View style={styles.textButtonContainer}>
        <View style={styles.textContainer}>
          <Text style={[textStyles.heading2purple, styles.topicTitle]}>{item.title}</Text>
          <Text style={[textStyles.subheading2, styles.topicDescription]}>{item.description}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Buttons title="Answer" variant="purple" onPress={() => router.push(`/topicQuestion${item.id}`)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/discussion_bg.png")} style={styles.imagebg} />
      </View>
      <TouchableOpacity
              style={{alignSelf: 'flex-start', marginTop: 50, left: 20, marginBottom: -50}}
              onPress={() => {router.back()}}>
              <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
      </TouchableOpacity>
      <View style={styles.textHeaderContainer}>
        <Text style={[textStyles.pageHeader, { right: 100 }]}>Discussions</Text>
      </View>
      

      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    height: 680,
    aspectRatio: 0.6317,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    marginTop: 350,
  },
  textHeaderContainer: {
    marginTop: 70,
    alignSelf: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 70,
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
    right: -8,
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
  },
  topicTitle: {
    fontSize: 28,
    color: '#03045E',
    textAlign: 'left',
    top: -30,
  },
  topicDescription: {
    fontSize: 22,
    color: '#646EA3',
    textAlign: 'left',
    top: -30,
  },
});