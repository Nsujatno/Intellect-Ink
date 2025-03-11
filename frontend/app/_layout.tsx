import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Titan One': require('../assets/fonts/TitanOne-Regular.ttf'),
    'Lato Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato Bold Italic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Lato Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Literata Regular': require('../assets/fonts/Literata-VariableFont_opsz,wght.ttf'),

  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
      </Stack>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#E2E2E2",
      flex: 1,
  },
});