import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const sendMsg = async (
  msg: string,
  code: string,
  uid: string,
  name: string,
  profileUri: string | null
) => {
  await addDoc(
    collection(db, "servers", code, "messages"),
    {
      senderId: uid,
      msg,
      name,
      profileUri,
      createdAt: serverTimestamp(),
    }
  );
};
