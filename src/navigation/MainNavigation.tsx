import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthCtx } from "../context/AuthContext";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import SplashScreens from "../screens/SplashScreen";
import * as SplashScreen from "expo-splash-screen";
import Alert from "../components/Alert";
import { getServer } from "../api/getServer";
import { useMainCtx } from "../context/MainContext";
import { getSavedServer } from "../storage/getServer";
import { getMembers } from "../api/getMembers";
SplashScreen.preventAutoHideAsync();
const MainNavigation = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthCtx();
  const { setServers } = useMainCtx();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getSavedServer(setServers);
        getServer(user.uid, setServers);
      }
      SplashScreen.hide();
    });
    return unsub;
  }, []);
  if (loading) {
    return <SplashScreens setLoading={setLoading} />;
  }
  return user ? <MainStack /> : <AuthStack />;
};

export default MainNavigation;

const styles = StyleSheet.create({});
