import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
} from "react-native";
import Icons from "assets";
import React, { useState } from "react";
const Settings = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled1, setIsEnabled1] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch1 = () =>
    setIsEnabled1((previousState1) => !previousState1);
  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView style={{ marginTop: 15 }}>
        {/* 경쟁 파티 생성 알림 */}
        <View style={styles.settingView}>
          <Text style={styles.settingViewText}>경쟁 파티 생성 알림</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {/* 야간 알림 */}
        <View style={styles.settingView}>
          <Text style={styles.settingViewText}>야간 알림</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
        {/* USER ID 뷰 */}
        <View style={{ ...styles.userIdView, flexDirection: "row" }}>
          {/* user id */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.settingViewText}>USER ID</Text>
            <Text style={styles.userIdViewText}>1231231231231</Text>
          </View>
          <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
        </View>

        {/* 앱 가이드라인 뷰 */}
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("가이드라인");
            }}
          >
            <View style={styles.settingView}>
              <Text style={styles.settingViewText}>앱 가이드라인</Text>
              <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>

        {/* 약관 및 정책 뷰 */}
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("약관 및 정책");
            }}
          >
            <View style={styles.settingView}>
              <Text style={styles.settingViewText}>약관 및 정책</Text>
              <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
            </View>
          </TouchableOpacity>
        </View>

        {/* 버전 뷰 */}
        <View style={styles.settingView}>
          <Text style={styles.settingViewText}>버전</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>1.2.3</Text>
        </View>

        {/* 로그아웃 뷰 */}
        <View style={{ ...styles.settingView, paddingTop: "50%" }}>
          <Text style={styles.byebye}>로그아웃</Text>
        </View>

        {/* 회원 탈퇴 뷰 */}
        <View style={styles.settingView}>
          <Text style={styles.byebye}>회원 탈퇴</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  settingViewText: {
    margin: 10,
    marginBottom: 20,
    borderColor: "grey",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  settingView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderColor: "lightgrey",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  userIdView: {
    alignItems: "center",
    borderBottomWidth: "1px",
    borderColor: "lightgrey",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  userIdViewText: {
    marginLeft: 10,
    marginTop: -10,
    fontSize: 13,
  },
  byebye: {
    margin: 10,
    marginBottom: 20,
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
});

export default Settings;
