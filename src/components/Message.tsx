import {
  Easing,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useAuthCtx } from "../context/AuthContext";
import { colors } from "../constants/colors";
import * as Haptics from "expo-haptics";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  BounceInRight,
  FadeIn,
  FadeInRight,
  FadeInUp,
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
  selectCount,
  selectAll,
  showDeleteBtn,
  isMsgsSelected,
  reset,
  isReset,
}: {
  item: any;
  selectCount: SharedValue<number>;
  selectAll: boolean;
  reset: boolean;
  showDeleteBtn: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isMsgsSelected: React.Dispatch<
    React.SetStateAction<any[]>
  >;
  isReset: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuthCtx();
  const scaleMsgContainer = useSharedValue(0);
  const isSender = item.senderId === user?.uid;
  const deleteBtnHandler = (state: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    showDeleteBtn(state);
  };
  const msgsSelectionHandler = (
    type: "Add" | "Delete" | "Vanish"
  ) => {
    if (type === "Vanish") {
      isMsgsSelected([]);
    } else if (type === "Add") {
      isMsgsSelected((msgs) => [...msgs, item]);
    } else {
      isMsgsSelected((msgs) =>
        msgs.filter(
          (msg) =>
            msg.msg !== item.msg &&
            msg.createdAt !== item.createdAt
        )
      );
    }
  };
  const holdTapGesture = Gesture.LongPress().onStart(() => {
    if (selectCount.value === 0) {
      scaleMsgContainer.value = withSpring(1);
      selectCount.value = 1;
      runOnJS(deleteBtnHandler)(true);
      runOnJS(msgsSelectionHandler)("Add");
    }
  });
  const clickGesture = Gesture.Tap().onStart(() => {
    if (selectCount.value !== 0) {
      if (scaleMsgContainer.value > 0.5) {
        scaleMsgContainer.value = withSpring(0);
        selectCount.value -= 1;
        runOnJS(msgsSelectionHandler)("Delete");

        if (selectCount.value == 0) {
          runOnJS(deleteBtnHandler)(false);
          runOnJS(msgsSelectionHandler)("Vanish");
        }
      } else {
        scaleMsgContainer.value = withSpring(1);
        selectCount.value += 1;
        runOnJS(msgsSelectionHandler)("Add");
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
  useEffect(() => {
    scaleMsgContainer.value = withSpring(selectAll ? 1 : 0);
  }, [selectAll]);
  useEffect(() => {
    if (reset) {
      scaleMsgContainer.value = withSpring(0);
      isReset(false);
    }
  }, [reset]);
  return (
    <Animated.View
      entering={FadeInRight}
      style={[containerStyle]}
    >
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
            !item.profileUri
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
