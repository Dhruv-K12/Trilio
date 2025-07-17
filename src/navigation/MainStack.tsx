import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Main/Home";
import { routeMainStackParamList } from "../types/navigation";
import CreateServer from "../screens/Main/CreateServer";
import JoinServer from "../screens/Main/JoinServer";
import ChatScreen from "../screens/Main/ChatScreen";
import Settings from "../screens/Main/Settings";
import MemberScreen from "../screens/Main/MemberScreen";

const Stack =
  createNativeStackNavigator<routeMainStackParamList>();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "simple_push",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CreateServer"
        component={CreateServer}
      />
      <Stack.Screen
        name="JoinServer"
        component={JoinServer}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen
        name="MemberScreen"
        component={MemberScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
