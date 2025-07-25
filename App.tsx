import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AuthCtxProvider } from "./src/context/AuthContext";
import { MainCtxProvider } from "./src/context/MainContext";
import MainNavigation from "./src/navigation/MainNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView>
      <NavigationContainer>
        <AuthCtxProvider>
          <MainCtxProvider>
            <SafeAreaProvider style={{ flex: 1 }}>
              <MainNavigation />
            </SafeAreaProvider>
          </MainCtxProvider>
        </AuthCtxProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
