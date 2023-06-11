import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image } from "react-native";
import LocationMaps from "./LocationMaps";
import Ranking from "./Ranking";
import CurrentParty from "./CurrentParty";
import User from "./User";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator initialRouteName="지도">
      <Tab.Screen
        name="현재 파티"
        component={CurrentParty}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? "#8000FF" : "black",
                }}
                source={require("../assets/network.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="지도"
        component={LocationMaps}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? "#8000FF" : "gray",
                }}
                source={require("../assets/map.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="순위"
        component={Ranking}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? "#8000FF" : "black",
                }}
                source={require("../assets/ranking.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="프로필"
        component={User}
        options={{
          tabBarActiveTintColor: "purple",
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? "#8000FF" : "gray",
                }}
                source={require("../assets/user.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 24,
    height: 24,
  },
});

export default MainScreen;
