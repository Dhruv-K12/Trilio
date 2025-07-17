import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMessage = async (messages: any[]) => {
  const saveMsg = await AsyncStorage.getItem("messages");
  if (saveMsg) {
    await AsyncStorage.removeItem("messages");
  }
  await AsyncStorage.setItem(
    "messages",
    JSON.stringify(messages)
  );
};
