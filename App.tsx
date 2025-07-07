import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AuthCtxProvider } from "./src/context/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import MainStack from "./src/navigation/MainStack";
import * as SplashScreen from "expo-splash-screen";
import SplashScreens from "./src/screens/SplashScreen";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      SplashScreen.hideAsync();
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (!loaded && !error) {
    return null;
  }
  if (loading) {
    return <SplashScreens setLoading={setLoading} />;
  }
  return (
    <AuthCtxProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer>
          {user ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthCtxProvider>
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
