import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Button,
  TextInput,
} from "react-native";
import Icons from "assets";
import { useState, useEffect, useRef } from "react";

const User = (props) => {
  const [nickname, setNickname] = useState("");
  function badgeModal() {
    const [isModalVisible, setIsModalVisible] = useState(false);
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
      closeBottomSheet.start(() => setIsModalVisible(false));
    };
    useEffect(() => {
      if (isModalVisible) {
        resetBottomSheet.start();
      }
    }, [isModalVisible]);
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
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(isModalVisible == false);
          }}
        >
          <View style={styles2.acquiredBadge}>
            <Text style={styles2.acquiredBadgeText}>획득 배지 확인</Text>
            <Image style={styles.icon} source={Icons.QUESTION}></Image>
          </View>
        </TouchableOpacity>
        {/* 모달 */}
        <Modal
          visible={isModalVisible}
          animationType={"fade"}
          transparent={true}
          statusBarTranslucent={true}
        >
          <Pressable
            style={modalStyle.modalOverlay}
            onPress={() => setIsModalVisible(isModalVisible == false)}
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
                  <Text style={modalInnerStyle.badgeLogTitle}>획득한 배지</Text>
                  <View style={{ paddingBottom: 150 }}>
                    <Image style={styles.icon} source={Icons.BADGE}></Image>
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
    );
  }
  function modifyName(newNickname) {
    const [isModalVisible, setIsModalVisible] = useState(false);
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
      closeBottomSheet.start(() => setIsModalVisible(false));
    };
    useEffect(() => {
      if (isModalVisible) {
        resetBottomSheet.start();
      }
    }, [isModalVisible]);
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
      modifyName: {
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
    const textInput = StyleSheet.create({
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 10,
      height: 40,
      borderRadius: 10,
      borderColor: "gray",
      borderWidth: 1,
    });

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(isModalVisible == false);
          }}
        >
          <Image style={styles1.profilePicEdit} source={Icons.EDIT}></Image>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          animationType={"fade"}
          transparent={true}
          statusBarTranslucent={true}
        >
          <Pressable
            style={modalStyle.modalOverlay}
            onPress={() => setIsModalVisible(isModalVisible == false)}
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
                <View style={{}}>
                  <Text style={modalInnerStyle.modifyName}>닉네임 수정</Text>
                  <TextInput
                    style={textInput}
                    title={"ModifyNickname"}
                    placeholder="수정할 닉네임을 입력해주세요."
                    placeholderTextColor={"blue"}
                    returnKeyType="next"
                    value={nickname}
                    onChangeText={(text) => setNickname(text)}
                  ></TextInput>
                  <View
                    style={{
                      flexDirection: "row",
                      marginRight: "50%",
                      marginTop: "20%",
                    }}
                  >
                    <Button
                      onPress={() => {
                        setNickname(nickname);
                        setIsModalVisible(isModalVisible == false);
                      }}
                      title="확인"
                    ></Button>
                    <Button
                      onPress={() => {
                        setNickname("");
                        setIsModalVisible(isModalVisible == false);
                      }}
                      title="취소"
                    ></Button>
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        {/* 프로필 사진 뷰, styles1 */}
        <View style={styles1.profilePicView}>
          {/* 환경설정 */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          >
            <Image
              style={{ ...styles.icon, marginLeft: "80%" }}
              source={Icons.SETTING}
            />
          </TouchableOpacity>
          {/* 프로필 사진, 닉네임, 닉네임 수정, 배지 */}
          <View style={{ alignItems: "center" }}>
            <Image style={styles1.profilePic} source={Icons.USER} />
            <View style={styles.flexRowAndAlignCenter}>
              <Image
                style={{ ...styles.icon, marginRight: 10 }}
                source={Icons.BADGE}
              ></Image>
              <Text>{nickname}</Text>
              {/* 닉네임 수정 */}
              {modifyName()}
            </View>
          </View>
        </View>

        {/* 활동 지역, 배지 확인 뷰, styles2 */}
        <View style={{ flex: 1, backgroundColor: "lightgray" }}>
          <TouchableOpacity
            style={{ ...styles2.location, flexDirection: "row" }}
          >
            <Text style={styles2.locationText}>oo면 여행자</Text>
          </TouchableOpacity>
          {/* 배지 확인 뷰 */}
          <View style={styles2.badgeStyle}>
            <Image
              style={{ width: 30, height: 30, margin: 10, marginLeft: 20 }}
              source={Icons.BADGE}
            />
            {/* 획득 배지 확인 뷰 */}
            {badgeModal()}
          </View>
        </View>

        {/* 나의 활동 뷰, styles3 */}
        <View style={styles3.myActivity}>
          <Text style={styles3.myActivityText}>나의 활동</Text>
          {/* 파티 참여 내역 뷰 */}
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("PartyLog");
              }}
            >
              <View style={styles3.activityView}>
                <Text style={styles3.activityLogText}>파티 참여 내역</Text>
                <Image
                  source={Icons.BRACE}
                  style={styles3.checkActivityIcon}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
          {/* 최근 댓글 뷰 */}
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("CommentLog");
              }}
            >
              <View style={{ ...styles3.activityView, marginRight: -45 }}>
                <Text
                  style={{ ...styles3.activityLogText, marginRight: "70%" }}
                >
                  최근 댓글
                </Text>
                <Image
                  source={Icons.BRACE}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffafa",
    fontColor: "black",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  flexRowAndAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

const styles1 = StyleSheet.create({
  profilePicView: {
    backgroundColor: "white",
    alignItems: "center",
  },
  profilePic: {
    width: 80,
    height: 80,
  },
  profilePicEdit: {
    marginLeft: 10,
    marginBottom: 5,
    width: 17,
    height: 17,
  },
});

const styles2 = StyleSheet.create({
  location: {
    backgroundColor: "plum",
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 10,
  },
  locationText: {
    margin: 15,
    color: "white",
    height: 15,
    fontSize: 15,
  },
  badgeStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  acquiredBadge: {
    marginLeft: 140,
    flexDirection: "row",
    alignItems: "center",
  },
  acquiredBadgeText: {
    marginLeft: 30,
    marginRight: 5,
    fontSize: 17,
  },
});

const styles3 = StyleSheet.create({
  myActivity: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
  },
  myActivityText: {
    margin: 10,
    backgroundColor: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  activityLogText: {
    margin: 10,
    borderColor: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkActivityIcon: {
    width: 20,
    height: 20,
    marginLeft: "63%",
  },
  activityView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: "1px",
    borderColor: "lightgrey",
    marginLeft: 5,
    marginBottom: 10,
  },
});

const styles4 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default User;
