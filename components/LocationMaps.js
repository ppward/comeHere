import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps"; //지도호출하는
import { PROVIDER_GOOGLE, Marker } from "react-native-maps"; //구글 지도로 변환하는 PROVIDER
import * as Location from "expo-location";
import Icons from "assets";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";

const setUserLocation = (lat, long) => {
  //사용자의 위치를 저장(json 키로 변경하는 함수)
  const setState = {
    userLocation: {
      latitude: lat, //props의 위도저장
      longitude: long, // props의 경도저장
      latitudeDelta: 0.025, //맵의 dgree? 를 표시하는 값이라는데...
      longitudeDelta: 0.025,
    },
  };
};
const defaultRegion = {
  latitude: 36.7997761,
  longitude: 127.0748502,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
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
const LocationMaps = (props) => {
  //컴포넌트의 메인 리턴
  let locate = GetLocation(); //위의 위치정보 받아오는 함수 선언
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [data, setData] = useState([]); // 데이터 배열 상태

  const [locations, setLocations] = useState([]); // location 데이터를 저장할 배열

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "party")); // 가져올 컬렉션 경로 설정
      const fetchedLocations = []; // 가져온 데이터를 임시로 저장할 배열

      querySnapshot.forEach((doc) => {
        const location = doc.data().location; // location 데이터 가져오기
        fetchedLocations.push(location); // 배열에 추가
      });

      setLocations(fetchedLocations); // useState를 사용하여 배열에 데이터 저장
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };
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

      setQuery(`${result.formatted_address}${result.name}`);
      setSelectedPlace({ ...prediction, lat, lng });
    } catch (error) {
      console.log(error);
    }
  };
  const getMapViewRegion = () => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      return {
        latitude: selectedPlace.lat,
        longitude: selectedPlace.lng,
        latitudeDelta: defaultRegion.latitudeDelta,
        longitudeDelta: defaultRegion.longitudeDelta,
      };
    }
    return defaultRegion;
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        ))}
      </MapView>
      <View style={{ position: "absolute", top: "75%", left: 10 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("파티 생성하기");
          }}
          style={styles.button}
        >
          <Image source={Icons.PLUS} style={styles.icon}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationMaps; //export

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  predictionsContainer: {
    maxHeight: 120,
    overflow: "scroll",
  },
  button: {
    width: 50,
    height: 50,
    marginTop: "158%",
    marginLeft: "3%",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: "0.5px",
    backgroundColor: "white",
    justifyContent: "ceneta",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
