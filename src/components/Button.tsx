import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { buttonProps } from "./types";
import { ms } from "react-native-size-matters";

const Button = ({
  text,
  onPress,
  backgroundColor,
  color,
}: buttonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: color }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "6%",
    backgroundColor: "red",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  text: {
    color: colors.secondary,
    fontFamily: fonts.InriaBold,
    fontSize: ms(15),
  },
});
