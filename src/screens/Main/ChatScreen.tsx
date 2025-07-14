import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { naviagationProp } from "../../types/navigation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { sendMsg } from "../../api/sendMsg";
import { useAuthCtx } from "../../context/AuthContext";
import { getMsg } from "../../api/getMsg";
import Message from "../../components/Message";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useEvent,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const ChatScreen = ({ route }: any) => {
  const { uri, code, name } = route.params;
  const { user, setAlertConfig } = useAuthCtx();
  const [replyMsg, setReplyMsg] = useState("");
  const navigation = useNavigation<naviagationProp>();
  const selectCount = useSharedValue(0);
  const [selectAll, isAllSelected] = useState(false);
  const msgContainer = useSharedValue(0);
  const goBack = () => {
    navigation.goBack();
  };
  const scaleUp = useSharedValue(0);
  const scrollRef =
    useRef<Animated.FlatList<string[]>>(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [deleteBtn, showDeleteBtn] = useState(false);
  const handleScroll = () => {
    scrollRef.current?.scrollToIndex({
      index: messages.length - 1,
      animated: true,
    });
  };

  const copyToCliboard = () => {
    Clipboard.setStringAsync(code);
    ToastAndroid.show("Copied", ToastAndroid.SHORT);
  };
  const selectMessageHandler = () => {
    isAllSelected((state) => {
      if (state) {
        selectCount.value = 0;
        showDeleteBtn(false);
      } else {
        selectCount.value = messages.length;
      }
      return !state;
    });
  };
  const validateMsg = () => {
    handleScroll();
    if (
      msg.trim().length !== 0 &&
      user?.uid &&
      user.displayName
    ) {
      sendMsg(
        msg,
        code,
        user.uid,
        user.displayName,
        user.photoURL
      );
      msgContainer.value = withSpring(1);

      setMsg("");
    }
  };
  useEffect(() => {
    getMsg(code, setMessages);
  }, []);

  const messageContainer = useAnimatedStyle(() => {
    return {
      height: interpolate(scaleUp.value, [0, 1], [60, 140]),
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" ? "padding" : "height"
        }
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 100 : 0
        }
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Ionicons
            onPress={goBack}
            name="arrow-back"
            size={24}
            color={colors.secondary}
          />
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: uri }}
              style={styles.profile}
            />
            <View>
              <Text style={styles.title}>{name}</Text>
              <TouchableOpacity
                onPress={copyToCliboard}
                style={styles.copyToClipboardBtn}
              >
                <Ionicons
                  name="copy"
                  size={18}
                  color={colors.rarely}
                />
                <Text style={styles.codeTxt}>
                  code: {code}
                </Text>
              </TouchableOpacity>
            </View>
            {deleteBtn ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "20%",
                }}
              >
                <FontAwesome5
                  name="check-double"
                  size={24}
                  color={
                    selectAll
                      ? colors.primary
                      : colors.secondary
                  }
                  onPress={selectMessageHandler}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={colors.secondary}
                />
              </View>
            ) : (
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color={colors.secondary}
              />
            )}
          </View>
        </View>
        <Animated.FlatList
          style={{ flex: 1 }}
          ref={scrollRef}
          data={messages}
          renderItem={({ item }) => (
            <Message
              item={item}
              setReplyMsg={setReplyMsg}
              selectCount={selectCount}
              selectAll={selectAll}
              showDeleteBtn={showDeleteBtn}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={16}
        />
        <Animated.View
          style={[
            styles.messageContainer,
            messageContainer,
          ]}
        >
          <Animated.View style={[styles.inputContainer]}>
            <FontAwesome6
              name="add"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.input}
              value={msg}
              onChangeText={(txt) => setMsg(txt)}
              multiline
            />
            <TouchableOpacity onPress={validateMsg}>
              <Ionicons
                name="send-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 8,
    borderColor: colors.secondary,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 12,
  },
  title: {
    color: colors.secondary,
    fontFamily: fonts.InriaBold,
    fontSize: ms(16),
  },
  profileContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  messageContainer: {
    backgroundColor: colors.rarely,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  inputContainer: {
    width: "90%",
    backgroundColor: colors.secondary,
    height: 50,
    alignSelf: "center",
    borderRadius: 12,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 50,
  },
  codeTxt: {
    fontFamily: fonts.InterThin,
    color: colors.secondary,
  },
  copyToClipboardBtn: {
    flexDirection: "row",
  },
});
