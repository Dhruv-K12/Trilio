import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { inputProps } from "./types";

const Input = ({
  placeholder,
  onChangeText,
  value,
}: inputProps) => {
  return (
    <TextInput
      style={styles.container}
      placeholder={placeholder}
      placeholderTextColor="#696363"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "8%",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 8,
    fontFamily: fonts.InriaBold,
    margin: 8,
  },
});
