import { User } from "firebase/auth";
import { createServer } from "../api/createServer";
import {
  alertConfigState,
  booleanState,
} from "../types/types";

export const validateServer = (
  serverName: string,
  serverDes: string,
  option: "Public" | "Private",
  user: User,
  image: string | null,
  setLoading: booleanState,
  setAlertConfig: alertConfigState,
  isServerCreated: booleanState,
  password: string
) => {
  if (image == null) {
    setAlertConfig({
      alert: true,
      error: "Please Upload Your Image",
    });
  } else if (serverName.trim().length === 0) {
    setAlertConfig({
      alert: true,
      error: "Please Enter Your Server Name",
    });
  } else if (serverDes.trim().length === 0) {
    setAlertConfig({
      alert: true,
      error: "Please Enter Your Server Des",
    });
  } else if (
    option === "Private" &&
    password.trim().length === 0
  ) {
    setAlertConfig({
      alert: true,
      error: "Please Enter Your Password",
    });
  } else {
    createServer(
      serverName,
      serverDes,
      option,
      user,
      image,
      setLoading,
      isServerCreated,
      password
    );
  }
};
