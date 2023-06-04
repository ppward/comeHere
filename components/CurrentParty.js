import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Icons from "assets";
import { useState } from "react";

const city = "지역명";
const curCount = "0";
const maxCount = "30";
const headCount = `${curCount}/${maxCount}`;

const Description = () => {
  const [partyDesc, setPartyDesc] = useState("party description", []);
  return (
    <Text
      style={{
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
      }}
    >
      {partyDesc}
    </Text>
  );
};

const CurrentParty = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={{ flex: 1 }}>
        {/* 1번째 뷰, styles1 */}
        <View>
          {/* 위 3개 뷰 */}
          <View style={{ ...styles1.defaultInfo, marginTop: 20 }}>
            <Image style={styles.icon} source={Icons.BASEBALL} />
            <View style={styles.flexRowAndAlignCenter}>
              <Image style={styles.icon} source={Icons.LOCATION} />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{city}</Text>
            </View>
            <Button title={headCount} />
          </View>
          {/* 아래 3개 뷰 */}
          <View style={styles1.defaultInfo}>
            <Button title="경쟁" />
            <Button title="정기" />
            <Button title="합병" />
          </View>
        </View>
        {/* 2번째 뷰, styles2 */}
        <View>
          <View style={styles2.partyDescription}>
            {/* 파티 아이콘/제목 뷰 */}
            <View style={styles.flexDirectionRow}>
              <Image style={styles.icon} source={Icons.BASEBALL} />
              <Button title="파티제목" onPress={() => {}} />
            </View>
            {/* 파티 설명 뷰, 바깥 뷰는 border 목적 */}
            <View>
              <View style={{ paddingBottom: 150 }}>
                <Description />
              </View>
            </View>
          </View>
        </View>
        {/* 3번째 뷰, styles3 */}
        <View>
          <View style={styles3.partyInfo}>
            {/* 파티 장소 및 설명 뷰 */}
            <View>
              <View style={styles.flexRowAndAlignCenter}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={Icons.ASTERISK}
                />
                <Button title="파티장소:" />
              </View>
              <View style={styles.flexRowAndAlignCenter}>
                <Image style={styles.icon} source={Icons.LOCATION} />
                <Button title="설명" />
              </View>
            </View>
            {/* 파티 일정 및 설명 뷰 */}
            <View>
              <View style={styles.flexRowAndAlignCenter}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={Icons.ASTERISK}
                />
                <Button title="파티일정:" />
              </View>
              <View style={styles.flexRowAndAlignCenter}>
                <Image style={styles.icon} source={Icons.CALENDAR} />
                <Button title="설명" />
              </View>
            </View>
          </View>
        </View>
        {/* 4번째 뷰, styles3 */}
        <View>
          <View style={styles4.partyConfig}>
            <View style={styles.flexRowAndAlignCenter}>
              <Image style={styles.icon} source={Icons.CHAT} />
              <Button title="대화방 입장" />
            </View>
            <View style={{ ...styles4.partyThing, paddingTop: 20 }}>
              <Button title="파티 삭제" />
              <Button title="수정하기" />
            </View>
            <View style={{ ...styles4.partyThing, paddingBottom: 20 }}>
              <Button title="파티 탈퇴" />
              <Button title="합병하기" />
            </View>
            <View style={styles.flexRowAndAlignCenter}>
              <Image style={{ width: 50, height: 50 }} source={Icons.START} />
              <Button title="파티 시작하기" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffafa",
    fontColor: "black",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  flexRowAndAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

const styles1 = StyleSheet.create({
  defaultInfo: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    flex: 1,
    justifyContent: "space-around",
  },
});

const styles2 = StyleSheet.create({
  partyDescription: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    alignItems: "flex-start",
  },
});

const styles3 = StyleSheet.create({
  partyInfo: {
    backgroundColor: "white",
    marginLeft: 15,
    alignItems: "flex-start",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
  },
});

const styles4 = StyleSheet.create({
  partyConfig: {
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  partyThing: {
    flexDirection: "row",
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: "center",
  },
});

export default CurrentParty;
