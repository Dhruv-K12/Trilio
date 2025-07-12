import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getMsg = (
  code: string,
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
) => {
  onSnapshot(
    query(
      collection(db, "servers", code, "messages"),
      orderBy("createdAt", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((each) =>
        each.data()
      );
      setMessages(messages);
    }
  );
};
