import { Role, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Main/Home";
import { routeMainStackParamList } from "../types/navigation";

const Stack =
  createNativeStackNavigator<routeMainStackParamList>();
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
