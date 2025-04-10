import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ngrokPath, isExpoMode } from "./utils";

export default function Signup() {
    const router = useRouter();

    // const [error, setError] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async () => {
        // setError("");
        if(password == confirmPassword) {
            try {
                const response = await axios.post(
                  `${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/create`,
                  {email, password}, {
                    headers: {
                        'ngrok-skip-browser-warning': 'skip-browser-warning',
                    }
                  }
                );
      
                router.push("/createProfile")
      
              } catch (error) {
                  if (axios.isAxiosError(error)) {
                      if(error.response){
                          console.log(error.response.data)
                      }
                  }
              }
            
            // auto log in user to get auth token
            try {
                const response = await axios.post(`${isExpoMode == true ? ngrokPath : "http://localhost:8000"}/api/user/signin`, {email, password})
                console.log(response.data)
                // localStorage.setItem("token", response.data.user.token)
                AsyncStorage.setItem("token", String(response.data.user.token))
                const token = await AsyncStorage.getItem('token');
                // console.log('Token:', token);
                // console.log(AsyncStorage.getItem("token"))
                // console.log(localStorage.getItem("token"))
            }
            catch (error) {
                if (axios.isAxiosError(error)) {
                    if(error.response){
                        console.log(error.response.data)
                    }
                }
            }
        } else{
            console.log("Passwords don't match")
        }
        
    }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={[styles.inputContainer,{paddingRight: 45}]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={showPassword}/>
                        <TouchableOpacity
                            onPress={()=>setShowPassword(!showPassword)}
                            style={{position: 'absolute', right: 15, top: 15}}>
                            {password.length<1?null:showPassword?
                                <Ionicons name="eye-off-outline" size={24} color={'gray'} />
                                : <Ionicons name="eye-outline" size={24} color={'gray'} />}
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={textStyles.heading2}>Confirm Password</Text>
                    <View style={{position: 'relative'}}>
                        <TextInput
                            style={[styles.inputContainer,{paddingRight: 45}]}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={showConfirmPassword}/>
                        <TouchableOpacity
                            onPress={()=>setShowConfirmPassword(!showConfirmPassword)}
                            style={{position: 'absolute', right: 15, top: 15}}>
                            {confirmPassword.length<1?null:showConfirmPassword?
                                <Ionicons name="eye-off-outline" size={24} color={'gray'} />
                                : <Ionicons name="eye-outline" size={24} color={'gray'} />}
                        </TouchableOpacity>
                    </View>
                </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={[textStyles.heading2, { lineHeight: 25 }]}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={textStyles.subheading}>Already a user?</Text>
            <Link style={textStyles.link} href="/login">Login here</Link>
        </View>

        <View style={styles.imageContainer2}>
            <Image
                source={require('../assets/images/OctopusLogo.png')}
                style={styles.image2}/>
        </View>
    </View>
    </ScrollView>
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
        alignSelf: 'center',
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
        marginTop: 30,
        marginBottom: 40,
    },
    imageContainer2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image2: {
        width: 200,
        resizeMode: 'contain',
        position: 'absolute',
        top: 675,
        left: 53,
    },
  });