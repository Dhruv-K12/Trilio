import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";
import SwipeableBtn from "../../components/SwipeableBtn";
import { useAuthCtx } from "../../context/AuthContext";
import ChatFloatingBtn from "../../components/ChatFloatingBtn";
import { useNavigation } from "@react-navigation/native";

import {
  naviagationProp,
  routeMainStackParamList,
} from "../../types/navigation";
const Home = () => {
  const [option, setOptions] = useState<
    "All" | "Favourites"
  >("All");
  const name = useAuthCtx().userCredential?.displayName;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTxt, styles.greetTxt]}>
            Hello,
          </Text>
          <Text style={[styles.headerTxt, styles.nameTxt]}>
            {name}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Ionicons
              name="search-circle-outline"
              size={40}
              color={colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical-circle-outline"
              size={38}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SwipeableBtn
        choose={option}
        setChoose={setOptions}
      />
      <View style={styles.containerFloatingBtn}></View>
      <ChatFloatingBtn />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTxt: {
    color: colors.secondary,
    fontSize: ms(16),
  },
  greetTxt: {
    fontFamily: fonts.InterThin,
  },
  nameTxt: {
    fontFamily: fonts.InterBold,
  },
  btnContainer: {
    flexDirection: "row",
  },
  containerFloatingBtn: {
    flex: 0.9,
    justifyContent: "flex-end",
  },
});
