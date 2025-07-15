import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ms } from "react-native-size-matters";

export const deleteMsg = async (
  msgs: any[],
  code: string
) => {
  const docRef = collection(
    db,
    "servers",
    code,
    "messages"
  );
  msgs.map(async (msg) => {
    const q = query(
      docRef,
      where("msg", "==", msg.msg),
      where("createdAt", "==", msg.createdAt)
    );
    const qSnap = await getDocs(q);
    qSnap.docs.map(
      async (each) =>
        await deleteDoc(
          doc(db, "servers", code, "messages", each.id)
        )
    );
  });
};
