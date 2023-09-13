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

const city = "탕정면";
const curCount = "1";
const maxCount = "4";
const headCount = `${curCount}/${maxCount}`;
const Separator = () => <View style={styles.separator} />;

const Description = () => {
  const stringbad = "4명이서 2대2로 배드민턴 치실 분 구합니다";
  const [partyDesc, setPartyDesc] = useState(stringbad, []);
  handleDesc = () => {
    setPartyDesc("4명이서 2대2로 배드민턴 치실 분 구합니다");
  };
  return partyDesc;
};

const CurrentParty = ({ isCompetition, isRegularTerm }) => {
  return (
    <View>
      <ScrollView style={styles.container}>
        {/* 카테고리, 위치, 인원수, 경쟁, 정기 확인 뷰, styles1 */}
        <View style={styles1.container}>
          {/* 카테고리, 위치, 인원수 뷰 */}
          <View style={styles1.settingView}>
            {/* 카테고리 */}
            <View style={styles1.infoView}>
              <Image style={styles.icon} source={Icons.SPORTS} />
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
          <View style={styles1.settingView}>
            {/* 경쟁 가능 여부 */}
            <View
              style={isCompetition ? styles1.infoView : styles1.infoActiveView}
            >
              <Text
                style={
                  isCompetition ? styles1.infoText : styles1.infoActiveText
                }
              >
                경쟁
              </Text>
            </View>
            {/* 정기 모임 여부 */}
            <View
              style={isRegularTerm ? styles1.infoActiveView : styles1.infoView}
            >
              <Text
                style={
                  isRegularTerm ? styles1.infoActiveText : styles1.infoText
                }
              >
                정기
              </Text>
            </View>
          </View>
        </View>
        <Separator />

        {/* 카테고리 아이콘, 제목, 파티 설명 뷰, styles2 */}
        <View style={styles2.container}>
          {/* 파티 아이콘/제목 뷰 */}
          <View style={styles2.titleView}>
            <View style={styles2.iconView}>
              <Image style={styles.icon} source={Icons.SPORTS} />
            </View>
            <Text style={styles2.titleText}>배드민턴 치실 분</Text>
          </View>
          {/* 파티 설명 뷰 */}
          <View style={styles2.descriptionView}>
            <Text>
              <Description />
            </Text>
          </View>
        </View>
        <Separator />

        {/* 장소, 일정 뷰, styles3 */}
        <View style={styles3.container}>
          {/* 날짜, 요일 */}
          <View style={styles3.calenderView}>
            <Text style={styles3.calenderText}>수요일</Text>
            <Text style={{ ...styles3.calenderText, fontSize: 30 }}>14</Text>
          </View>
          {/* 상세 일정 및 장소 */}
          <View>
            <View style={styles3.infoView}>
              <Image style={styles3.icon} source={Icons.CALENDAR} />
              <Text style={styles3.infoText}>6월 14일 (수) 20:00</Text>
            </View>
            <View style={styles3.infoView}>
              <Image style={styles3.icon} source={Icons.LOCATION} />
              <Text style={styles3.infoText}>선문대학교 공학관</Text>
            </View>
          </View>
        </View>
        <Separator />

        {/* 대화방, 탈퇴, 삭제/수정 뷰, styles4 */}
        <View style={styles4.container}>
          {/* 대화방 입장 */}
          <TouchableOpacity onPress={{}} style={styles4.chatBtn}>
            <View style={styles4.chatView}>
              <View>
                <Image
                  style={{ ...styles.icon, tintColor: "#E6E6E6" }}
                  source={Icons.CHAT}
                />
              </View>
              <View>
                <Text style={styles4.fontStyle}>대화방 입장</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* 삭제, 수정, 탈퇴 */}
          <View style={styles4.partyView}>
            {/* 파티 탈퇴 */}
            <View style={styles4.partyExit}>
              <TouchableOpacity
                onPress={() => {}}
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
    backgroundColor: "#fffafa",
    padding: 10,
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
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 0.4,
    borderRadius: 5,
  },
  settingView: {
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
  infoText: {
    fontSize: 17,
    fontWeight: "600",
  },
  infoActiveText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
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
    fontWeight: "600",
  },
});

const styles2 = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 5,
    flex: 3,
  },
  iconView: {
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 5,
  },
  titleView: {
    padding: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    padding: 10,
    fontSize: 20,
    marginLeft: 10,
    width: "87%",
    borderWidth: 0.2,
    borderRadius: 5,
  },
  descriptionView: {
    flex: 2,
    height: 200,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",
  },
  descriptionText: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
});

const styles3 = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  calenderView: {
    borderWidth: 0.2,
    borderRadius: 15,
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  calenderText: {
    fontWeight: "800",
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  infoView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  infoText: {
    width: "75%",
    fontSize: 16,
    fontWeight: "600",
  },
});

const styles4 = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderWidth: 0.4,
    borderRadius: 5,
    marginBottom: 20,
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
    backgroundColor: "#5858FA",
    borderRadius: 20,
    width: 150,
    height: 50,
    marginBottom: 15,
  },
  partyView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  partyThing: {
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
  },

  fontStyle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#E6E6E6",
  },

  partyExit: {
    alignItems: "flex-end",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});

export default CurrentParty;
