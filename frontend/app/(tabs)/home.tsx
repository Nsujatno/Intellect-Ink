import { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import SwitchSelector from 'react-native-switch-selector';
import LinearGradient from 'react-native-linear-gradient';
import { textStyles } from "../stylesheets/textStyles";

const testSubjects = [
    {
        id: '1',
        type: 'book',
        image: 'https://i5.walmartimages.com/seo/Harry-Potter-and-the-Chamber-of-Secrets-9780807281949_57baa93a-bf72-475f-a16a-a8a68527b723.8bcd0fed9c3a1130f7ead9251ea885be.jpeg',
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'JK Rowling',
        summary: 'Harry a 2nd year student at Hogwarts starts hearing mysterious voices in serpent’s tongue. When unusual tragedies start occurring, him and his friends search for answers.',
        link: 'https://www.barnesandnoble.com/w/harry-potter-and-the-chamber-of-secrets-j-k-rowling/1004338523?ean=9780439064866',    
    },
    {
        id: '2',
        type: 'news',
        image: '',
        title: 'Chuck E. Cheese wants to be the Costco of family fun',
        author: 'Savannah Sellers and Alexandra Byrne',
        summary: 'Chuck E. Cheese wants you to stop by as frequently as you pick up groceries, and it’s selling subscription plans to sweeten the pitch',
        link: 'https://www.nbcnews.com/business/consumer/chuck-e-cheese-wants-costco-family-fun-rcna195652',    
    },
    {
        id: '3',
        type: 'poem',
        title: 'The Raven',
        author:'Edgar Allan Poe',
        poem: 'Once upon a midnight dreary, While I pondered, weak and weary, Over many a quaint and curious Volume of forgotten lore— While I nodded, nearly napping, Suddenly there came a tapping, As of some one gently rapping, Rapping at my chamber door. "T is some visitor," I muttered,',    
    },
]
   
export default function Home() {
    const [state, setState] = useState({page: 0})

    return (
        // <LinearGradient
        // colors={['#4F3F7F','#615796','#646EA3']}
        // style={styles.container}>
        <View style={styles.container}>
            <SwitchSelector
                initial={0}
                onPress={(value : number) => setState({ page : value })}
                textColor={'white'}
                selectedColor={'#413F6F'}
                backgroundColor={'#736F96'}
                buttonColor={'#E3E2EA'}
                hasPadding
                valuePadding={5}
                style={{ width: 200, marginTop: 20, }}
                options={[{label: "For You", value: 0},{label: "Explore", value: 1}]}
            />

            <View style={styles.contentContainer}>

            </View>
        </View>
        //</LinearGradient>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4F3F7F',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '80%',
    width: '90%',
    marginTop: 15,
    marginBottom: 40,
  },
});