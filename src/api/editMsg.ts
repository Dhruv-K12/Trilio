import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { messagesType } from "../types/types";

export const editMsg = async (
  msg: string,
  msgs: messagesType[],
  code: string
) => {
  const docRef = collection(
    db,
    "servers",
    code,
    "messages"
  );
  try {
    const q = query(
      docRef,
      where("msg", "==", msgs[0].msg),
      where("createdAt", "==", msgs[0].createdAt)
    );
    const qSnap = await getDocs(q);
    const [id] = qSnap.docs.map((each) => each.id);
    await updateDoc(
      doc(db, "servers", code, "messages", id),
      {
        msg,
      }
    );
  } catch (e) {
    console.log(e);
  }
};
