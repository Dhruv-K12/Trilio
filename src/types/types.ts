import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { TouchableOpacityProps, View } from "react-native";
import { AnimatedProps } from "react-native-reanimated";

export type alertConfigType = {
  alert: boolean;
  error: string;
};

export type authCtxType = {
  alertConfig: alertConfigType;
  setAlertConfig: alertConfigState;
  loading: boolean;
  setLoading: booleanState;
  user: User | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<User | undefined>
  >;
};
export type mainCtxType = {
  TouchableAnimated: React.FunctionComponent<
    AnimatedProps<
      TouchableOpacityProps & React.RefAttributes<View>
    >
  >;
  servers: servers[];
  setServers: any;
  goBack: () => void;
};
export type booleanState = React.Dispatch<
  React.SetStateAction<boolean>
>;

export type alertConfigState = React.Dispatch<
  React.SetStateAction<alertConfigType>
>;

export type memberType = {
  displayName: string;
  lastSeen: DateConstructor;
  uri: string;
};
export type messagesType = {
  createdAt: string;
  msg: string;
  name: string;
  profileUri: string;
  senderId: string;
};
export type messageState = React.Dispatch<
  React.SetStateAction<messagesType[]>
>;

export type servers = {
  code: string;
  createdAt: any;
  des: string;
  name: string;
  password: string;
  type: "Public" | "Private";
  uid: string;
  url: string;
};
export type serversState = React.Dispatch<
  React.SetStateAction<servers[]>
>;
