import { loginHandler, signUpHandler } from "../api/auth";
import {
  alertConfigState,
  booleanState,
} from "../types/types";

export const validateAuth = (
  email: string,
  password: string,
  setAlertConfig: alertConfigState,
  setLoading: booleanState,
  name?: string
) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email);
  if (isEmailValid && password.trim().length >= 8) {
    setLoading(true);
    if (name === undefined) {
      loginHandler(
        email,
        password,
        setAlertConfig,
        setLoading
      );
    } else {
      signUpHandler(
        email,
        password,
        setAlertConfig,
        setLoading,
        name
      );
    }
  } else if (!isEmailValid) {
    setAlertConfig({
      alert: true,
      error: "Your email is not valid!",
    });
  } else {
    setAlertConfig({
      alert: true,
      error:
        "Your Password length should include atleast 8 characters",
    });
  }
};
