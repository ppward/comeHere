import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icons from "assets";
import React, { useState } from "react";

const Separator = () => <View style={styles.separator} />;

const DescribeParty = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      {/* 최상단 간략한 파티 묘사, styles1 */}
      <View style={{ padding: 15, flex: 0.5 }}>
        <View>
          <View style={styles1.SummaryView}>
            <Image style={styles.icon} source={Icons.COOKING}></Image>
            <Text style={styles1.SummaryText}>문화/공연/축제</Text>
          </View>
          <View style={styles.flexRowAndAlignCenter}>
            <Text style={styles1.LocationText}>탕정면</Text>
            <Image style={styles.icon} source={Icons.LOCATION}></Image>
          </View>
        </View>
      </View>
      <Separator />
      {/* 파티 설명 뷰, styles2 */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {/* 파티 설명 */}
        <View style={{ padding: 15, flex: 3 }}>
          <View style={{ flex: 3 }}>
            <TextInput
              style={styles2.textInputStyle}
              title={"describeContents"}
              placeholder="내용을 입력하세요. (선택)"
              placeholderTextColor={"#819FF7"}
              multiline={true}
              textAlignVertical="top"
              returnKeyType="next"
            ></TextInput>
          </View>
          {/* 이미지 */}
          <View style={{ flex: 2 }}>
            <Text style={styles2.imageInputStyle}>imageinput</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Separator />
      <View style={{ padding: 15, flex: 0.7 }}>
        <Text>hi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: "row",
  },
  flexRowAndAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 20,
    height: 20,
    padding: 10,
  },
});

const styles1 = StyleSheet.create({
  SummaryView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAAC58",
    borderRadius: 20,
    width: 160,
    height: 40,
    flexDirection: "row",
    marginBottom: 15,
  },
  SummaryText: {
    fontWeight: "600",
    paddingLeft: 10,
    color: "#F2F2F2",
    fontSize: 16,
  },
  LocationText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 5,
    marginRight: 7,
  },
});
const styles2 = StyleSheet.create({
  descriptionView: {
    borderWidth: 0.5,
    borderColor: "gray",
  },
  textInputStyle: {
    height: "80%",
    padding: 10,
    paddingTop: 15,
    fontWeight: "200",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
  },
  imageInputStyle: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    paddingTop: 15,
    height: "50%",
  },
});

export default DescribeParty;
