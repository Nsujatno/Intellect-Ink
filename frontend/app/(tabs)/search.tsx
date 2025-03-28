import { Text, View, SafeAreaView, TextInput, StyleSheet} from "react-native";
import { useState } from "react";
import axios from 'axios'

export default function Search() {
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

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                placeholder="Search"
                placeholderTextColor="#E9E9E9"
                clearButtonMode="always"
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}>
            </TextInput>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 80,
        marginHorizontal: 20,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#E9E9E9',
        elevation: 10,
        height: 50,
        width: '100%',
        fontSize: 20,
        color: "#A39F9F",
        paddingHorizontal: 15,
        marginBottom: 15,
    },
});