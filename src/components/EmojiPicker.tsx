import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors } from "../constants/colors";
import { emoji } from "../constants/images";

const EmojiPicker = () => {
  return (
    <View style={styles.container}>
      {emoji.map((name) => (
        <TouchableOpacity>
          <Image
            source={name}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  container: {
    width: "60%",
    backgroundColor: colors.rarely,
    height: 50,
    borderRadius: 12,
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
