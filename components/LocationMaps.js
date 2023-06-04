import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps"; //지도호출하는
import { PROVIDER_GOOGLE } from "react-native-maps"; //구글 지도로 변환하는 PROVIDER
import * as Location from "expo-location";
import Icons from "assets";

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

const RenderScreen = (lat, long, props) => {
  // 지도화면을 구성하는 함수

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} //지도를 구글지도로 변경
        style={styles.map} //스타일 맵으로 변경
        region={{
          //화면에 표시되는 위치정보
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true} //현재 위치로 이동하는 버튼
        onUserLocationChange={setUserLocation(lat, long)} // showMyLocationButton을 눌렀을 때 이동하는 이벤트핸들러
        followsUserLocation={true} // 애플지도에서 작동하는 화면을 현재위치 정보로 이동하게 하는 기능을 함 *구글에서는 동작하지 않기 때문에 쓸모없다.
        showsUserLocation={true} // 현재 사용자의 위치를 보여주는 아이콘(파란색 점)
        showsCompass={true} //잘모르겠음
        chacheEnabled={false} // 잘모르겠음
        zoomEnabled={true} //줌 가능여부 같음
      ></MapView>
    </View>
  );
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
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        provider={PROVIDER_GOOGLE} //지도를 구글지도로 변경
        style={styles.map} //스타일 맵으로 변경
        region={{
          //화면에 표시되는 위치정보
          latitude: locate[0],
          longitude: locate[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true} //현재 위치로 이동하는 버튼
        onUserLocationChange={setUserLocation(locate[0], locate[1])} // showMyLocationButton을 눌렀을 때 이동하는 이벤트핸들러
        followsUserLocation={true} // 애플지도에서 작동하는 화면을 현재위치 정보로 이동하게 하는 기능을 함 *구글에서는 동작하지 않기 때문에 쓸모없다.
        showsUserLocation={true} // 현재 사용자의 위치를 보여주는 아이콘(파란색 점)
        showsCompass={true} //잘모르겠음
        chacheEnabled={false} // 잘모르겠음
        zoomEnabled={true} //줌 가능여부 같음
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddParty");
          }}
          style={styles.button}
        >
          <Image source={Icons.PLUS} style={styles.icon}></Image>
        </TouchableOpacity>
      </MapView>
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
    width: "100%",
    height: "100%",
  },
  button: {
    width: 50,
    height: 50,
    marginTop: "155%",
    marginLeft: "3%",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    lineHeight: 3,
    borderWidth: "0.5px",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
