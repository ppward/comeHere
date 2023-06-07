import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Icons from "../../assets";
// import PICKERS from "./pickers";

const Separator = () => <View style={styles.separator} />;

const DefineParty = () => {
  return (
    <ScrollView style={{ ...styles.flex, backgroundColor: "white" }}>
      {/* 최상단 텍스트 뷰, styles1 */}
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>추가 질문에 답을 해주세요.</Text>
      </View>
      <Separator />
      {/* 카테고리 선택 뷰, styles2 */}
      <View style={{ ...styles.viewStyle, marginTop: 15 }}>
        <Text style={{ ...styles.textStyle, fontSize: 20 }}>
          어떤 주제인가요?
        </Text>
        <View style={{ marginVertical: 40, flexDirection: "row" }}>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
          <Image style={styles.icon} source={Icons.BRACE}></Image>
        </View>
        <View
          style={{ alignItems: "center", marginTop: 50, marginVertical: 10 }}
        >
          <Image style={styles.icon} source={Icons.BRACE}></Image>
        </View>
      </View>
      <Separator />
      {/* 제목, 인원 설정 뷰, styles3 */}
      <View style={{ ...styles.viewStyle, flexDirection: "row" }}>
        <View style={{ ...styles3.settingFontView, paddingRight: 18 }}>
          <Text style={{ ...styles3.fontStyle, marginBottom: 30 }}>
            파티 제목
          </Text>
          <Text style={{ ...styles3.fontStyle }}>인원</Text>
        </View>
        <View style={styles3.settingFontStyle}>
          <TextInput
            style={styles3.textInputStyle}
            title={"PartyTitle"}
            placeholder={"파티 제목을 입력해주세요."}
            placeholderTextColor={"blue"}
            returnKeyType="next"
          ></TextInput>
          {/* TextInput 형식 말고 Dropdown이나 Picker 대체 */}
          <TextInput
            style={styles3.textInputStyle}
            title={"PartyTitle"}
            placeholder={"인원 수를 입력해주세요."}
            placeholderTextColor={"blue"}
            returnKeyType="next"
          ></TextInput>
        </View>
      </View>
      <Separator />
      {/* 파티 속성 설정 뷰, styles4 */}
      <View style={{ ...styles.viewStyle }}>
        <View style={{ flexDirection: "row" }}>
          {/* 모임 유형 */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...styles.textStyle, fontSize: 22 }}>모임 유형</Text>
            {/* 단기 */}
            <View style={styles.flexDirectionRow}>
              <View>
                <TouchableOpacity
                  style={styles4.btnStyle}
                  onPress={() => {
                    // props.navigation.navigate("DefineParty");
                  }}
                >
                  <Text style={styles4.fontStyle}>단기</Text>
                </TouchableOpacity>
              </View>
              {/* 정기 */}
              <View>
                <TouchableOpacity
                  style={styles4.btnStyle}
                  onPress={() => {
                    // props.navigation.navigate("DefineParty");
                  }}
                >
                  <Text style={styles4.fontStyle}>정기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* 경쟁 가능 */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...styles.textStyle, fontSize: 22 }}>경쟁 가능</Text>
            {/* 단기 */}
            <View style={styles.flexDirectionRow}>
              <View>
                <TouchableOpacity
                  style={styles4.btnStyle}
                  onPress={() => {
                    // props.navigation.navigate("DefineParty");
                  }}
                >
                  <Text style={styles4.fontStyle}>O</Text>
                </TouchableOpacity>
              </View>
              {/* 정기 */}
              <View>
                <TouchableOpacity
                  style={styles4.btnStyle}
                  onPress={() => {
                    // props.navigation.navigate("DefineParty");
                  }}
                >
                  <Text style={styles4.fontStyle}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  textStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  viewStyle: {
    padding: 15,
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 20,
  },
});
const styles1 = StyleSheet.create({});
const styles2 = StyleSheet.create({});
const styles3 = StyleSheet.create({
  fontStyle: {
    fontWeight: "bold",
    fontSize: 21,
  },
  settingFontView: {
    marginRight: 15,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
    height: 100,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    height: 38,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: 225,
    marginTop: 5,
    marginBottom: 5,
  },
});
const styles4 = StyleSheet.create({
  btnStyle: {
    justifyContent: "center",
    backgroundColor: "#8000FF",
    borderRadius: 20,
    width: 60,
    height: 40,
    marginVertical: 20,
    margin: 10,
  },
  fontStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DefineParty;
