import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import Icons from "assets";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Separator = () => <View style={styles.separator} />;

const DescribeParty = (props) => {
  const route = useRoute();
  const documentId = route.params?.documentId;
  const [describe, setDescribe] = useState("");
  const [db_url, setDb_url] = useState("");
  const [data, setData] = useState([]);
  const [userCategory, setUserCategory] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "party", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const documentData = docSnap.data();
          setData(documentData);
          // 문서 데이터 처리
          console.log(documentData);
          const icon = checkCategory(data.category);
          setIcon(icon);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchDocument();
  }, [documentId]);

  const checkCategory = (category) => {
    if (category == "outdoor") {
      setUserCategory("아웃도어/여행");
      return Icons.OUTDOOR;
    } else if (category == "sports") {
      setUserCategory("운동/스포츠");
      return Icons.SPORTS;
    } else if (category == "culture") {
      setUserCategory("문화/공연/축제");
      return Icons.CULTURE;
    } else if (category == "volunteer") {
      setUserCategory("봉사활동");
      return Icons.VOLUNTEER;
    } else if (category == "photo") {
      setUserCategory("사진/영상");
      return Icons.PHOTO;
    } else if (category == "game") {
      setUserCategory("게임/오락");
      return Icons.GAME;
    } else if (category == "cooking") {
      setUserCategory("요리/제조");
      return Icons.COOKING;
    } else if (category == "adult") {
      setUserCategory("유흥");
      return Icons.ADULT;
    } else if (category == "etc") {
      setUserCategory("기타");
      return Icons.ETC;
    } else {
    }
  };

  const ImagePickerComponent = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [status, requestPermission] =
      ImagePicker.useMediaLibraryPermissions();
    const uploadImage = async () => {
      if (!status?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          return null;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        aspect: [1, 1],
      });
      if (result.canceled) {
        return null;
      }
      setImageUrl(result.uri);
      setDb_url(result.uri);
    };
    return (
      <View style={styles2.imageInputView}>
        {/* 이미지 첨부 뷰 */}
        <View style={{ paddingTop: 100 }}>
          <Pressable style={styles2.imageInputStyle} onPress={uploadImage}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles2.imageSampleStyle}
                source={Icons.IMAGE}
              ></Image>
            </View>
          </Pressable>
        </View>
        {/* 첨부된 이미지 확인 뷰 */}
        <View
          style={{ borderWidth: 0.5, borderRadius: 5, borderColor: "gray" }}
        >
          <Image
            style={styles2.uploadedImage}
            source={{ uri: imageUrl }}
          ></Image>
        </View>
      </View>
    );
  };

  const saveDescribe = async (documentId, describe, uri) => {
    await updateDoc(doc(db, "party", documentId), {
      describe: describe,
      URI: uri,
    });

    console.log("세부사항이 저장되었습니다.");
    props.navigation.navigate("MainScreen");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      {/* 최상단 간략한 파티 묘사, styles1 */}
      <View style={{ padding: 15, flex: 0.5 }}>
        <View>
          <View style={styles1.SummaryView}>
            <Image style={styles.icon} source={icon}></Image>
            <Text style={styles1.SummaryText}>{userCategory}</Text>
          </View>
          <View style={styles.flexRowAndAlignCenter}>
            <Text style={styles1.LocationText}>{data.adress}</Text>
            <Image style={styles.icon} source={Icons.LOCATION}></Image>
          </View>
        </View>
      </View>
      <Separator />
      {/* 파티 설명 뷰, styles2 */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ padding: 15, flex: 3 }}>
          {/* 파티 설명 */}
          <View style={{ flex: 7 }}>
            <TextInput
              style={styles2.textInputStyle}
              title={"describeContents"}
              placeholder="내용을 입력하세요. (선택)"
              placeholderTextColor={"#819FF7"}
              multiline={true}
              textAlignVertical="top"
              returnKeyType="next"
              value={describe}
              onChangeText={setDescribe}
            ></TextInput>
          </View>
          {/* 이미지 */}
          <View style={{ flex: 6 }}>{ImagePickerComponent()}</View>
        </View>
      </TouchableWithoutFeedback>
      <Separator />
      {/* 등록 뷰, styles3 */}
      <View style={{ alignItems: "center", paddingVertical: 30 }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("파티 등록이 완료되었습니다.");
            saveDescribe(documentId, describe, db_url);
            {
              /*
              alert 창 확인 버튼 누르고 메인 화면으로 옮기려 했으나
              앱 버그때문에 바로 메인화면으로 가게 됨
            */
            }
          }}
          style={{ ...styles3.activeStyle }}
        >
          <Text style={styles3.fontStyle}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  icon: {
    width: 20,
    height: 20,
    padding: 10,
  },
});
const styles1 = StyleSheet.create({
  SummaryView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAAC58",
    borderRadius: 20,
    width: 160,
    height: 40,
    flexDirection: "row",
    marginBottom: 15,
  },
  SummaryText: {
    fontWeight: "600",
    paddingLeft: 10,
    color: "#F2F2F2",
    fontSize: 16,
  },
  LocationText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 5,
    marginRight: 7,
  },
});
const styles2 = StyleSheet.create({
  textInputStyle: {
    height: "80%",
    padding: 10,
    paddingTop: 15,
    fontWeight: "200",
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
  },
  imageInputView: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    paddingTop: 15,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageInputStyle: {
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
    height: 80,
    width: 130,
    justifyContent: "center",
  },
  imageSampleStyle: {
    height: 40,
    width: 40,
  },
  uploadedImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
});
const styles3 = StyleSheet.create({
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

export default DescribeParty;
