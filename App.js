import { StyleSheet } from "react-native";
import LocationMaps from "./components/LocationMaps";
import MainScreen from "./components/MainScreen";
import User from "./components/User";
import Ranking from "./components/Ranking";
import TabBarIcon from "./components/TabBarIcon";
import CurrentParty from "./components/CurrentParty";
import AddParty from "./components/AddParty";
import Settings from "./components/Settings";
// import FirebaseTest from "./components/FirebaseTest";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name=" "
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddParty" component={AddParty} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
