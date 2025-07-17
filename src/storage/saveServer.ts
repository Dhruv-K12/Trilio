import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveServer = async (servers: any[]) => {
  const data = await AsyncStorage.getItem("servers");
  if (data) {
    await AsyncStorage.removeItem("servers");
  }
  await AsyncStorage.setItem(
    "servers",
    JSON.stringify(servers)
  );
};
