import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Icons from "assets";
import React, { useState } from "react";
const AppPolicy = () => {
  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView style={{ marginTop: 15 }}>
        {/* SNS 서비스 이용 약관 뷰 */}
        <View style={styles.PolicyView}>
          <Text style={styles.PolicyViewText}>
            여기 모여라 SNS 서비스 이용 약관
          </Text>
          <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
        </View>

        {/* 개인정보 처리 방침 뷰 */}
        <View style={styles.PolicyView}>
          <Text style={styles.PolicyViewText}>개인정보 처리 방침</Text>
          <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
        </View>

        {/* 위치기반 서비스 이용 약관 뷰 */}
        <View style={styles.PolicyView}>
          <Text style={styles.PolicyViewText}>개인정보 처리 방침</Text>
          <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
        </View>

        {/* 마케팅 정보 이용 약관 뷰 */}
        <View style={styles.PolicyView}>
          <Text style={styles.PolicyViewText}>마케팅 정보 이용 약관</Text>
          <Image source={Icons.BRACE} style={styles.checkIcon}></Image>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  PolicyViewText: {
    margin: 10,
    marginBottom: 20,
    borderColor: "grey",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  PolicyView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderColor: "lightgrey",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
});

export default AppPolicy;
