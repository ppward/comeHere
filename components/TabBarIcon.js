import { Image } from "react-native";
import { Icons } from "assets";

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  if (name === "Rank") {
    // iconImagePath = require("../assets/ranking.png");
    iconImagePath = Icons.RANKING;
  } else if (name === "Location") {
    // iconImagePath = require("../assets/map.png");
    iconImagePath = Icons.MAP;
  } else if (name === "Party") {
    iconImagePath = require("../assets/network.png");
  } else if (name === "Profile") {
    iconImagePath = require("../assets/user.png");
  }
  return (
    <Image
      style={{
        width: focused ? 24 : 20,
        height: focused ? 24 : 20,
      }}
      source={iconImagePath}
    ></Image>
  );
};
export default TabBarIcon;
