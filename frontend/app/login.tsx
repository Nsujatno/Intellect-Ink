import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ngrokPath, isExpoMode } from "./utils";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        try {
            const payload = { email: email.toLowerCase(), password };
            const response = await axios.post(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/user/signin`, payload, {
                headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
            });

          await AsyncStorage.setItem("token", String(response.data.user.token))
          console.log(AsyncStorage.getItem("token"))
          router.push("/home")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response){
                    console.log('Error: ', error.response.data)
                }
            }
        }
    }


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
            source={require('../assets/images/Circle1.png')}
            style={styles.image}/>
        </View>
    
        <View style={styles.textContainer}>
            <Text style={textStyles.logo}>Intellect Ink</Text>
            <Text style={textStyles.heading1}>to help you think!</Text>
            
            <View style={styles.leftContainer}>
                <Text style={textStyles.heading2}>Email</Text>
                <TextInput style={styles.inputContainer} value={email} onChangeText={setEmail}/>
                <Text style={textStyles.heading2}>Password</Text>
                <TextInput style={styles.inputContainer} value={password} onChangeText={setPassword}/>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={/*() => router.push("/home")*/ handleSubmit}>
                <Text style={[textStyles.heading2, { lineHeight: 25 }]}>Login</Text>
            </TouchableOpacity>

            <Text style={textStyles.subheading}>Don't have an account?</Text>
            <Link style={textStyles.link} href="/signup">Sign up here</Link>
        </View>

        <View style={styles.imageContainer2}>
            <Image
                source={require('../assets/images/OctopusLogo.png')}
                style={styles.image2}/>
        </View>
    </View>
       
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",

    },
    imageContainer: {
        width: '100%',
        height: '60%',
        position: 'absolute',
        top: -15,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: undefined,
        aspectRatio: 0.78,
    },
    textContainer: {
        position: "absolute",
        top: 70,
        alignItems: 'center',
    },
    leftContainer: {
        alignSelf: 'flex-start',
        marginTop: 30,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 10,
        alignItems: 'center',
        height: 50,
        width: 320,
        fontSize: 20,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#413F6F',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 50,
        width: 200,
        marginTop: 80,
        marginBottom: 40,
    },
    imageContainer2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image2: {
        width: 170,
        resizeMode: 'contain',
        position: 'absolute',
        top: 580,
        left: 65,
    },
  });