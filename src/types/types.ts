import { User } from "firebase/auth";
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
  userCredential: User | undefined;
  setUserCredential: React.Dispatch<
    React.SetStateAction<User | undefined>
  >;
};
export type mainCtxType = {
  TouchableAnimated: React.FunctionComponent<
    AnimatedProps<
      TouchableOpacityProps & React.RefAttributes<View>
    >
  >;
};
