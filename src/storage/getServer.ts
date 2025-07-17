import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSavedServer = async (
  setServers: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const servers = await AsyncStorage.getItem("servers");
  if (servers) {
    setServers(JSON.parse(servers));
  }
};
