import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { fonts } from "../constants/fonts";
import { colors } from "../constants/colors";
import { labelInputProps } from "./types";

const LabelInput = ({
  title,
  value,
  onChangeText,
  multiline = false,
  length,
}: labelInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        style={[styles.input, multiline && { height: 100 }]}
        textAlignVertical="top"
        maxLength={length}
      />
      <Text style={styles.txt}>
        {value.length}/{length}
      </Text>
    </View>
  );
};

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontFamily: fonts.InriaLight,
    color: colors.secondary,
    margin: 5,
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    height: 50,
  },
  txt: {
    color: colors.secondary,
    alignSelf: "flex-end",
  },
});
