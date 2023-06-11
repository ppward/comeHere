import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
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
        {/* 카테고리, 위치, 인원수, 경쟁, 정기 확인 뷰, styles1 */}
        <View>
          {/* 카테고리, 위치, 인원수 뷰 */}
          <View style={{ ...styles1.container, marginTop: 20 }}>
            {/* 카테고리 */}
            <View style={styles1.infoView}>
              <Image style={styles.icon} source={Icons.BASEBALL} />
            </View>
            {/* 위치 */}
            <View style={styles1.infoView}>
              <Image style={styles1.locationIcon} source={Icons.LOCATION} />
              <Text style={styles1.locationText}>{city}</Text>
            </View>
            {/* 인원 수 */}
            <View style={styles1.infoView}>
              <Text style={styles1.peopleText}>{headCount}</Text>
            </View>
          </View>
          {/* 경쟁, 정기 여부 확인 뷰 */}
          <View style={styles1.container}>
            {/* 경쟁 가능 여부 */}
            <View style={styles1.infoActiveView}>
              <Text style={styles1.infoActiveText}>경쟁</Text>
            </View>
            {/* 정기 모임 여부 */}
            <View style={styles1.infoActiveView}>
              <Text style={styles1.infoActiveText}>정기</Text>
            </View>
          </View>
        </View>

        {/* 2번째 뷰, styles2 */}
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
        {/* 3번째 뷰, styles3 */}
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
        {/* 4번째 뷰, styles4 */}
        <View style={styles4.partyConfig}>
          {/* 대화방 */}
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate("DescribeParty");
            }}
            style={{ ...styles4.chatBtn }}
          >
            <View style={styles4.chatView}>
              <View>
                <Image
                  style={{ ...styles.icon, tintColor: "white" }}
                  source={Icons.CHAT}
                />
              </View>
              <View>
                <Text style={styles4.fontStyle}>대화방 입장</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* 삭제, 수정, 탈퇴 */}
          <View style={styles4.partyRelated}>
            {/* 파티 탈퇴 */}
            <View style={styles4.partyExit}>
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate("DescribeParty");
                }}
                style={{ ...styles4.partyBtn, backgroundColor: "#F2F2F2" }}
              >
                <Text style={{ ...styles4.fontStyle, color: "#A4A4A4" }}>
                  파티 탈퇴
                </Text>
              </TouchableOpacity>
            </View>
            {/* 삭제, 수정 / 파티장만 가능 */}
            <View
              style={{
                ...styles4.partyThing,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate("DescribeParty");
                }}
                style={{ ...styles4.partyBtn, backgroundColor: "#424242" }}
              >
                <Text style={{ ...styles4.fontStyle, color: "#FE2E2E" }}>
                  파티 삭제
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate("DescribeParty");
                }}
                style={{ ...styles4.partyBtn, backgroundColor: "#424242" }}
              >
                <Text style={{ ...styles4.fontStyle, color: "#FE2E2E" }}>
                  파티 수정
                </Text>
              </TouchableOpacity>
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
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  infoView: {
    flex: 1,
    margin: 5,
    height: 50,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#5858FA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#F8EFFB",
  },
  locationIcon: {
    width: 25,
    height: 25,
    margin: 5,
    tintColor: "#8000FF",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "500",
    margin: 5,
  },
  peopleText: {
    fontSize: 17,
  },
  compText: {
    fontSize: 17,
  },
  termText: {
    fontSize: 17,
  },
  infoActiveView: {
    flex: 1,
    margin: 5,
    height: 50,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#5858FA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#5858FA",
  },
  infoActiveText: {
    color: "white",
    fontSize: 17,
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
    // flexDirection: "row",
    width: 120,
    height: 100,
    alignItems: "center",
    justifyContent: "space-around",
  },
  partyBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8000FF",
    borderRadius: 20,
    width: 100,
    height: 40,
    // margin: 10,
  },
  chatView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
  },
  chatBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8000FF",
    borderRadius: 20,
    width: 150,
    height: 50,
    marginVertical: 20,
    margin: 10,
  },
  fontStyle: {
    fontWeight: "500",
    color: "white",
    fontSize: 16,
  },
  partyRelated: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  partyExit: {
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});

export default CurrentParty;
