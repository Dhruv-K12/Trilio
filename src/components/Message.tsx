import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useAuthCtx } from "../context/AuthContext";
import { colors } from "../constants/colors";

const Message = ({ item }: { item: any }) => {
  const { user } = useAuthCtx();
  const isSender = item.senderId === user?.uid;
  return (
    <View>
      <View
        style={
          isSender
            ? styles.senderContainer
            : styles.receiverContainer
        }
      >
        <Image
          source={
            item.profileUri === null
              ? require("../../assets/Images/user-profile.png")
              : { uri: item.profileUri }
          }
          style={{ width: 40, height: 40 }}
        />
        <View
          style={[
            styles.msgContainer,
            isSender
              ? styles.senderMsgContainer
              : styles.receiverMsgContainer,
          ]}
        >
          <Text
            style={
              isSender
                ? styles.senderMsgTxt
                : styles.receiverMsgContainer
            }
          >
            {item.msg}
          </Text>
          <Text>~{isSender ? "me" : item.name}</Text>
        </View>
      </View>
      <Text
        style={
          isSender
            ? styles.senderTimeTxt
            : styles.recevierTimeTxt
        }
      ></Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  senderContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  receiverContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  msgContainer: {
    width: "45%",
    margin: 5,
    padding: 16,
    borderRadius: 8,
    elevation: 8,
  },
  senderMsgTxt: {
    color: colors.secondary,
  },
  receiverMsgTxt: {
    color: colors.primary,
  },
  senderMsgContainer: {
    backgroundColor: colors.primary,
  },
  receiverMsgContainer: {
    backgroundColor: colors.secondary,
  },
  senderTimeTxt: {
    alignSelf: "flex-end",
    color: colors.secondary,
    margin: 5,
  },
  recevierTimeTxt: {
    alignSelf: "flex-start",
    color: colors.secondary,
    margin: 5,
  },
});
