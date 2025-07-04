import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Animation/Logo.json")}
        style={styles.logo}
        autoPlay
        loop={false}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "90%",
    height: "40%",
  },
});
