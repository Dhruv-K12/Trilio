import { createContext, useContext, useState } from "react";
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
  const [servers, setServers] = useState<string[]>([]);
  const value = {
    TouchableAnimated,
    servers,
    setServers,
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
