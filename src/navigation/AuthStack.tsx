import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction from "../screens/Auth/Introduction";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import { routeAuthStackParamList } from "../types/navigation";
import { useAuthCtx } from "../context/AuthContext";
import Alert from "../components/Alert";

const Stack =
  createNativeStackNavigator<routeAuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Introduction"
        component={Introduction}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
