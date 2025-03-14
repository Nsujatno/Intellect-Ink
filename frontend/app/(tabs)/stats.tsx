import { Text, View, Button } from "react-native";
import { Image, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';

export default function Stats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // for fetching user's statistics
  //   useEffect(() => {
  //       const fetchStats = async () => {
  //         try {
  
  //         } catch (error) {
            
  //         } finally {
  //           setLoading(false);
  //         } 
  //   };
  //    fetchStats();
  // }, []);

    return (
        <View style={styles.container}>
          {/* Gradient with waves background */}
          <Image>
          </Image>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imagebg: {
      position: 'absolute',
    },
  });