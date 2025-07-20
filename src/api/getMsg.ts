import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { saveMessage } from "../storage/saveMessage";
import { messageState, messagesType } from "../types/types";

export const getMsg = (
  code: string,
  setMessages: messageState
) => {
  try {
    onSnapshot(
      query(
        collection(db, "servers", code, "messages"),
        orderBy("createdAt", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map(
          (each) => each.data() as messagesType
        );
        saveMessage(messages);
        setMessages(messages);
      }
    );
  } catch (e) {
    console.log(e);
  }
};
