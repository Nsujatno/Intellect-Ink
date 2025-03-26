
import { Text, ScrollView, View, Switch, Image, StyleSheet, TextInput, TouchableOpacity, FlatList} from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import CheckBox from "../components/checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [medias, setMedias] = useState<string[]>([]);
  const options = [
    { value: 'Poems', label: 'Poems' },
    { value: 'Articles', label: 'Articles' },
    { value: 'Books', label: 'Books' },
    { value: 'Politics', label: 'Politics' },
    { value: 'Research', label: 'Research' },
  ];
  const favorites = [
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
  ];
  const Item = ({ item }: { item: ItemProps }) => (
    <View style={styles.favorites}>
    <Text style={textStyles.heading2purple}>{item.title}</Text>
  </View>
  );
  type ItemProps = {
    id: string,
    title: string,
    };

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

  return (
    <ScrollView style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/profilebg.png')}
          style={styles.image}/>
      </View>

      <View style={styles.textContainer}>
        
        <Text style={textStyles.pageHeader}>{isEditing?"Edit Profile":"Profile"}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 60,}}>
            <Image
            source={require('../../assets/images/pfp.png')}
            style={styles.pfpImg}/>
            {isEditing? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>setIsEditing(!isEditing)}>
                    <Text style={textStyles.subheading}>Save Changes</Text>
                </TouchableOpacity>
            ):(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>setIsEditing(!isEditing)}>
                    <Text style={textStyles.subheading}>Edit Profile</Text>
                </TouchableOpacity>
            )}
            
        </View>

        <View style={styles.leftContainer}>
            {isEditing? (
                <View style={{marginTop: 20}}>
                    <Text style={textStyles.heading2}>Change Name</Text>
                    <TextInput style={styles.inputContainer} /*value={name} onChangeText={setName}*//>
                </View>
            ):(
                <View style={{marginTop: 45, marginBottom: 40, alignSelf: 'center'}}>
                    <Text style={textStyles.heading2}>Hello, Name</Text>
                </View>
            )}
          
          <Text style={[textStyles.heading1, {marginTop: 30}]}>Preferences</Text>
        
          <Text style={[textStyles.heading2, {marginVertical: 20}]}>Media</Text>
          <CheckBox
            options={options}
            checkedValues={medias}
            onChange={(updatedValues) => setMedias(updatedValues)}
          />
          <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Daily Goal</Text>
        
        </View>

        {isEditing? (
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
        ):(
            <View style={styles.goalContainer}>
            <Text style={textStyles.subheading}>Your daily time goal is</Text>
                <Text style={textStyles.pageHeader}> {count} </Text>
            <Text style={textStyles.subheading}>minutes/day</Text>
            </View>
        )}

        <Text style={[textStyles.heading2, {marginVertical: 20, marginTop: 50,}]}>Notifications</Text>
        <View style={styles.notifications}>
          <Text style={[textStyles.subheading]}>Daily Reminder</Text>
          {isEditing? (
            <Switch value={dailyNotifications}
            onValueChange={() => setDailyNotifications((previousState) => !previousState)}
            trackColor={{false: "#E2E2E2", true: "#646EA3"}}
            thumbColor={dailyNotifications ? "#413F6F" : "white"}
          />
          ):(
            <Text style={textStyles.subheading}>{dailyNotifications?"ON":"OFF"}</Text>
          )}
          
        </View>
        {isEditing && dailyNotifications && (
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
        <Text style={[textStyles.heading1, {marginVertical: 20, marginTop: 50,}]}>Favorites</Text>
        <View style={{width: 315}}>
        <FlatList
            data={favorites}
            renderItem={({ item }) => <Item item={item} />}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
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
      width: 112,
      height: 110,
      alignSelf: 'center',
  },
  textContainer: {
      position: "absolute",
      top: 50,
      alignSelf: 'center',
  },
  leftContainer: {
      alignSelf: 'flex-start',
      width: '100%',
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      borderRadius: 5,
      elevation: 10,
      alignItems: 'center',
      height: 50,
      fontSize: 20,
      paddingHorizontal: 15,
      marginBottom: 15,
  },
  button: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      height: 50,
      width: 160,
      marginLeft: 20,
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
  favorites: {
    backgroundColor: 'white',
    padding: 10,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
});
