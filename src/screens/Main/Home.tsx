import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ms } from "react-native-size-matters";
import SwipeableBtn from "../../components/SwipeableBtn";
import { useAuthCtx } from "../../context/AuthContext";
import ChatFloatingBtn from "../../components/ChatFloatingBtn";
import Servers from "../../components/Servers";
import { useMainCtx } from "../../context/MainContext";

import { useNavigation } from "@react-navigation/native";
import { naviagationProp } from "../../types/navigation";
import { setLastActive } from "../../api/setLastActive";
const Home = () => {
  const [option, setOptions] = useState<
    "All" | "Favourites"
  >("All");
  const { user } = useAuthCtx();
  const { servers } = useMainCtx();
  const navigation = useNavigation<naviagationProp>();
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.uid) {
        setLastActive(user.uid);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTxt, styles.greetTxt]}>
            Hello,
          </Text>
          <Text style={[styles.headerTxt, styles.nameTxt]}>
            {user?.displayName}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Setting")}
            style={styles.settingContainer}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SwipeableBtn
        choose={option}
        setChoose={setOptions}
      />
      <FlatList
        data={servers}
        renderItem={({ item }) => (
          <Servers
            uri={item.url}
            title={item.name}
            des={item.des}
            code={item.code}
          />
        )}
      />
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
  settingContainer: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
