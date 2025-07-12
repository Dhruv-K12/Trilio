import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImage } from "./uploadImage";

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
  uid: string,
  name: string,
  image: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isServerCreated: React.Dispatch<
    React.SetStateAction<boolean>
  >,
  password: string
) => {
  const code = genrateServerCode();
  const docRef = doc(db, "servers", code);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    createServer(
      serverName,
      des,
      type,
      uid,
      name,
      image,
      setLoading,
      isServerCreated,
      password
    );
  } else {
    setLoading(true);
    const url: string = await uploadImage(image);
    console.log(password);
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

  setLoading(false);
  isServerCreated(true);
};
