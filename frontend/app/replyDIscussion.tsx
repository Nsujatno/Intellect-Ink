import { Text, View, Image, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function replyDiscussion() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome!</Text>
        </View>
    );
}