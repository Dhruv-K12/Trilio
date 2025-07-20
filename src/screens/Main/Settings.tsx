import {
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import LabelInput from "../../components/LabelInput";
import { useAuthCtx } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "../../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../api/uploadImage";
import AuthBtn from "../../components/AuthBtn";
import { doc, setDoc } from "firebase/firestore";
const Settings = () => {
  const { user, setLoading } = useAuthCtx();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
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
    if (user?.displayName) {
      setName(user.displayName);
    }
    if (user?.photoURL) {
      setImage(user?.photoURL);
    }
  }, []);
  const updateProfileHandler = async () => {
    if (user) {
      setLoading(true);
      if (image) {
        const uploadedImage = await uploadImage(image);
        await updateProfile(user, {
          displayName: name,
          photoURL: uploadedImage,
        });
        await setDoc(doc(db, "profile", user.uid), {
          displayName: name,
          uri: uploadedImage,
        });
      } else {
        await updateProfile(user, {
          displayName: name,
        });
      }
      setLoading(false);
    }
    ToastAndroid.show(
      "Your Profile will be updated after restarting your app",
      ToastAndroid.LONG
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={pickImage}
        style={styles.userProfileContainer}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        ) : (
          <AntDesign
            name="user"
            size={80}
            color={colors.secondary}
          />
        )}
      </Pressable>
      <LabelInput
        title="Enter Your name"
        length={8}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <AuthBtn
        text="Update"
        onPress={updateProfileHandler}
        backgroundColor={colors.primary}
      />
    </SafeAreaView>
  );
};

export default Settings;

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
    backgroundColor: "black",
    opacity: 0.8,
    padding: 12,
    alignSelf: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    alignSelf: "flex-end",
  },
});
