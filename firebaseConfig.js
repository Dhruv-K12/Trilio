import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD6D7l7JSz7oRnQA7nFFle6OAglsSnlJM",
  authDomain: "trilio-ab33c.firebaseapp.com",
  projectId: "trilio-ab33c",
  storageBucket: "trilio-ab33c.firebasestorage.app",
  messagingSenderId: "304565311303",
  appId: "1:304565311303:web:4e89f31897043066c85e62",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore();
