import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded, error] = useFonts({
    "Inria-Bold": require("./assets/Fonts/InriaSerif-Bold.ttf"),
    "Inria-BoldItalic": require("./assets/Fonts/InriaSerif-BoldItalic.ttf"),
    "Inria-Light": require("./assets/Fonts/InriaSerif-Light.ttf"),
    "Inria-Regular": require("./assets/Fonts/InriaSerif-Regular.ttf"),
    "Inter-Bold": require("./assets/Fonts/Inter_18pt-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/Fonts/Inter_18pt-ExtraBold.ttf"),
    "Inter-Light": require("./assets/Fonts/Inter_18pt-Light.ttf"),
    "Inter-Thin": require("./assets/Fonts/Inter_18pt-Thin.ttf"),
  });
  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
