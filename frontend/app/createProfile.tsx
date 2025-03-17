import { Text, ScrollView, View, Button, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { textStyles } from "./stylesheets/textStyles";
import CheckBox from "./components/checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateProfile() {
  const router = useRouter();
  const [medias, setMedias] = useState<string[]>([]);
  const options = [
    { value: 'Poems', label: 'Poems' },
    { value: 'Articles', label: 'Articles' },
    { value: 'Books', label: 'Books' },
    { value: 'Politics', label: 'Politics' },
    { value: 'Research', label: 'Research' },
  ];

  const [count,setCount]=useState(0)
  const plus = ()=>{
    setCount(count + 5)
  }
  const minus = ()=>{
    if (count > 0)
      setCount(count - 5)
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/profilebg.png')}
          style={styles.image}/>
      </View>

      <View style={styles.textContainer}>
        
        <Text style={textStyles.pageHeader}>Create Profile</Text>
        <Image
          source={require('../assets/images/pfp.png')}
          style={styles.pfpImg}/>

        <View style={styles.leftContainer}>
          <Text style={textStyles.heading2}>Name</Text>
          <TextInput style={styles.inputContainer} /*value={email} onChangeText={setEmail}*//>
         
          <Text style={[textStyles.heading1, {marginTop: 70}]}>Preferences</Text>
        
          <Text style={[textStyles.heading2, {marginVertical: 20}]}>Media</Text>
          <CheckBox
            options={options}
            checkedValues={medias}
            onChange={(updatedValues) => setMedias(updatedValues)}
          />
          <Text style={[textStyles.heading2, {marginVertical: 20}]}>Daily Goal</Text>
        
        </View>

        <View style={styles.goalContainer}>
          <Text style={textStyles.subheading}>Set your daily time goal</Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={minus}>
                <Text style={textStyles.pageHeader}>-</Text>
              </TouchableOpacity>
              <Text style={textStyles.pageHeader}> {count} </Text>
              <TouchableOpacity onPress={plus}>
                <Text style={textStyles.pageHeader}>+</Text>
              </TouchableOpacity>
            </View>

          <Text style={textStyles.subheading}>minutes/day</Text>

        </View>

        <Text style={[textStyles.heading2, {marginVertical: 20}]}>Daily Notifications</Text>

        <Button title="Skip" onPress={() => router.push('/home')} />
        <Button title="Next" onPress={() => router.push('/home')} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  imageContainer: {
      width: '100%',
      height: '60%',
      marginTop: 120,
  },
  image: {
      resizeMode: 'cover',
      width: '100%',
      height: undefined,
      aspectRatio: 0.275,
  },
  pfpImg: {
      width: 112,
      height: 110,
      marginTop: 40,
      alignSelf: 'center',
  },
  textContainer: {
      position: "absolute",
      top: 50,
      alignSelf: 'center',
  },
  leftContainer: {
      alignSelf: 'flex-start',
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
  goalContainer: {
    width: '100%',
    height: 170,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  }
});