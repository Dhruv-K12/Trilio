import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { messagesType } from "../types/types";

export const deleteMsg = async (
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
    await Promise.all(
      msgs.map(async (msg) => {
        const q = query(
          docRef,
          where("msg", "==", msg.msg),
          where("createdAt", "==", msg.createdAt)
        );
        const qSnap = await getDocs(q);
        return Promise.all(
          qSnap.docs.map(
            async (each) =>
              await deleteDoc(
                doc(
                  db,
                  "servers",
                  code,
                  "messages",
                  each.id
                )
              )
          )
        );
      })
    );
  } catch (e) {
    console.log(e);
  }
};
