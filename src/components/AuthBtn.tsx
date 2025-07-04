import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { buttonProps } from "./types";
import { fonts } from "../constants/fonts";
import { colors } from "../constants/colors";

const AuthBtn = ({
  onPress,
  color,
  backgroundColor,
  text,
}: buttonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
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
  },
  buttonText: {
    fontFamily: fonts.InriaBold,
    color: colors.secondary,
  },
});
