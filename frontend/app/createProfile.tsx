import { Text, View, Button } from "react-native";
import { textStyles } from "./stylesheets/textStyles";
import { useRouter } from "expo-router";
export default function CreateProfile() {
  const router = useRouter();

  return (
    <View>
      <Text style={textStyles.pageHeader}>Create Profile</Text>
      <Button title="Skip" onPress={() => router.push('/home')} />
      <Button title="Next" onPress={() => router.push('/home')} />
    </View>
  );
}
