import { createContext, useContext, useState } from "react";
import { authCtxType } from "../types/types";
import { User } from "firebase/auth";

const authCtx = createContext<null | authCtxType>(null);
export const AuthCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [alertConfig, setAlertConfig] = useState({
    alert: false,
    error: "",
  });
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const value = {
    alertConfig,
    setAlertConfig,
    loading,
    setLoading,
    user,
    setUser,
  };
  return (
    <authCtx.Provider value={value}>
      {children}
    </authCtx.Provider>
  );
};

export const useAuthCtx = () => {
  const ctx = useContext(authCtx);
  if (!ctx) {
    throw new Error("it's not wrapped up");
  }
  return ctx;
};
