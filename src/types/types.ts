import { User } from "firebase/auth";
import React from "react";
import { TouchableOpacityProps, View } from "react-native";
import { AnimatedProps } from "react-native-reanimated";

export type alertConfigType = {
  alert: boolean;
  error: string;
};
export type authCtxType = {
  alertConfig: alertConfigType;
  setAlertConfig: React.Dispatch<
    React.SetStateAction<alertConfigType>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  servers: any[];
  setServers: React.Dispatch<React.SetStateAction<any[]>>;
};
export type booleanState = React.Dispatch<
  React.SetStateAction<boolean>
>;
