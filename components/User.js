import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import Icons from "assets";
import Modal_BadgeLog from "./AfterUser/Modal_BadgeLog";
import { useState } from "react";

const Modal_BadgeLogf = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles4.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles4.centeredView}>
          <View style={styles4.modalView}>
            <Text style={styles4.modalText}>Hello World!</Text>
            <Pressable
              style={[styles4.button, styles4.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles4.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles4.button, styles4.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles4.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const User = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        {/* 프로필 사진 뷰, styles1 */}
        <View style={{ ...styles1.profilePicView }}>
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
              <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}>
                닉네임
              </Text>
              <Image style={styles1.profilePicEdit} source={Icons.EDIT}></Image>
            </View>
          </View>
        </View>

        {/* 활동 지역, 배지 확인 뷰, styles2 */}
        <View style={{ flex: 1, backgroundColor: "lightgray" }}>
          <TouchableOpacity style={styles2.location}>
            <Text style={styles2.locationText}>oo면 여행자</Text>
          </TouchableOpacity>
          {/* 배지 확인 뷰 */}
          <View style={styles2.badgeStyle}>
            <Image
              style={{ width: 30, height: 30, margin: 10, marginLeft: 20 }}
              source={Icons.BADGE}
            />

            {/* 획득 배지 확인 뷰 */}

            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log("modal area pressed");
                  // Modal_BadgeLogf();
                  <Modal_BadgeLog></Modal_BadgeLog>;
                }}
              >
                <View style={styles2.acquiredBadge}>
                  <Text style={styles2.acquiredBadgeText}>획득 배지 확인</Text>
                  <Image style={styles.icon} source={Icons.QUESTION}></Image>
                </View>
              </TouchableOpacity>
            </View>
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
