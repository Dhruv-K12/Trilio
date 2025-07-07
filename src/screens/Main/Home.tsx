import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
