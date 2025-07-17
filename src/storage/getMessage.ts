import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSavedMessage = async (
  setMessages: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const messages = await AsyncStorage.getItem("messages");
  if (messages) {
    setMessages(JSON.parse(messages));
  }
};
