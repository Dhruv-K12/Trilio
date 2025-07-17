import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getMembers = async (
  code: string,
  setMembers: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const docRef = collection(db, "servers", code, "members");
  const docSnap = await getDocs(docRef);
  const members = docSnap.docs.map(async (each) => {
    const profile = await getDoc(
      doc(db, "profile", each.id)
    );
    return profile.data();
  });
  Promise.all(members).then((member) => setMembers(member));
};
