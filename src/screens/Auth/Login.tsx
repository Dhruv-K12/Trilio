import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import AuthBtn from "../../components/AuthBtn";
import { validateAuth } from "../../utils/validateAuth";
import Alert from "../../components/Alert";
import { useAuthCtx } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { setAlertConfig, setLoading, alertConfig } =
    useAuthCtx();
  if (alertConfig.alert) {
    return <Alert />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/Images/Login.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.description}>
          Enter your email and password to continue
        </Text>
      </View>

      <Input
        placeholder="Enter Your Email Here"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        placeholder="Enter Your Password Here"
        onChangeText={setPass}
        value={pass}
      />
      <AuthBtn
        onPress={() =>
          validateAuth(
            email,
            pass,
            setAlertConfig,
            setLoading
          )
        }
        backgroundColor={colors.primary}
        text="Login"
      />
    </SafeAreaView>
  );
};

export default Login;

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
  textContainer: {
    alignItems: "center",
    margin: 16,
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
});
