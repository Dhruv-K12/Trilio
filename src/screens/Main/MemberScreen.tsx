import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { routeMainStackParamList } from "../../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { getMembers } from "../../api/getMembers";
import Servers from "../../components/Servers";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fonts } from "../../constants/fonts";
import { ms } from "react-native-size-matters";
import { memberType } from "../../types/types";
const MemberScreen = ({
  route,
}: {
  route: RouteProp<routeMainStackParamList, "MemberScreen">;
}) => {
  const { code, uri, name } = route.params;
  const [currDate, setCurrDate] = useState(new Date());
  const [members, setMembers] = useState<memberType[]>([]);

  useEffect(() => {
    let interval: any;
    if (code) {
      getMembers(code, setMembers);
      interval = setInterval(() => {
        setCurrDate(new Date());
        getMembers(code, setMembers);
      }, 20000);
    }
    return () => clearInterval(interval);
  }, []);

  const showLastSeen = (last: any) => {
    const lastSeen = last.toDate();
    if (
      lastSeen.getHours() === currDate.getHours() &&
      lastSeen.getMinutes() === currDate.getMinutes()
    ) {
      return "Online";
    } else {
      return `Last Seen : ${lastSeen.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.secondary}
        />
        <View style={[styles.profileContainer]}>
          <TouchableOpacity>
            <Image
              style={styles.profile}
              source={{ uri: uri }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{name}</Text>
            <TouchableOpacity
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
        </View>
      </View>
      <Text style={styles.memberTxt}>
        {members.length} Members
      </Text>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <Servers
            uri={item.uri}
            title={item.displayName}
            des={showLastSeen(item.lastSeen)}
            code=""
            profile
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },

  codeTxt: {
    fontFamily: fonts.InterThin,
    color: colors.secondary,
  },
  copyToClipboardBtn: {
    flexDirection: "row",
  },
  memberTxt: {
    color: colors.secondary,
    fontFamily: fonts.InriaBold,
    margin: 12,
  },
});
