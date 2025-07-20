import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  alertConfigState,
  booleanState,
} from "../types/types";
import { joinMember } from "./joinMember";
import { User } from "firebase/auth";

export const joinServer = async (
  code: string,
  user: User,
  isServerPrivate: booleanState,
  password: string,
  setAlertConfig: alertConfigState,
  goBack: () => void
) => {
  const { uid } = user;
  const docRef = doc(db, "servers", code);
  const userRef = doc(db, uid, code);
  try {
    const userSnap = await getDoc(userRef);
    const docSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      setAlertConfig({
        alert: true,
        error: "You have already joined this server",
      });
      return;
    }
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.type === "Private") {
        isServerPrivate(true);
        if (password.trim().length === 0) {
          setAlertConfig({
            alert: true,
            error:
              "This server is private. You have to enter a password",
          });
        } else if (password !== data.password) {
          setAlertConfig({
            alert: true,
            error: "Your Password is incorrect",
          });
        } else {
          await setDoc(doc(db, uid, code), {
            createdAt: serverTimestamp(),
            uid,
            code,
          });
          joinMember(code, user);
          goBack();
        }
      } else {
        await setDoc(doc(db, uid, code), {
          createdAt: serverTimestamp(),
          uid,
          code,
        });
        joinMember(code, user);
        goBack();
      }
    } else {
      setAlertConfig({
        alert: true,
        error: "Your server code is invalid",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
