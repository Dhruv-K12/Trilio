import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getServer = async (
  uid: string,
  setServers: React.Dispatch<React.SetStateAction<any>>
) => {
  const unsub = onSnapshot(
    collection(db, uid),
    (querySnaphot) => {
      const codes = querySnaphot.docs.map(
        (each) => each.id
      );
      Promise.all(
        codes.map(async (code) => {
          const docSnap = await getDoc(
            doc(db, "servers", code)
          );
          return docSnap.data();
        })
      ).then((servers) => setServers(servers));
    }
  );
  return unsub;
};
