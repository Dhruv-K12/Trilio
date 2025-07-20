import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { serversProps } from "./types";
import { fonts } from "../constants/fonts";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { navigationMainProp } from "../types/navigation";

const Servers = ({
  uri,
  title,
  des,
  code,
  profile = false,
}: serversProps) => {
  const navigation = useNavigation<navigationMainProp>();
  const navigate = () => {
    navigation.navigate("ChatScreen", {
      name: title,
      code,
      des,
      uri,
    });
  };
  return (
    <TouchableOpacity
      onPress={navigate}
      disabled={profile}
      style={styles.container}
    >
      <View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: uri }}
            style={styles.profile}
          />
          <View style={styles.txtContainer}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.des}>{des}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Servers;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 16,
    margin: 5,
    alignSelf: "center",
    borderColor: colors.rarely,
    borderBottomWidth: 1,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileContainer: {
    flexDirection: "row",
  },
  header: {
    fontFamily: fonts.InterBold,
    color: colors.secondary,
  },
  des: {
    fontFamily: fonts.InterThin,
    color: colors.secondary,
  },
  txtContainer: {
    justifyContent: "space-around",
    padding: 12,
  },
});
