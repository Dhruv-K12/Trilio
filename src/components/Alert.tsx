import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAuthCtx } from "../context/AuthContext";
import { colors } from "../constants/colors";
import Foundation from "@expo/vector-icons/Foundation";
import { fonts } from "../constants/fonts";
const Alert = () => {
  const { alertConfig, setAlertConfig } = useAuthCtx();
  const resetAlertConfig = () => {
    setAlertConfig({
      alert: false,
      error: "",
    });
  };
  return (
    <Modal visible={alertConfig.alert} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <View style={styles.headerContainer}>
            <Foundation
              name="alert"
              size={40}
              color={colors.primary}
            />
            <Text style={styles.header}>Alert</Text>
          </View>
          <Text style={styles.description}>
            {alertConfig.error}
          </Text>
          <TouchableOpacity
            onPress={resetAlertConfig}
            style={styles.alertBtn}
          >
            <Text style={styles.header}>ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  alertBox: {
    width: "90%",
    height: 200,
    backgroundColor: colors.rarely,
    borderRadius: 20,
    padding: 8,
    shadowColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
  },
  header: {
    color: colors.secondary,
    fontFamily: fonts.InterBold,
    margin: 8,
  },
  description: {
    color: colors.secondary,
    fontFamily: fonts.InriaBoldItalic,
    margin: 20,
  },
  alertBtn: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    alignSelf: "flex-end",
    margin: 20,
  },
});
