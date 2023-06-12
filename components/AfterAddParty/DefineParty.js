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
  StatusBar,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import Icons from "../../assets";
import { useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import {db} from '../../firebase'



const Separator = () => <View style={styles.separator} />;

const DefineParty = (props) => {

  const route =useRoute();
  const documentId = route.params?.documentId
  
  const [partyName,setPartyName] =useState("");
  const [db_category, setDb_category] =useState("");
  const [db_term,setDb_term]= useState(false);
  const [db_comp,setDb_comp] =useState(false)
  const [db_date ,setDb_date] =useState(null)
  const [db_time ,setDb_time] =useState(null)
  const [db_peopleNum,setDb_peopleNum] = useState(null);

  const chooseCategory = () => {
    const [selectedView, setSelectedView] = useState(null);
    
    
    const handleViewSelection = (viewName) => {
      if (selectedView === viewName) {
        setSelectedView(null);
      } else {
        setSelectedView(viewName);
        setDb_category(viewName);
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
  };
  const term = () => {
    const [isShortTermActive, setShortTermActive] = useState(false);
    const [isRegularActive, setRegularActive] = useState(false);
   
    
    const handleShortTermToggle = () => {
      setShortTermActive(true);
      setRegularActive(false); // Ensure the other button is deactivated
      setDb_term(false)
    };
    const handleRegularToggle = () => {
      setRegularActive(true);
      setShortTermActive(false); // Ensure the other button is deactivated
      setDb_term(true)
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
                    <View style={styles4.periodView}>{choosePeriod()}</View>
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
  };
  const choosePeriod = () => {
    const [date, onChangeDate] = useState(new Date()); // 선택 날짜
    const [mode, setMode] = useState("date"); // 모달 유형
    const [visible, setVisible] = useState(false); // 모달 노출 여부
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const onPressDate = () => {
      // 날짜 클릭 시
      setMode("date"); // 모달 유형을 date로 변경
      setVisible(true); // 모달 open
    };
    const onConfirm = (selectedDate) => {
      // 날짜 선택 시
      setVisible(false); // 모달 close
      onChangeDate(selectedDate); // 선택한 날짜 변경
      setSelectedDate(selectedDate);
      setSelectedDay(selectedDate.getDay());
      console.log(selectedDate);
    };
    const onCancel = () => {
      // 취소 시
      setVisible(false); // 모달 close
    };
    const getDayOfWeek = (dayIndex) => {
      const daysOfWeek = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ];
      return daysOfWeek[dayIndex];
    };
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={onPressDate}>
          <View style={{ alignItems: "center" }}>
            <View style={styles4.choosePeriodView}>
              <Text style={styles3.dateFontStyle}>날짜 선택</Text>
            </View>
          </View>
          <DateTimePicker
            isVisible={visible}
            mode={mode}
            display={"calendar"}
            onConfirm={onConfirm}
            onCancel={onCancel}
            date={date}
          />
        </TouchableOpacity>
        <Text style={styles4.chosenPeriodText}>
          매주 {getDayOfWeek(selectedDay)}마다
        </Text>
      </View>
    );
  };
  const comp = () => {
    const [isCompeteAble, setIsCompeteAble] = useState(false);
    const [isCompeteDisable, setIsCompeteDisable] = useState(false);
    
    
    const handleCompeteAbleToggle = () => {
      setIsCompeteAble(true);
      setIsCompeteDisable(false);
      setDb_comp(true)
    };
    const handleCompeteDisableToggle = () => {
      setIsCompeteDisable(true);
      setIsCompeteAble(false);
      setDb_comp(false)
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
  };
  const choosePeople = () => {
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
    const [selectedNumber, setSelectedNumber] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [textShown, setTextShown] = useState("인원을 선택해주세요.");
    
  
    const handleNumberChange = (number) => {
      setSelectedNumber(number);
      setDb_peopleNum(number)
    };
    const togglePicker = () => {
      setShowPicker(!showPicker);
    };
  
    return (
      <View>
        <TouchableOpacity
          style={styles3.chooseCategoryView}
          onPress={() => {
            setIsModalVisible(isModalVisible == false);
          }}
        >
          <Text style={styles3.chooseCategoryText}>
            {selectedNumber ? `최대 ${selectedNumber}명` : "인원을 선택해주세요."}
          </Text>
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
                <View style={{ flex: 1 }}>
                  {/* 제목 뷰 */}
                  <View style={{ flex: 0.5 }}>
                    <Text style={modalInnerStyle.badgeLogTitle}>
                      최대 인원 수 선택
                    </Text>
                  </View>
                  {/* 인원 수 선택 뷰 */}
                  <View style={styles3.choosePeopleView}>
                    <Picker
                      selectedValue={selectedNumber}
                      onValueChange={handleNumberChange}
                      style={styles3.pickerStyle}
                    >
                      {Array.from({ length: 30 }, (_, index) => index + 1).map(
                        (number) => (
                          <Picker.Item
                            key={number}
                            label={number.toString()}
                            value={number}
                          />
                        )
                      )}
                    </Picker>
                    <Text style={styles3.chooseText}>{selectedNumber}명</Text>
                  </View>
                  {/* 안내문 뷰 */}
                  <View style={{ flex: 0.5 }}>
                    <Text style={modalInnerStyle.introductionText}>
                      아무 곳이나 클릭하면 나가집니다.
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    );
  };
  const chooseCategoryDetail = () => {
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
    return (
      <View>
        <TouchableOpacity
          style={styles3.chooseCategoryView}
          onPress={() => {
            setIsModalVisible(isModalVisible == false);
          }}
        >
          <Text style={styles3.chooseCategoryText}>
            세부 카테고리를 선택해주세요.
          </Text>
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
                <View style={{ flex: 1 }}>
                  {/* 제목 뷰 */}
                  <View style={{ flex: 0.5 }}>
                    <Text style={modalInnerStyle.badgeLogTitle}>
                      세부 카테고리 선택
                    </Text>
                  </View>
                  {/* 세부 카테고리 뷰 */}
                  <View style={{ flex: 3 }}>
                    <ScrollView>
                      {/* 세부 카테고리 리스트 */}
                      <TouchableOpacity style={styles3.categoryList}>
                        <Image style={styles.icon} source={Icons.COOKING}></Image>
                        <Text>카테고리 리스트</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles3.categoryList}>
                        <Image style={styles.icon} source={Icons.COOKING}></Image>
                        <Text>카테고리 리스트</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles3.categoryList}>
                        <Image style={styles.icon} source={Icons.COOKING}></Image>
                        <Text>카테고리 리스트</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                  {/* 안내문 뷰 */}
                  <View style={{ flex: 0.5 }}>
                    <Text style={modalInnerStyle.introductionText}>
                      아무 곳이나 클릭하면 나가집니다.
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    );
  };
  const chooseDate = () => {
    const [date, setDate] = useState(new Date()); // selected date
    const [time, setTime] = useState(new Date()); // selected time
    const [mode, setMode] = useState("date"); // modal type
    const [visible, setVisible] = useState(false); // Whether the modal is exposed
    
    const onPressDate = () => {
      setMode("date"); // change modal type to date
      setVisible(true); // modal open
      // console.log(date);
    };

    const onPressTime = () => {
      setMode("time"); // Change the modal type to time
      setVisible(true); // modal open
      // console.log(time);
    };

    const onConfirm = (selectedDate) => {
      setVisible(false); // close the modal
      if (mode === "date") {
        
        const date1 = selectedDate.toISOString().split("T")[0];
        setDb_date(date1)
        console.log(date1);
      } else if (mode === "time") {
        setTime(selectedDate); // update the selected time
        const time1 = selectedDate.toISOString().split("T")[1].substring(0, 5);
        console.log(time1);
        setDb_time(time1)
      }
    };
    const onCancel = () => {
      setVisible(false); // close the modal
    };
    const formatDate = (date) => {
      const year = date.getFullYear().toString().substr(-2); // 2자리수 추출
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}/${month}/${day}`;
    };
    const formatTime =(time)=>{
      const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime
    } 
    return (
      <View>
        <View style={styles3.dateStyle}>
          {/* 날짜 선택 영역 */}
          <View>
            <Pressable style={styles3.dateTextView} onPress={onPressDate}>
              <Text style={styles3.dateSelectFont}>날짜 선택</Text>
            </Pressable>
            <View style={styles3.dateTextView}>
              <Text style={styles3.dateFontStyle}>{formatDate(date)}</Text>
            </View>
          </View>
          {/* 시간 선택 영역 */}
          <View>
            <Pressable style={styles3.dateTextView} onPress={onPressTime}>
              <Text style={styles3.dateSelectFont}>시간 선택</Text>
            </Pressable>
            <View style={styles3.dateTextView}>
              <Text style={styles3.dateFontStyle}>
                {formatTime(time)}
              </Text>
            </View>
          </View>
        </View>
        <DateTimePicker
          isVisible={visible}
          mode={mode}
          onConfirm={onConfirm}
          onCancel={onCancel}
          date={mode === "date" ? date : time} // 모드에 따른 date 값 지정
          // locale={PickerLocale}
        />
      </View>
    );
  };
  const saveCategory = async (documentId, category, term, comp, partyName,peopleNum,date,time) => {
    await updateDoc(doc(db, 'party', documentId), {
      category: category,
      term: term ,
      competition: comp,
      partyName: partyName,
      MaxPeople: peopleNum,
      date:date,
      time:time
    });
  
    console.log('카테고리가 저장되었습니다.');
    props.navigation.navigate("파티 설명하기",{documentId:documentId});
  };
  


  return (
    <ScrollView style={{ ...styles.flex, backgroundColor: "white" }}>
      <StatusBar style="auto" />
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
      {/* 제목, 인원, 세부 카테고리, 날짜 설정 뷰, styles3 */}
      <View style={{ ...styles.viewStyle }}>
        {/* 파티 제목 입력 */}
        <View style={styles.flexRowAndAlignCenter}>
          <Text style={styles3.fontStyle}>파티 제목</Text>
          <TextInput
            style={styles3.textInputStyle}
            title={"PartyTitle"}
            value={partyName}
            placeholder={"파티 제목을 입력해주세요."}
            placeholderTextColor={"black"}
            returnKeyType="next"
            
            onChangeText={setPartyName}

          ></TextInput>
        </View>
        {/* 인원 수 입력 */}
        <View style={styles.flexRowAndAlignCenter}>
          <Text style={styles3.fontStyle}>최대 인원</Text>
          {choosePeople()}
        </View>
        {/* 카테고리 선택 */}
        <View style={styles.flexRowAndAlignCenter}>
          <Text style={styles3.fontStyle}>세부 카테고리</Text>
          {chooseCategoryDetail()}
        </View>
        {/* 일정 선택 */}
        <View style={styles.flexRowAndAlignCenter}>
          <Text style={styles3.fontStyle}>날짜 및 시간</Text>
          {chooseDate()}
        </View>
      </View>
      <Separator />
      {/* 다음 */}
      <View style={{ alignItems: "center", paddingVertical: 30 }}>
        <TouchableOpacity
          onPress={() => {
            saveCategory(documentId,db_category,db_term,db_comp,partyName,db_peopleNum,db_date,db_time)
          }}
          style={{ ...styles4.activeStyle }}
        >
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
    width: 150,
    textAlign: "center",
  },
  textInputStyle: {
    paddingHorizontal: 10,
    height: 38,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: 220,
    marginVertical: 6,
  },
  dateStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    height: 85,
    width: 220,
  },
  dateTextView: {
    alignItems: "center",
    marginVertical: 5,
  },
  dateSelectFont: {
    fontSize: 15,
    fontWeight: "700",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    // borderColor: "gray",
    padding: 5,
    color: "gray",
  },
  dateFontStyle: {
    fontSize: 15,
    fontWeight: "600",
    alignItems: "center",
    color: "#8000FF",
  },
  chooseCategoryView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    height: 38,
    justifyContent: "center",
    paddingHorizontal: 10,
    width: 220,
    marginVertical: 6,
  },
  chooseCategoryText: {
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
  },
  categoryList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "gray",
    marginBottom: 10,
  },
  choosePeopleView: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chooseText: {
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  pickerStyle: {
    height: "100%",
    width: 150,
    marginRight: 30,
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
  periodView: {
    height: 180,
    alignItems: "center",
  },
  chosenPeriodText: {
    paddingVertical: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  choosePeriodView: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    width: 130,
    height: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
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
