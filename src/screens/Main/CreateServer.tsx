import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import LabelInput from "../../components/LabelInput";
import { useAuthCtx } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import AuthBtn from "../../components/AuthBtn";
import { validateServer } from "../../utils/validateServer";
import Alert from "../../components/Alert";
import { useNavigation } from "@react-navigation/native";
import { naviagationProp } from "../../types/navigation";
const CreateServer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverDes, setServerDes] = useState("");
  const [option, setOption] = useState<
    "Public" | "Private"
  >("Public");
  const [password, setPassword] = useState("");
  const [serverCreated, isServerCreated] = useState(false);
  const navigation = useNavigation<naviagationProp>();
  const { user, setLoading, setAlertConfig } = useAuthCtx();
  const validateHandler = () => {
    if (user && user.displayName) {
      validateServer(
        serverName,
        serverDes,
        option,
        user.uid,
        user.displayName,
        image,
        setLoading,
        setAlertConfig,
        isServerCreated,
        password
      );
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    if (serverCreated) {
      ToastAndroid.show(
        "Server Addded",
        ToastAndroid.SHORT
      );
      navigation.goBack();
    }
  }, [serverCreated]);

  return (
    <SafeAreaView style={styles.container}>
      <Alert />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "android" ? "height" : "padding"
        }
        keyboardVerticalOffset={
          Platform.OS === "android" ? 0 : 80
        }
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <View>
            <Pressable
              onPress={pickImage}
              style={styles.userProfileContainer}
            >
              {image === null ? (
                <>
                  <FontAwesome
                    name="user"
                    size={100}
                    color={colors.background}
                  />
                  <Ionicons
                    style={styles.cameraIcon}
                    name="camera"
                    size={24}
                    color={colors.rarely}
                  />
                </>
              ) : (
                <Image
                  source={{ uri: image }}
                  style={styles.profile}
                  resizeMode="cover"
                />
              )}
            </Pressable>
            <Text style={styles.headerTxt}>
              Upload Photo
            </Text>
          </View>

          <LabelInput
            title="Enter Your Server Name"
            value={serverName}
            onChangeText={setServerName}
            length={16}
          />

          <LabelInput
            title="Enter Your Server Description"
            value={serverDes}
            onChangeText={setServerDes}
            multiline
            length={32}
          />
          <View>
            <Text style={styles.labelTxt}>Server Type</Text>
            <View style={styles.swipeableContainer}>
              <TouchableOpacity
                onPress={() => setOption("Public")}
                style={[
                  styles.swipeableBtn,
                  option == "Public" &&
                    styles.selectedOptionBtn,
                ]}
              >
                <Text
                  style={
                    option == "Public" && styles.labelTxt
                  }
                >
                  Public
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOption("Private")}
                style={[
                  styles.swipeableBtn,
                  option == "Private" &&
                    styles.selectedOptionBtn,
                ]}
              >
                <Text
                  style={
                    option == "Private" && styles.labelTxt
                  }
                >
                  Private
                </Text>
              </TouchableOpacity>
            </View>
            {option === "Private" && (
              <LabelInput
                title="Password"
                value={password}
                onChangeText={setPassword}
                length={8}
              />
            )}
          </View>
          <AuthBtn
            onPress={validateHandler}
            backgroundColor={colors.primary}
            color={colors.secondary}
            text="Create"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  userProfileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "black",
    opacity: 0.8,
    padding: 12,
    alignSelf: "center",
  },
  cameraIcon: {
    alignSelf: "flex-end",
  },
  headerTxt: {
    fontFamily: fonts.InriaBold,
    color: colors.secondary,
    fontSize: ms(16),
    margin: 8,
    alignSelf: "center",
  },
  swipeableContainer: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    width: "90%",
    alignSelf: "center",
    height: 50,
    borderRadius: 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  swipeableBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
  },
  labelTxt: {
    color: colors.secondary,
    fontFamily: fonts.InriaLight,
    marginLeft: 16,
  },
  selectedOptionBtn: {
    backgroundColor: colors.primary,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
