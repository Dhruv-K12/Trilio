import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import {
  alertConfigState,
  booleanState,
} from "../types/types";
import { doc, setDoc } from "firebase/firestore";
const signUpHandler = async (
  email: string,
  password: string,
  setAlertConfig: alertConfigState,
  setLoading: booleanState,
  name: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const formattedName =
      name.charAt(0).toUpperCase() + name.slice(1);
    await updateProfile(response.user, {
      displayName: formattedName,
    });
    await setDoc(doc(db, "profile", response.user.uid), {
      displayName: formattedName,
      lastSeen: null,
    });
    setLoading(false);
  } catch (e: any) {
    if (e.code === "auth/email-already-in-use") {
      setAlertConfig({
        alert: true,
        error: "This email is already in use",
      });
    }
    setLoading(false);
  }
};

const loginHandler = async (
  email: string,
  password: string,
  setAlertConfig: alertConfigState,
  setLoading: booleanState
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  } catch (e: any) {
    if (e.code === "auth/invalid-credential") {
      setAlertConfig({
        alert: true,
        error: "Your email or password is incorrect",
      });
    }
    setLoading(false);
  }
};

export { signUpHandler, loginHandler };
