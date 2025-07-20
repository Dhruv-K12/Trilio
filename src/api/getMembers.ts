import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { memberType } from "../types/types";

export const getMembers = async (
  code: string,
  setMembers: React.Dispatch<
    React.SetStateAction<memberType[]>
  >
) => {
  const docRef = collection(db, "servers", code, "members");
  try {
    const docSnap = await getDocs(docRef);
    const members = await Promise.all(
      docSnap.docs.map(async (each) => {
        const profile = await getDoc(
          doc(db, "profile", each.id)
        );
        return profile.data() as memberType;
      })
    );
    setMembers(members);
  } catch (e) {
    console.log(e);
  }
};
