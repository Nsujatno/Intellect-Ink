import { Text, ScrollView, View, Switch, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { textStyles } from "./stylesheets/textStyles";
import CheckBox from "./components/checkbox";
import Buttons from "./components/buttons";
import { useRouter } from "expo-router";
import { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function CreateProfile() {
  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const router = useRouter();
  const [image, setImage] = useState("");
  const [medias, setMedias] = useState<string[]>([]);
  const [name, setName] = useState("")
  const options = [
    { value: 'Poems', label: 'Poems' },
    { value: 'Articles', label: 'Articles' },
    { value: 'Books', label: 'Books' },
    { value: 'Politics', label: 'Politics' },
    { value: 'Research', label: 'Research' },
  ];
  const [dailyNotifications, setDailyNotifications] = useState(false);
  const [time, setTimeState] = useState(new Date());
  const handleTimeChange = (event: any, date: Date | undefined) => {
    const { type } = event;
    if (type === 'set' && date) {
      setTimeState(date);
    }
  };

  const [count,setCount]=useState(0)
  const plus = ()=>{
    setCount(count + 5)
  }
  const minus = ()=>{
    if (count > 0)
      setCount(count - 5)
  }

  const handleSubmit = async () => {
    // console.log("medias: " + medias)
    // console.log("count: " + count)
    // console.log("name: " + name)

    try{
      const payload = {
        name: name,
        media: medias,
        dailyReadingTime: count,
        notification: dailyNotifications,
        notificationTime: time,
      }
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put("http://localhost:8000/api/user/update-profile", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      router.push("/home")
    }
    catch (error){
      if (axios.isAxiosError(error)) {
        if(error.response){
            console.log('Error: ', error.response.data)
        }
      }
    }
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
        <TouchableOpacity onPress={selectPhoto}>
          <Image
            source={image ? { uri: image } : require('../assets/images/pfp.png')}
            style={styles.pfpImg}/>
        </TouchableOpacity>
        
        <View style={styles.leftContainer}>
          <Text style={textStyles.heading2}>Name</Text>
          <TextInput style={styles.inputContainer} value={name} onChangeText={setName}/>
         
          <Text style={[textStyles.heading1, {marginTop: 50}]}>Preferences</Text>
        
          <Text style={[textStyles.heading2, {marginVertical: 20}]}>Media</Text>
          <CheckBox
            options={options}
            checkedValues={medias}
            onChange={(updatedValues) => setMedias(updatedValues)}
          />
          <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Daily Goal</Text>
        
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

        <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Notifications</Text>
        <View style={styles.notifications}>
          <Text style={[textStyles.subheading]}>Daily Reminder</Text>
          <Switch value={dailyNotifications}
            onValueChange={() => setDailyNotifications((previousState) => !previousState)}
            trackColor={{false: "#E2E2E2", true: "#646EA3"}}
            thumbColor={dailyNotifications ? "#413F6F" : "white"}
          />
        </View>
        {dailyNotifications && (
            <View style={styles.notificationsExpanded}>
              <Text style={textStyles.subheading}>Set Time</Text>
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                onChange={handleTimeChange}
                themeVariant="light"
                accentColor="#413F6F"
              />
            </View>
        )}

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 50}}>
          <Buttons
            title='Skip'
            variant='whiteOutline'
            onPress={() => router.push('/home')}
          />
          <Buttons
            title='Next'
            variant='white'
            onPress={handleSubmit/*() => router.push('/home')*/}
          />
        </View>
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
      width: 110,
      height: 110,
      marginTop: 60,
      alignSelf: 'center',
      borderRadius: 55,
      borderColor: '#646EA3',
      borderWidth: 5,
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
  },
  notifications: {
    width: '100%',
    height: 50,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
  },
  notificationsExpanded: {
    width: '100%',
    height: 50,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: -7,
  },
});