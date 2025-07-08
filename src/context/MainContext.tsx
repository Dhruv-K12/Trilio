import { createContext, useContext } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { mainCtxType } from "../types/types";

const mainCtx = createContext<null | mainCtxType>(null);

export const MainCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const TouchableAnimated =
    Animated.createAnimatedComponent(TouchableOpacity);
  const value = {
    TouchableAnimated,
  };
  return (
    <mainCtx.Provider value={value}>
      {children}
    </mainCtx.Provider>
  );
};

export const useMainCtx = () => {
  const ctx = useContext(mainCtx);
  if (!ctx) {
    throw new Error("Main Ctx is Not wrapped up");
  }
  return ctx;
};
