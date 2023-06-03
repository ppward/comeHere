import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Button, Text, Image, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LocationMaps from "./LocationMaps";
import Ranking from "./Ranking";
import CurrentParty from "./CurrentParty";
import User from "./User";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Location">
      <Tab.Screen
        name="Party"
        component={CurrentParty}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/network.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Location"
        component={LocationMaps}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/map.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/ranking.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../assets/user.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
