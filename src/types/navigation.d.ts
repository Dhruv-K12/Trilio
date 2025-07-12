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
  ChatScreen: {
    name: string;
    code: string;
    des: string;
    uri: string;
  };
};

export type naviagationProp =
  NativeStackNavigationProp<routeMainStackParamList>;
