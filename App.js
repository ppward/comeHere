import { StyleSheet, Image } from "react-native";
import MainScreen from "./components/MainScreen";
import AddParty from "./components/AddParty";
import Settings from "./components/AfterUser/Settings";
import Auth from "./components/Auth";
import AppPolicy from "./components/AfterUser/AppPolicy";
import AppGuide from "./components/AfterUser/AppGuide";
import PartyLog from "./components/AfterUser/PartyLog";
import CommentLog from "./components/AfterUser/CommentLog";
import DefineParty from "./components/AfterAddParty/DefineParty";
import DescribeParty from "./components/AfterAddParty/DescribeParty";
import app from "./firebase";
import Icons from "./assets/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

{
  /*  initialRouteName="Loginpage" */
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="파티 생성하기" component={AddParty} />
        <Stack.Screen name="환경설정" component={Settings} />
        <Stack.Screen name="Loginpage" component={Auth} />
        <Stack.Screen name="약관 및 정책" component={AppPolicy} />
        <Stack.Screen name="가이드라인" component={AppGuide} />
        <Stack.Screen name="파티 참여내역" component={PartyLog} />
        <Stack.Screen name="최근 댓글" component={CommentLog} />
        <Stack.Screen name="파티 설정하기" component={DefineParty} />
        <Stack.Screen name="파티 설명하기" component={DescribeParty} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
