import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import Input from "../../components/Input";
import AuthBtn from "../../components/AuthBtn";
import { validateAuth } from "../../utils/validateAuth";
import { useAuthCtx } from "../../context/AuthContext";
import Alert from "../../components/Alert";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setAlertConfig, setLoading } = useAuthCtx();
  const validateName = () => {
    if (name.trim().length !== 0) {
      validateAuth(
        email,
        pass,
        setAlertConfig,
        setLoading,
        name
      );
    } else {
      setAlertConfig({
        alert: true,
        error: "Your name is empty",
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/Images/Signup.png")}
        style={styles.img}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.header}>Signup</Text>
        <Text style={styles.description}>
          Enter your name, email and password to continue
        </Text>
      </View>

      <Input
        value={name}
        onChangeText={setName}
        placeholder="Enter Your Name Here"
      />
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Your Email Here"
      />
      <Input
        value={pass}
        onChangeText={setPass}
        placeholder="Enter Your Password Here"
      />
      <AuthBtn
        onPress={validateName}
        backgroundColor={colors.rarely}
        text="Signup"
      />
      <Alert />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  img: {
    width: "90%",
    height: "30%",
  },
  header: {
    color: colors.secondary,
    fontFamily: fonts.InriaBold,
    fontSize: ms(20),
    margin: 8,
  },
  description: {
    fontFamily: fonts.InriaBold,
    color: colors.secondary,
    fontSize: ms(10),
  },
  textContainer: {
    alignItems: "center",
    margin: 16,
  },
});
