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
import {
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { sendMsg } from "../../api/sendMsg";
import { useAuthCtx } from "../../context/AuthContext";
import { getMsg } from "../../api/getMsg";
import Message from "../../components/Message";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, {
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { deleteMsg } from "../../api/deleteMsg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { editMsg } from "../../api/editMsg";
import * as Haptic from "expo-haptics";
import { useAudioPlayer } from "expo-audio";
import { getSavedMessage } from "../../storage/getMessage";
import {
  navigationMainProp,
  routeMainStackParamList,
} from "../../types/navigation";
import { useMainCtx } from "../../context/MainContext";
import { messagesType } from "../../types/types";
const ChatScreen = ({
  route,
}: {
  route: RouteProp<routeMainStackParamList, "ChatScreen">;
}) => {
  const { uri, code, name } = route.params;
  const { user } = useAuthCtx();
  const { goBack } = useMainCtx();
  const navigation = useNavigation<navigationMainProp>();
  const scrollRef =
    useRef<Animated.FlatList<string[]>>(null);
  const selectCount = useSharedValue(0);
  const msgContainer = useSharedValue(0);

  const [selectAll, isAllSelected] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<messagesType[]>(
    []
  );
  const [deleteBtn, showDeleteBtn] = useState(false);
  const [reset, isReset] = useState(false);
  const [selectedMsgs, isMsgsSelected] = useState<
    messagesType[]
  >([]);

  const inputRef = useRef<TextInput>(null);
  const sound = useAudioPlayer(
    require("../../../assets/Fart.mp3")
  );
  const [edit, isEdit] = useState(false);
  const handleScroll = () => {
    scrollRef.current?.scrollToIndex({
      index: messages.length - 1,
      animated: true,
    });
  };
  const copyToCliboard = (text: string) => {
    Clipboard.setStringAsync(text);
    ToastAndroid.show("Copied", ToastAndroid.SHORT);
  };
  const deleteMsgHandler = () => {
    if (selectedMsgs.length !== 0) {
      showDeleteBtn(false);
      selectCount.value = 0;
      deleteMsg(selectedMsgs, code);
      isMsgsSelected([]);
      isReset(true);
      isAllSelected(false);
    }
  };
  const showKeyboard = () => {
    inputRef.current?.focus();
  };
  const editBtnHandler = () => {
    setMsg(selectedMsgs[0].msg);
    isEdit(true);
    showKeyboard();
  };
  const selectMessageHandler = () => {
    isAllSelected((state) => {
      if (state) {
        selectCount.value = 0;
        showDeleteBtn(false);
        isMsgsSelected([]);
      } else {
        selectCount.value = messages.length;
        isMsgsSelected(messages);
      }
      return !state;
    });
  };
  const validateMsg = async () => {
    if (messages.length !== 0) {
      handleScroll();
    }
    if (
      msg.trim().length !== 0 &&
      user?.uid &&
      user.displayName
    ) {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy);
      sound.seekTo(0);
      sound.play();
      if (edit) {
        isReset(true);
        isEdit(false);
        selectCount.value = 0;
        showDeleteBtn(false);
        editMsg(msg, selectedMsgs, code);
        isMsgsSelected([]);
      } else {
        sendMsg(
          msg,
          code,
          user.uid,
          user.displayName,
          user.photoURL
        );
        msgContainer.value = withSpring(1);
      }
      setMsg("");
    }
  };
  useEffect(() => {
    getSavedMessage(setMessages);
    getMsg(code, setMessages);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
        behavior={
          Platform.OS === "android" ? "height" : "padding"
        }
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Ionicons
            onPress={goBack}
            name="arrow-back"
            size={24}
            color={colors.secondary}
          />
          <View style={[styles.profileContainer]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MemberScreen", {
                  code,
                  uri,
                  name,
                })
              }
            >
              <Image
                source={{ uri: uri }}
                style={styles.profile}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>{name}</Text>
              <TouchableOpacity
                onPress={() => copyToCliboard(code)}
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
                  width:
                    selectCount.value == 1 ? "40%" : "25%",
                  padding: 12,
                }}
              >
                {selectCount.value == 1 && (
                  <>
                    <Ionicons
                      onPress={() =>
                        copyToCliboard(selectedMsgs[0].msg)
                      }
                      name="copy-sharp"
                      size={24}
                      color={colors.secondary}
                    />
                    <MaterialIcons
                      onPress={editBtnHandler}
                      name="edit"
                      size={24}
                      color={colors.secondary}
                    />
                  </>
                )}
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
                  onPress={deleteMsgHandler}
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
          ref={scrollRef}
          data={messages}
          renderItem={({ item }) => (
            <Message
              item={item}
              selectCount={selectCount}
              selectAll={selectAll}
              showDeleteBtn={showDeleteBtn}
              isMsgsSelected={isMsgsSelected}
              reset={reset}
              isReset={isReset}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={16}
        />
        <Animated.View style={[styles.messageContainer]}>
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
              ref={inputRef}
            />
            <TouchableOpacity
              style={styles.msgSendContainer}
              onPress={validateMsg}
            >
              {edit ? (
                <AntDesign
                  name="check"
                  size={24}
                  color="black"
                />
              ) : (
                <Ionicons
                  name="send-outline"
                  size={24}
                  color={colors.secondary}
                />
              )}
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
    padding: 12,
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
  msgSendContainer: {
    backgroundColor: colors.primary,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 40,
  },
});
