import { Text, View } from "react-native";

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
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome to the Home Screen!</Text>
        </View>
    );
}