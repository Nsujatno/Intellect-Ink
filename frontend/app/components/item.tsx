import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { textStyles } from "../stylesheets/textStyles";

type ItemProps = {
    id: string,
    type: string,
    image?: string,
    title: string;
    author: string;
    summary?: string;
    poem?: string;
    link?: string;
};

const Item = ({ item }: { item: ItemProps }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => (router.push({ pathname: "/readMore", params: { item: JSON.stringify(item) } }))}>
        <View style={styles.contentContainer}>
           <View style={{width: '90%'}}>
               <Text numberOfLines={2} style={[textStyles.heading2purple,{fontSize: 16}]}>{item.title}</Text>
               {item.author && <Text numberOfLines={1} style={[textStyles.subheading, {fontSize: 14}]}>By: {item.author}</Text> }
           </View>
           <View>
                <Text style={textStyles.heading2purple}> {`>`}</Text>
           </View>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        width: 340,
        height: 100,
        marginVertical: 15,
        padding: 15,
        borderRadius: 5,
        backgroundColor: "white",
        shadowColor: "#000",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Item;