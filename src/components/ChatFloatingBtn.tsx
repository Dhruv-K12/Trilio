import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { useMainCtx } from "../context/MainContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fonts } from "../constants/fonts";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ChatFloatingBtn = () => {
  const { TouchableAnimated } = useMainCtx();
  const optionAnimated = useSharedValue(0);
  const optionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            optionAnimated.value,
            [0, 1],
            [60, 0]
          ),
        },
        {
          scale: interpolate(
            optionAnimated.value,
            [0, 1],
            [0, 1]
          ),
        },
      ],
      opacity: optionAnimated.value,
    };
  });
  const floatBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            interpolate(
              optionAnimated.value,
              [0, 1],
              [0, 360]
            ) + "deg",
        },
      ],
    };
  });

  const showOptions = () => {
    optionAnimated.value = withSpring(
      optionAnimated.value == 1 ? 0 : 1
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.optionContainer, optionStyle]}
      >
        <Text style={styles.optionTxt}>Create server</Text>
        <TouchableOpacity style={styles.optionsBtn}>
          <MaterialIcons
            name="create"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.optionContainer, optionStyle]}
      >
        <Text style={styles.optionTxt}>Join server</Text>
        <TouchableOpacity style={styles.optionsBtn}>
          <FontAwesome
            name="group"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableAnimated
        onPress={showOptions}
        style={[styles.floatBtn, floatBtnStyle]}
      >
        <Image
          source={require("../../assets/Images/floatBtn.png")}
          resizeMode="contain"
        />
      </TouchableAnimated>
    </View>
  );
};

export default ChatFloatingBtn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  floatBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: 30,
    alignSelf: "flex-end",
  },
  optionContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  optionsBtn: {
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    elevation: 3,
    shadowColor: colors.secondary,
    margin: 10,
  },
  optionTxt: {
    color: colors.secondary,
    fontFamily: fonts.InriaLight,
  },
});
