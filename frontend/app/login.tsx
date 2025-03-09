import { StyleSheet, Text, View, Image, TextInput, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";

export default function Login() {
    const router = useRouter();

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
                <TextInput style={styles.inputContainer}/>
                <Text style={textStyles.heading2}>Password</Text>
                <TextInput style={styles.inputContainer}/>
            </View>
            
            <Pressable style={styles.button} onPress={() => router.push("/signup")}>
                <Text style={[textStyles.heading2, { lineHeight: 25 }]}>Login</Text>
            </Pressable>

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
        top: -20,
        position: 'absolute',
    },
    image: {
        width: 400,
        resizeMode: 'contain',
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