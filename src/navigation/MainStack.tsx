import { Role, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Main/Home";
import { routeMainStackParamList } from "../types/navigation";
import { User } from "firebase/auth";
import { useAuthCtx } from "../context/AuthContext";

const Stack =
  createNativeStackNavigator<routeMainStackParamList>();
const MainStack = ({ user }: { user: User }) => {
  const { setUserCredential } = useAuthCtx();
  useEffect(() => {
    setUserCredential(user);
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
