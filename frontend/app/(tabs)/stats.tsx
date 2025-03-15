import { Text, View, Button, Image, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import { useEffect, useState } from 'react';

export default function Stats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  {/* For fetching user statistics
    useEffect(() => {
        const fetchStats = async () => {
          try {
  
          } catch (error) {
            
          } finally {
            setLoading(false);
          } 
    };
     fetchStats();
  }, []);

  if (loading)
  */}

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* Heading */}
          <Text style={textStyles.pageHeader}>Statistics</Text>

          {/* Gradient with waves background */}
          <ImageBackground
            source={require('../../assets/images/stats_background.png')}
            style={styles.imagebg}/>

          {/* Display User's Data*/}

          {/* Dropdown Buttons */}
          {/* <TouchableOpacity></TouchableOpacity*/}
          
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imagebg: {
      flex: 1,
      resizeMode: 'cover',
      /* Once background image resizing is fixed, scrolling is enabled
      width: 100%,
      height: ,
      resizeMode: 'contain',
      */
    },
    scrollView: {
      flexGrow: 1,
    }
  });