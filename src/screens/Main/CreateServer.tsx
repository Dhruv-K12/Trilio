import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import LabelInput from "../../components/LabelInput";
import Button from "../../components/Button";
const CreateServer = () => {
  const [serverName, setServerName] = useState("");
  const [serverDes, setServerDes] = useState("");
  const [option, setOption] = useState<
    "Public" | "Private"
  >("Public");
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.userProfileContainer}>
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
        </View>
        <Text style={styles.headerTxt}>Upload Photo</Text>
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
              style={option == "Public" && styles.labelTxt}
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
              style={option == "Private" && styles.labelTxt}
            >
              Private
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        text="Create"
        backgroundColor={colors.primary}
        color={colors.secondary}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default CreateServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-around",
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
});
