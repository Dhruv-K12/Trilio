import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const setLastActive = async (uid: string) => {
  const date = new Date();
  await updateDoc(doc(db, "profile", uid), {
    lastSeen: date,
  });
};
