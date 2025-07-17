import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
import { joinServer } from "../../api/joinServer";
import { useAuthCtx } from "../../context/AuthContext";
import Alert from "../../components/Alert";
import { useNavigation } from "@react-navigation/native";
import { naviagationProp } from "../../types/navigation";

const JoinServer = () => {
  const [serverCode, setServerCode] = useState("");
  const { user, setAlertConfig } = useAuthCtx();
  const [password, setPassword] = useState("");
  const [privateServer, isServerPrivate] = useState(false);
  const navigation = useNavigation<naviagationProp>();
  const goBack = () => {
    navigation.goBack();
  };
  const joinServerHandler = () => {
    if (user) {
      joinServer(
        serverCode.toUpperCase(),
        user,
        isServerPrivate,
        password,
        setAlertConfig,
        goBack
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Alert />
      <LottieView
        source={require("../../../assets/Animation/Lock.json")}
        style={styles.lockAnimation}
        autoPlay
      />
      <LabelInput
        title="Enter Server Code"
        value={serverCode.toUpperCase()}
        onChangeText={setServerCode}
        length={6}
      />
      {privateServer && (
        <LabelInput
          title="Enter Password"
          value={password}
          onChangeText={setPassword}
          length={8}
        />
      )}
      <Button
        text="Join"
        onPress={joinServerHandler}
        backgroundColor={colors.primary}
        color={colors.secondary}
      />
    </SafeAreaView>
  );
};

export default JoinServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  lockAnimation: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});
