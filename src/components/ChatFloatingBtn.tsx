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
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { naviagationProp } from "../types/navigation";

const ChatFloatingBtn = () => {
  const navigation = useNavigation<naviagationProp>();
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateServer")
          }
          style={styles.optionsBtn}
        >
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
        <TouchableOpacity
          onPress={() => navigation.navigate("JoinServer")}
          style={styles.optionsBtn}
        >
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
    position: "absolute",
    right: 1,
    bottom: 10,
  },
  floatBtn: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary,
    borderRadius: 30,
    alignSelf: "flex-end",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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
