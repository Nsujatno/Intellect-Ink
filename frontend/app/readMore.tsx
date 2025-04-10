import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTimeTracker } from "../app/hooks/useTimeTracker";
import { textStyles } from "./stylesheets/textStyles";
import { LinearGradient } from "expo-linear-gradient";
import Buttons from "./components/buttons";
import TrackWrapper from "../app/layouts/trackWrapper";

export default function ReadMore() {
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const parseItem = JSON.parse(item as string);
    
    return (
        <TrackWrapper>
        <LinearGradient
        colors={["#4F3F7F", "#615796", "#646EA3"]}
        style={styles.container}
        >
            <ScrollView style={styles.container}>
              <View style={styles.textContainer}>
                <TouchableOpacity
                    style={{alignSelf: 'flex-start', marginBottom: 20}}
                    onPress={() => {router.back()}}>
                    <Text style={textStyles.subheadingWhite}>{`< Back`}</Text>
                </TouchableOpacity>
              
                <View style={styles.contentContainer}>
                    <View style={styles.mediaTag}>
                        <Text style={textStyles.subheadingWhite}>{parseItem.type}</Text>
                    </View>      
                    <View style={{ padding: 10 }}>
                        <Text style={textStyles.heading2purple}>{parseItem.title}</Text>
                        <Text style={[textStyles.subheading, {marginBottom: 20}]}>By: {parseItem.author}</Text>
                        {parseItem.type === "poem" ? (
                        <Text style={textStyles.subheading}>{parseItem.poem}</Text>
                        ) : (
                        <View>
                            <Text style={textStyles.heading2purple}>Summary:</Text>
                            <Text style={textStyles.subheading}>{parseItem.summary}</Text>
                        </View>
                        )}
                    </View>

                    <View style={{width: '75%', alignSelf: 'center', paddingVertical: 20}}>
                        <Buttons
                            title='More info'
                            variant='purple'
                            onPress={() => Linking.openURL(parseItem.link)}
                        />
                        <Buttons
                            title='Discussion'
                            variant='purple'
                            onPress={() => router.push('/discussion')}
                        />
                    </View>
                </View>
                    <Text style={textStyles.heading2}>You may also like</Text>
                    <View style={styles.relevantBox}>
                        <View>
                            <Text style={textStyles.heading2purple}>
                                Title
                            </Text>
                            <Text style={textStyles.subheading}>
                                Author
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyles.heading2purple}> {`>`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.relevantBox}>
                        <View>
                            <Text style={textStyles.heading2purple}>
                                Title
                            </Text>
                            <Text style={textStyles.subheading}>
                                Author
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyles.heading2purple}> {`>`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
             </View>
            </ScrollView>
        </LinearGradient>
        </TrackWrapper>
      );
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
    mediaTag: {
        width: "100%",
        height: 35,
        backgroundColor: "#736F96",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      contentContainer: {
        backgroundColor: "white",
        borderRadius: 15,
        textAlign: "center",
        width: 370,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      relevantBox: {
        width: 370,
        height: 90,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        marginTop: 20,
        padding: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
});