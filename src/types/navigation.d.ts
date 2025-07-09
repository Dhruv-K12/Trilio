import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type routeAuthStackParamList = {
  Introduction: undefined;
  Login: undefined;
  Signup: undefined;
};

export type routeMainStackParamList = {
  Home: undefined;
  CreateServer: undefined;
  JoinServer: undefined;
};

export type naviagationProp =
  NativeStackNavigationProp<routeMainStackParamList>;
