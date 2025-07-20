import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { buttonProps } from "./types";
import { fonts } from "../constants/fonts";
import { colors } from "../constants/colors";
import { useAuthCtx } from "../context/AuthContext";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useMainCtx } from "../context/MainContext";
const AuthBtn = ({
  onPress,
  color,
  backgroundColor,
  text,
}: buttonProps) => {
  const { loading } = useAuthCtx();
  const { TouchableAnimated } = useMainCtx();
  const progress = useSharedValue(0);
  const width = useWindowDimensions().width;

  useEffect(() => {
    if (loading) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
  }, [loading]);
  const container = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [width / 2, 60]
      ),
      borderRadius: interpolate(
        progress.value,
        [0, 1],
        [20, 30]
      ),
    };
  });
  return (
    <TouchableAnimated
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        container,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
        />
      ) : (
        <Text style={[styles.buttonText, { color: color }]}>
          {text}
        </Text>
      )}
    </TouchableAnimated>
  );
};

export default AuthBtn;

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: "7%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: fonts.InriaBold,
    color: colors.secondary,
  },
});
