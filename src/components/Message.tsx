import { Image, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../context/AuthContext";
import { colors } from "../constants/colors";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
const Message = ({
  item,
  setReplyMsg,
  selectCount,
  selectAll,
  showDeleteBtn,
}: {
  item: any;
  setReplyMsg: (msg: string) => void;
  selectCount: SharedValue<number>;
  selectAll: boolean;
  showDeleteBtn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const scaleMsgContainer = useSharedValue(0);
  const showDeleteBtnHandler = () => {
    showDeleteBtn(true);
  };
  const [selectItem, isSelectItem] = useState<any[]>([]);
  console.log(selectItem);
  const hideDeleteBtnHandler = () => {
    showDeleteBtn(false);
  };
  useEffect(() => {
    if (selectAll) {
      scaleMsgContainer.value = withSpring(1);
    } else {
      scaleMsgContainer.value = withSpring(0);
    }
  }, [selectAll]);
  const { user } = useAuthCtx();
  const isSender = item.senderId === user?.uid;
  const holdTapGesture = Gesture.LongPress().onStart(() => {
    if (selectCount.value === 0) {
      scaleMsgContainer.value = withSpring(1);

      selectCount.value = 1;
      runOnJS(showDeleteBtnHandler)();
    }
  });
  const clickGesture = Gesture.Tap().onStart(() => {
    if (selectCount.value !== 0) {
      if (scaleMsgContainer.value > 0.5) {
        scaleMsgContainer.value = withSpring(0);
        selectCount.value -= 1;

        if (selectCount.value == 0) {
          runOnJS(hideDeleteBtnHandler)();
        }
      } else {
        scaleMsgContainer.value = withSpring(1);
        selectCount.value += 1;
      }
    }
  });

  const clickAndHoldGesture = Gesture.Simultaneous(
    holdTapGesture,
    clickGesture
  );
  const msgContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scaleMsgContainer.value,
            [0, 1],
            [1, 1.1]
          ),
        },
      ],
    };
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      margin: 5,
      padding: 8,
      opacity: interpolate(
        scaleMsgContainer.value,
        [0, 1],
        [1, 0.8]
      ),
      backgroundColor: interpolateColor(
        scaleMsgContainer.value,
        [0, 1],
        ["transparent", colors.rarely]
      ),
    };
  });

  return (
    <Animated.View style={[containerStyle]}>
      <Animated.View
        style={[
          isSender
            ? styles.senderContainer
            : styles.receiverContainer,
          msgContainerStyle,
        ]}
      >
        <Image
          source={
            item.profileUri === null
              ? require("../../assets/Images/user-profile.png")
              : { uri: item.profileUri }
          }
          style={{ width: 40, height: 40 }}
        />
        <GestureDetector gesture={clickAndHoldGesture}>
          <Animated.View
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
          </Animated.View>
        </GestureDetector>
      </Animated.View>
      <Text
        style={
          isSender
            ? styles.senderTimeTxt
            : styles.recevierTimeTxt
        }
      ></Text>
    </Animated.View>
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
    padding: 8,
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
  },
  recevierTimeTxt: {
    alignSelf: "flex-start",
    color: colors.secondary,
  },
});
