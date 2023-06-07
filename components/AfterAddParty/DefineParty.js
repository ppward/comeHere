import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
  PanResponder,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Icons from "../../assets";
// import PICKERS from "./pickers";

const toggle = false;

const Separator = () => <View style={styles.separator} />;

const DefineParty = () => {
  function term() {
    const [isShortTermActive, setShortTermActive] = useState(false);
    const [isRegularActive, setRegularActive] = useState(false);
    const handleShortTermToggle = () => {
      setShortTermActive(!isShortTermActive);
      setRegularActive(false); // Ensure the other button is deactivated
    };
    const handleRegularToggle = () => {
      setRegularActive(!isRegularActive);
      setShortTermActive(false); // Ensure the other button is deactivated
    };
    const [isModalVisible, setModalVisible] = useState(false);
    const handleToggle = () => {
      setRegularActive(!isRegularActive);
      setShortTermActive(false);
      setModalVisible(true); // 모달을 활성화합니다.
    };
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-1, 0, 1],
    });
    const resetBottomSheet = Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });
    const closeBottomSheet = Animated.timing(panY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    });
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) =>
          panY.setValue(gestureState.dy),
        onPanResponderRelease: (event, gestureState) => {
          if (gestureState.dy > 0 && gestureState.vy > 1.5) {
            closeModal();
          } else {
            resetBottomSheet.start();
          }
        },
      })
    ).current;
    const closeModal = () => {
      closeBottomSheet.start(() => setModalVisible(false));
    };
    useEffect(() => {
      if (isModalVisible) {
        resetBottomSheet.start();
      }
    }, [isModalVisible]);
    // 단기/정기 토글과 모달 기능
    const handleOnPress = () => {
      handleRegularToggle();
      handleToggle();
    };
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.textStyle, fontSize: 22, paddingTop: 10 }}>
          모임 유형
        </Text>
        <View style={{ ...styles.flexDirectionRow }}>
          {/* 단기 */}
          <View>
            <TouchableOpacity
              style={[
                styles4.btnStyle,
                isShortTermActive ? styles4.activeStyle : null,
              ]}
              onPress={handleShortTermToggle}
            >
              <Text style={styles4.fontStyle}>단기</Text>
            </TouchableOpacity>
          </View>
          {/* 정기 */}
          <View onPress={handleToggle}>
            <TouchableOpacity
              style={[
                styles4.btnStyle,
                isRegularActive ? styles4.activeStyle : null,
              ]}
              onPress={handleOnPress}
            >
              <Text style={styles4.fontStyle}>정기</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isModalVisible}
            animationType={"fade"}
            transparent={true}
            statusBarTranslucent={true}
          >
            <Pressable
              style={modalStyle.modalOverlay}
              onPress={() => setModalVisible(isModalVisible == false)}
            >
              <TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    ...modalStyle.bottomSheetContainer,
                    transform: [{ translateY: translateY }],
                  }}
                  {...panResponder.panHandlers}
                >
                  {/* 모달에 들어갈 내용을 아래에 작성 */}
                  <View style={{ alignItems: "stretch" }}>
                    <Text style={modalInnerStyle.badgeLogTitle}>
                      모임 주기 설정
                    </Text>
                    <View
                      style={{ paddingBottom: 150, backgroundColor: "blue" }}
                    >
                      <Text>주기설정</Text>
                    </View>
                    <Text style={modalInnerStyle.introductionText}>
                      아무 곳이나 클릭하면 나가집니다.
                    </Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Modal>
        </View>
      </View>
    );
  }
  function comp() {
    const [isCompeteAble, setIsCompeteAble] = useState(false);
    const [isCompeteDisable, setIsCompeteDisable] = useState(false);
    const handleCompeteAbleToggle = () => {
      setIsCompeteAble(!isCompeteAble);
      setIsCompeteDisable(false);
    };
    const handleCompeteDisableToggle = () => {
      setIsCompeteDisable(!isCompeteDisable);
      setIsCompeteAble(false);
    };
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.textStyle, fontSize: 22, paddingTop: 10 }}>
          경쟁 가능
        </Text>
        {/* 경쟁 가능 */}
        <View style={styles.flexDirectionRow}>
          <View>
            <TouchableOpacity
              style={[
                styles4.btnStyle,
                isCompeteAble ? styles4.activeStyle : null,
              ]}
              onPress={handleCompeteAbleToggle}
            >
              <Text style={styles4.fontStyle}>O</Text>
            </TouchableOpacity>
          </View>
          {/* 경쟁 불가능 */}
          <View>
            <TouchableOpacity
              style={[
                styles4.btnStyle,
                isCompeteDisable ? styles4.activeStyle : null,
              ]}
              onPress={handleCompeteDisableToggle}
            >
              <Text style={styles4.fontStyle}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  function chooseCategory() {
    const [selectedView, setSelectedView] = useState(null);
    const handleViewSelection = (viewName) => {
      if (selectedView === viewName) {
        setSelectedView(null);
      } else {
        setSelectedView(viewName);
      }
    };
    const isViewSelected = (viewName) => {
      return selectedView === viewName;
    };
    return (
      <View>
        <View style={{ marginBottom: 10, flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("outdoor" ? styles2.selectedView : null),
            ]}
            onPress={() => {
              handleViewSelection("outdoor");
            }}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("outdoor") ? styles2.selectedImage : null,
              ]}
              source={Icons.OUTDOOR}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("outdoor") ? styles2.selectedText : null,
              ]}
            >
              아웃도어/여행
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("sports" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("sports")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("sports") ? styles2.selectedImage : null,
              ]}
              source={Icons.SPORTS}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("sports") ? styles2.selectedText : null,
              ]}
            >
              운동/스포츠
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("culture" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("culture")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("culture") ? styles2.selectedImage : null,
              ]}
              source={Icons.CULTURE}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("culture") ? styles2.selectedText : null,
              ]}
            >
              문화/공연/축제
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("volunteer" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("volunteer")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("volunteer") ? styles2.selectedImage : null,
              ]}
              source={Icons.VOLUNTEER}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("volunteer") ? styles2.selectedText : null,
              ]}
            >
              봉사활동
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("photo" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("photo")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("photo") ? styles2.selectedImage : null,
              ]}
              source={Icons.PHOTO}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("photo") ? styles2.selectedText : null,
              ]}
            >
              사진/영상
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("game" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("game")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("game") ? styles2.selectedImage : null,
              ]}
              source={Icons.GAME}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("game") ? styles2.selectedText : null,
              ]}
            >
              게임/오락
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("cooking" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("cooking")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("cooking") ? styles2.selectedImage : null,
              ]}
              source={Icons.COOKING}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("cooking") ? styles2.selectedText : null,
              ]}
            >
              요리/제조
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("adult" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("adult")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("adult") ? styles2.selectedImage : null,
              ]}
              source={Icons.ADULT}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("adult") ? styles2.selectedText : null,
              ]}
            >
              유흥
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles2.etcView}>
          <TouchableOpacity
            style={[
              styles2.iconView,
              isViewSelected("etc" ? styles2.selectedView : null),
            ]}
            onPress={() => handleViewSelection("etc")}
          >
            <Image
              style={[
                styles2.icons,
                isViewSelected("etc") ? styles2.selectedImage : null,
              ]}
              source={Icons.ETC}
            ></Image>
            <Text
              style={[
                styles2.iconText,
                isViewSelected("etc") ? styles2.selectedText : null,
              ]}
            >
              기타
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={{ ...styles.flex, backgroundColor: "white" }}>
      {/* 최상단 텍스트 뷰, styles1 */}
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>추가 질문에 답을 해주세요.</Text>
      </View>
      <Separator />
      {/* 카테고리 선택 뷰, styles2 */}
      <View style={{ ...styles.viewStyle, marginTop: 15 }}>
        <Text style={{ ...styles.textStyle, fontSize: 20, marginBottom: 30 }}>
          어떤 주제인가요?
        </Text>
        {/* 카테고리 선택 */}
        {chooseCategory()}
      </View>
      <Separator />
      {/* 파티 속성 설정 뷰, styles4 */}
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          {/* 모임 유형 */}
          {term()}
          {/* 경쟁 여부 */}
          {comp()}
        </View>
      </View>
      <Separator />
      {/* 제목, 인원, 날짜 설정 뷰, styles3 */}
      <View style={{ ...styles.viewStyle, flexDirection: "row" }}>
        <View style={{ ...styles3.settingFontView, marginLeft: 0 }}>
          <Text style={{ ...styles3.fontStyle }}>파티 제목</Text>
          <Text style={{ ...styles3.fontStyle }}>인원</Text>
          <Text style={{ ...styles3.fontStyle }}>세부 카테고리</Text>
          <Text style={{ ...styles3.fontStyle }}>날짜 및 시간</Text>
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
          <TextInput
            style={styles3.textInputStyle}
            title={"PartyTitle"}
            placeholder={"카테고리를 선택해주세요."}
            placeholderTextColor={"blue"}
            returnKeyType="next"
          ></TextInput>
          <TextInput
            style={styles3.textInputStyle}
            title={"PartyTitle"}
            placeholder={"날짜를 선택해주세요."}
            placeholderTextColor={"blue"}
            returnKeyType="next"
          ></TextInput>
        </View>
      </View>
      <Separator />
      <View style={{ alignItems: "center", paddingVertical: 30 }}>
        <TouchableOpacity style={{ ...styles4.activeStyle }}>
          <Text style={styles4.fontStyle}>다음</Text>
        </TouchableOpacity>
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
const styles2 = StyleSheet.create({
  icons: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  iconText: {
    fontSize: 13,
    color: "gray",
    marginTop: 10,
  },
  iconView: {
    width: 80,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  etcView: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  selectedView: {
    flex: 1,
  },
  selectedImage: {
    backgroundColor: "#E2A9F3",
  },
  selectedText: {
    color: "#8000FF",
  },
});
const styles3 = StyleSheet.create({
  fontStyle: {
    fontWeight: "bold",
    fontSize: 21,
    marginVertical: 17,
  },
  settingFontView: {
    marginRight: 15,
    marginLeft: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
    height: 160,
  },
  textInputStyle: {
    paddingHorizontal: 10,
    height: 38,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: 225,
    marginVertical: 10,
  },
});
const styles4 = StyleSheet.create({
  btnStyle: {
    justifyContent: "center",
    backgroundColor: "#6E6E6E",
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
  activeStyle: {
    justifyContent: "center",
    backgroundColor: "#8000FF",
    borderRadius: 20,
    width: 60,
    height: 40,
    marginVertical: 20,
    margin: 10,
  },
});
const modalStyle = StyleSheet.create({
  flexible: {
    flex: 1,
  }, // flex 속성 지정
  alignContentsCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }, // 가로세로 중앙정렬
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  }, // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이
  bottomSheetContainer: {
    height: 300,
    backgroundColor: "#fff",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  }, // 모달 스타일
});
const modalInnerStyle = StyleSheet.create({
  badgeLogTitle: {
    fontSize: 22,
    fontWeight: "700",
    paddingBottom: 10,
  },
  introductionText: {
    color: "#f00",
    textAlign: "center",
    fontSize: 16,
  },
});

export default DefineParty;
