import {
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { saveServer } from "../storage/saveServer";
import { servers, serversState } from "../types/types";

export const getServer = async (
  uid: string,
  setServers: serversState
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
            if (docSnap.exists()) {
              return docSnap.data() as servers;
            }
            return null;
          })
        ).then((servers) => {
          const validServers = servers.filter(
            (server): server is servers => server !== null
          );

          saveServer(validServers);
          setServers(validServers);
        });
      }
    );
    return unsub;
  } catch (e) {
    console.log(e);
  }
};
