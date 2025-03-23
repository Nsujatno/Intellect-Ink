import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function ReadMore() {
      const router = useRouter();
      const { item } = useLocalSearchParams();
      const parseItem = JSON.parse(item as string);

      return (
        <LinearGradient
        colors={["#4F3F7F", "#615796", "#646EA3"]}
        style={styles.container}
        >
            <ScrollView style={styles.container}>
              <View style={styles.textContainer}>
                <TouchableOpacity
                    onPress={() => {router.back()}}>
                    <Text style={textStyles.subheadingWhite}>{`< Back`}</Text>
                </TouchableOpacity>
                <Text>{parseItem.title}</Text>
              </View>
            </ScrollView>
        </LinearGradient>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      marginTop: 50,
      alignSelf: 'center',
      alignItems: 'center',
    },
});