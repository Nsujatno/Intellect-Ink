import { Text, View, FlatList, ScrollView, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { useState } from "react";
import axios from 'axios'
import DropDownButtons from "../components/dropDownButtons";
import { textStyles } from "../stylesheets/textStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function Search() {
    const testSubjects = [
        {
          id: "1",
          type: "book",
          image: "https://i5.walmartimages.com/seo/Harry-Potter-and-the-Chamber-of-Secrets-9780807281949_57baa93a-bf72-475f-a16a-a8a68527b723.8bcd0fed9c3a1130f7ead9251ea885be.jpeg",
          title: "Harry Potter and the Chamber of Secrets",
          author: "JK Rowling",
          link: 'https://www.barnesandnoble.com/w/harry-potter-and-the-chamber-of-secrets-j-k-rowling/1004338523?ean=9780439064866',
          summary: "Harry, a 2nd-year student at Hogwarts, starts hearing mysterious voices. When unusual tragedies occur, he and his friends search for answers.",
        },
        {
          id: "2",
          type: "news",
          image: "",
          title: "Chuck E. Cheese wants to be the Costco of family fun",
          author: "Savannah Sellers and Alexandra Byrne",
          link: 'https://www.nbcnews.com/business/consumer/chuck-e-cheese-wants-costco-family-fun-rcna195652',
          summary: "Chuck E. Cheese wants you to stop by as frequently as you pick up groceries, and it’s selling subscription plans to sweeten the pitch.",
        },
        {
          id: "3",
          type: "poem",
          title: "The Raven",
          author: "Edgar Allan Poe",
          poem: "Once upon a midnight dreary, While I pondered, weak and weary...",
        },
      ];

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        console.log(query);

        try{
            const response = await axios.post("http://localhost:8000/api/article/search", {keyword: query});
            for(let i = 0; i < response.data.length; i++){
                console.log(response.data[i])
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if(error.response){
                    console.log('Error: ', error.response.data)
                }
            }
        }
        try{
            const response = await axios.post("http://localhost:8000/api/book/search", {keyword: query});
            for(let i = 0; i < response.data.length; i++){
                console.log(response.data[i])
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if(error.response){
                    console.log('Error: ', error.response.data)
                }
            }
        }
        try{
            const response = await axios.post("http://localhost:8000/api/news/search", {keyword: query});
            for(let i = 0; i < response.data.length; i++){
                console.log(response.data[i])
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if(error.response){
                    console.log('Error: ', error.response.data)
                }
            }
        }
        try{
            const response = await axios.post("http://localhost:8000/api/poem/search", {keyword: query});
            for(let i = 0; i < response.data.length; i++){
                console.log(response.data[i])
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if(error.response){
                    console.log('Error: ', error.response.data)
                }
            }
        }

    }
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

  const Item = ({ item }: { item: ItemProps }) => (
    <View style={styles.contentContainer}>
        <View>
            <Text style={[textStyles.heading2purple,{fontSize: 16}]}>{item.title}</Text>
            <Text style={[textStyles.subheading, {fontSize: 14}]}>By: {item.author}</Text>
        </View>
        <View>
            <TouchableOpacity>
                <Text style={textStyles.heading2purple}> {`>`}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                placeholder="Search"
                placeholderTextColor="#807A7A"
                clearButtonMode="always"
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}>
            </TextInput>
            
            { searchQuery.trim() !=="" ? (
                    <LinearGradient
                        colors={["#4F3F7F", "#615796", "#646EA3"]}
                        style={styles.flatlistContainer}
                    >
                        <FlatList
                            data={testSubjects}
                            renderItem={({ item }) => <Item item={item} />}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={true}
                            horizontal={false}
                        />
                    </LinearGradient>
                ) : (
                    <View style={styles.categoriesContainer}>
                        <Text style={[textStyles.heading2purple,{marginVertical: 10,}]}>Categories</Text>
                        <DropDownButtons
                            title='Books'
                            variant='white'
                            categories={["Horror", "Romance", "Mystery"]}
                            gradientColors={['#5C3E8F', '#2D1A4E']} 
                        />
                        <DropDownButtons
                            title='News'
                            variant='white'
                            categories={[]}
                            gradientColors={['#615796', '#3B3461']} 
                        />
                        <DropDownButtons
                            title='Poems'
                            variant='white'
                            categories={[]}
                            gradientColors={['#514F82', '#22205F']} 
                        />
                        <DropDownButtons
                            title='Politics'
                            variant='white'
                            categories={[]}
                            gradientColors={['#3F497B', '#646EA3']} 
                        />
                        <DropDownButtons
                            title='Research'
                            variant='white'
                            categories={[]}
                            gradientColors={['#514F82', '#7347AD']} 
                        />
                        <Text style={[textStyles.heading2purple,{marginVertical: 10,}]}>Other</Text>
                        <DropDownButtons
                            title='Quiz'
                            variant='whiteOutline'
                            categories={["Go to today's quiz", "See past results"]}
                            gradientColors={['#103A70', '#485EEA']} 
                        />
                        <DropDownButtons
                            title='Favorites'
                            variant='whiteOutline'
                            categories={["See all favorites"]}
                            gradientColors={['#042C71', '#6D90EB']} 
                        />
                    </View>
                )
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        marginHorizontal: 20,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 5,
        borderColor: '#E9E9E9',
        elevation: 10,
        height: 50,
        width: '100%',
        fontSize: 20,
        color: "#A39F9F",
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
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
    flatlistContainer: {
        backgroundColor: "#646EA3",
        marginVertical: 15,
        height: 630,
        borderRadius: 5,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    categoriesContainer: {
        width: '100%',
        
    },
});