import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const sendMsg = async (
  msg: string,
  code: string,
  uid: string,
  name: string,
  profileUri: string | null
) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};
