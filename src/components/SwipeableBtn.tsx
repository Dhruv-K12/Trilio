import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { swibeableBtnProps } from "./types";

const SwipeableBtn = ({
  choose,
  setChoose,
}: swibeableBtnProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setChoose("All")}
        style={[
          styles.btn,
          {
            backgroundColor:
              choose === "All"
                ? colors.primary
                : colors.rarely,
          },
        ]}
      >
        <Text style={styles.txt}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setChoose("Favourites")}
        style={[
          styles.btn,
          {
            backgroundColor:
              choose === "Favourites"
                ? colors.primary
                : colors.rarely,
          },
        ]}
      >
        <Text style={styles.txt}>Favourites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwipeableBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.rarely,
    width: "90%",
    height: 50,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  txt: {
    color: colors.secondary,
    fontFamily: fonts.InterBold,
    textAlign: "center",
  },
  btn: {
    width: "50%",
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
  },
  onClick: {
    backgroundColor: colors.rarely,
  },
});
