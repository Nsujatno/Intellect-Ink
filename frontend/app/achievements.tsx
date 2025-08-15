import { useEffect, useState } from 'react';
import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { textStyles } from './stylesheets/textStyles';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const storedAchievements = await AsyncStorage.getItem('userAchievements');
        if (storedAchievements) {
          setAchievements(JSON.parse(storedAchievements));
        }
      } catch (e) {
        console.error("Error fetching achievements", e);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={textStyles.subheadingBlack}>{`< Back`}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/achievements_bg.png")}
          style={styles.imagebg}
        />
        <Text style={[textStyles.pageHeader]}>Achievements</Text>
      </View>

      <View style={styles.achievementsContainer}>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementBox}>
            <Image source={achievement.icon} style={styles.achievementIcon} />
            <View style={styles.achievementText}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
    marginBottom: -30,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  imagebg: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.457,
    resizeMode: 'cover',
  },
  pageTitle: {
    position: 'absolute',
    top: 30,
    color: '#000',
  },
  achievementsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  achievementBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: 'contain',
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
});
