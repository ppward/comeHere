import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Icons from "assets";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; //지도호출하는
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const screenWidth = Dimensions.get("screen").width;
const API_KEY = "AIzaSyDKh2OlCH3rXcL_W5PokwjbazZvQunwljw";

const setUserLocation = (lat, long) => {
  //사용자의 위치를 저장(json 키로 변경하는 함수)
  const setState = {
    userLocation: {
      latitude: lat, //props의 위도저장
      longitude: long, // props의 경도저장
      latitudeDelta: 0.004, //맵의 dgree? 를 표시하는 값이라는데...
      longitudeDelta: 0.004,
    },
  };
};
const defaultRegion = {
  latitude: 36.7997761,
  longitude: 127.0748502,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const GetLocation = () => {
  // 사용자의 현재위치를 받아오는 함수
  const [err, setErr] = useState(null); // 에러 핸들링을 하기위한 상태값
  const [location, setLocation] = useState([0, 0]); // 사용자의 위치정보를 저장하기 위한 상태값

  useEffect(() => {
    (async () => {
      // 비동기 키워드
      let { status } = await Location.requestForegroundPermissionsAsync(); //사용자의 현재위치(GPS)를 사용 동의를 하는 함수
      if (status != "granted") {
        // granted -> 허가된 이라는 뜻으로 키워드이다
        setErr("permission to acess location was deniedc"); // 허가 되지않으면 에러 상태에 permission to acess location was deniedc 으로 문장 변경?
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync(); //위치정보중 latitude와 longitude만을 받아오는 함수

      // location[0] = setLocation(latitude)
      // location[1] =setLocation(longitude)
      setLocation([latitude, longitude]); //location에 lattitude(위도), longitude(경도) 저장
    })();
  }, [location]); // [location]의 값이 변할 때 마다 동작
  return location; // location (위치정보) 반환
};

const AddParty = (props) => {
  let locate = GetLocation(); //위의 위치정보 받아오는 함수 선언

  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [adress,setAdress] = useState("");
  const [checkText_press, setCheckText_press] = useState(false);
  const [db_lat, setDb_lat] = useState(null);
  const [db_lng, setDb_lng] = useState(null);

  const handleQueryChange = async (value) => {
    setQuery(value);
    try {
      const encodedValue = encodeURIComponent(value);
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedValue}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.predictions) {
        const topPredictions = data.predictions.slice(0, 4);
        setPredictions(topPredictions);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      setPredictions([]);
    }
  };

  const handlePredictionPress = async (prediction) => {
    setSelectedPlace(prediction);

    try {
      const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${API_KEY}`;
      const placeDetailsResponse = await fetch(placeDetailsUrl);
      const placeDetailsData = await placeDetailsResponse.json();

      const result = placeDetailsData.result;
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;

      setQuery(`${result.formatted_address}`);
      setAdress(`${result.formatted_address}`);
      setSelectedPlace({ ...prediction, lat, lng });
      setCheckText_press(true);
      setDb_lat(lat);
      setDb_lng(lng);
    } catch (error) {
      console.log(error);
    }
  };

  const getMapViewRegion = () => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      return {
        latitude: selectedPlace.lat,
        longitude: selectedPlace.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    return defaultRegion;
  };

  const [documentId, setDocumentId] = useState("");

  const saveLocation = async (adress,latitude, longitude) => {
    try {
      const docRef = await addDoc(collection(db, "party"), {
        adress: adress,
        location:{
          latitude: latitude,
          longitude: longitude,
        },
      });

      setDocumentId(docRef.id);
      props.navigation.navigate("파티 설정하기", { documentId: docRef.id });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 장소 검색 뷰, styles1 */}
      <View style={styles1.searchView}>
        <TextInput
          clearButtonMode="always"
          style={styles1.textInputStyle}
          placeholder="장소를 검색해주세요."
          placeholderTextColor={"blue"}
          returnKeyType="next"
          value={query}
          onChangeText={handleQueryChange}
          onSubmitEditing={() => handlePredictionPress(predictions[0])}
        ></TextInput>
      </View>
      {/* 지도 뷰, styles2 */}
      <View style={{ flex: 3 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          region={getMapViewRegion()}
          showsMyLocationButton={true}
          onUserLocationChange={setUserLocation(locate[0], locate[1])}
          showsUserLocation={true}
        >
          {selectedPlace && selectedPlace.lat && selectedPlace.lng && (
            <Marker
              coordinate={{
                latitude: selectedPlace.lat,
                longitude: selectedPlace.lng,
              }}
              title={selectedPlace.description}
            />
          )}
        </MapView>
        <View
          style={query != "" ? styles1.overlayView : styles1.inVisibleDisplay}
        >
          <ScrollView>
            {predictions.map((prediction) => (
              <View
                style={{
                  borderWidth: 0.2,
                  padding: 5,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
              >
                <Text
                  key={prediction.place_id}
                  style={styles.predictionText}
                  onPress={() => handlePredictionPress(prediction)}
                >
                  {prediction.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {/* 다음 버튼 뷰, styles3 */}
      <View style={{ flex: 0.5, alignItems: "center", paddingTop: 30 }}>
        <TouchableOpacity
          style={styles3.ToStyle}
          onPress={() => {
           saveLocation(adress,db_lat,db_lng)
            
          }}
        >
          <Text style={styles3.ToTextStyle}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRowAndAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

const styles1 = StyleSheet.create({
  searchView: {
    padding: 15,
    flex: 0.2,
  },
  textInputStyle: {
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: "left",
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: screenWidth - 30,
  },
  overlayView: {
    position: "absolute",
    top: 10, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Example background color with transparency
    padding: 10,
    height: 150,
    borderRadius: 10,
  },
  inVisibleDisplay: {
    display: "none",
  },
});

const styles2 = StyleSheet.create({
  justifyContent: "row",
});

const styles3 = StyleSheet.create({
  ToStyle: {
    backgroundColor: "#8000FF",
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },
  ToTextStyle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default AddParty;
