import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import LottieView from "lottie-react-native";
import Button from "../../components/Button";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "./types";

const Introduction = () => {
  const navigation = useNavigation<navigationProps>();
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../../assets/Animation/Intro.json")}
        style={styles.Intro}
        autoPlay
        loop={false}
      />
      <Text style={styles.header}>
        Welcome to Trilo — The Future of Server-Based Chat
      </Text>
      <Text style={styles.description}>
        Trilo is a fast, secure, and modern chat app
        designed for seamless communication powered by
        server-based architecture. Whether you're
        collaborating with your team, connecting with
        friends, or building a community, Trilo offers
        real-time messaging, intelligent notifications, and
        a clean, intuitive interface built for performance.
        With features like voice message sharing, group
        chats, media storage, and gesture-driven
        transitions, Trilo isn't just another chat app —
        it's the next evolution in digital conversations.
        Stay connected. Stay in control. Chat smarter with
        Trilo.
      </Text>

      <Button
        onPress={() => navigation.navigate("Login")}
        text="Login"
        backgroundColor={colors.primary}
        color={colors.secondary}
      />
      <Button
        onPress={() => navigation.navigate("Signup")}
        text="Create Account"
        backgroundColor={colors.rarely}
        color="black"
      />
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  header: {
    fontFamily: fonts.InriaBoldItalic,
    color: colors.secondary,
    marginVertical: 8,
  },
  description: {
    fontFamily: fonts.InriaRegular,
    color: colors.secondary,
    fontSize: ms(10),
    width: "95%",
    textAlign: "center",
  },

  Intro: {
    width: "100%",
    height: "60%",
  },
});
