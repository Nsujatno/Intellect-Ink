import { Text, View, Button } from "react-native";
import { textStyles } from "./stylesheets/textStyles";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Text style={textStyles.logo}>Intellect Ink</Text>
      <Button title="Log In" onPress={() => router.push('/login')} />
      <Button title="Sign Up" onPress={() => router.push('/signup')} />
    </View>
  );
}
