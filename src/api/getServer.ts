import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveServer } from "../storage/saveServer";

export const getServer = async (
  uid: string,
  setServers: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
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
        ).then((servers) => {
          saveServer(servers);
          setServers(servers);
        });
      }
    );
    return unsub;
  } catch (e) {
    console.log(e);
  }
};
