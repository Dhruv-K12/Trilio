import { StyleSheet, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import LottieView from "lottie-react-native";
import { booleanState } from "../types/types";

const SplashScreens = ({
  setLoading,
}: {
  setLoading: booleanState;
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Animation/Logo.json")}
        style={styles.logo}
        autoPlay
        loop={false}
        onAnimationFinish={() => setLoading(false)}
      />
    </View>
  );
};

export default SplashScreens;

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
