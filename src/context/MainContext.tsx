import { createContext, useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { mainCtxType, servers } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { navigationMainProp } from "../types/navigation";

const mainCtx = createContext<null | mainCtxType>(null);

export const MainCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const TouchableAnimated =
    Animated.createAnimatedComponent(TouchableOpacity);
  const [servers, setServers] = useState<servers[]>([]);
  const navigation = useNavigation<navigationMainProp>();
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const value = {
    TouchableAnimated,
    servers,
    setServers,
    goBack,
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
