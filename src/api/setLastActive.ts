import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const setLastActive = async (uid: string) => {
  const date = new Date();
  try {
    await updateDoc(doc(db, "profile", uid), {
      lastSeen: date,
    });
  } catch (e) {
    console.log(e);
  }
};
