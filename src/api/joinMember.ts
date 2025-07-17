import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { User } from "firebase/auth";

export const joinMember = async (
  code: string,
  user: User
) => {
  const { uid } = user;
  await setDoc(
    doc(db, "servers", code, "members", uid),
    {}
  );
};
