import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const editMsg = async (
  msg: string,
  msgs: any[],
  code: string
) => {
  const docRef = collection(
    db,
    "servers",
    code,
    "messages"
  );

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
};
