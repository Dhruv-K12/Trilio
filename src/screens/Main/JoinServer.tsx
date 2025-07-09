import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

const JoinServer = () => {
  return (
    <View style={styles.container}>
      <Text>JoinServer</Text>
    </View>
  );
};

export default JoinServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
