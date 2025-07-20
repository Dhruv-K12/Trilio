import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImage } from "./uploadImage";
import { booleanState } from "../types/types";
import { joinMember } from "./joinMember";
import { User } from "firebase/auth";

const genrateServerCode = () => {
  let code = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let serverCode = "";
  for (let i = 1; i <= 6; i++) {
    serverCode +=
      code[Math.floor(Math.random() * code.length)];
  }
  return serverCode;
};

export const createServer = async (
  serverName: string,
  des: string,
  type: "Public" | "Private",
  user: User,
  image: string,
  setLoading: booleanState,
  isServerCreated: booleanState,
  password: string
) => {
  const { uid } = user;
  const code = genrateServerCode();
  const docRef = doc(db, "servers", code);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      createServer(
        serverName,
        des,
        type,
        user,
        image,
        setLoading,
        isServerCreated,
        password
      );
    } else {
      setLoading(true);
      const url: string = await uploadImage(image);
      const serverDetails = {
        createdAt: serverTimestamp(),
        uid,
        des,
        name: serverName,
        url,
        type,
        code,
        password,
      };

      await setDoc(docRef, {
        ...serverDetails,
      });
    }
    await setDoc(doc(db, uid, code), {
      createdAt: serverTimestamp(),
      uid,
      code,
    });
    joinMember(code, user);
    isServerCreated(true);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
