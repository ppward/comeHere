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
        {/* 가이드라인 */}
        <View style={styles.PolicyView}>
          <Text style={styles.PolicyViewText}>가이드라인</Text>
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
