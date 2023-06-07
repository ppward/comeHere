import React from "react"; // 리액트 호출
import { TouchableOpacity, Text, StyleSheet } from "react-native"; // 리액트 네이티브에서 제공하는 컴포넌트 추가

const customBtn = (props) => {
  return (
    <TouchableOpacity
      onPrees={() => {
        props.navigation.navigate("DefineParty");
      }}
      style={btnStyle.btnStyle}
    >
      <Text style={btnStyle.btnTextStyle}>다음</Text>
    </TouchableOpacity>
  );
};

const btnStyle = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#8000FF",
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },
  btnTextStyle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});

export default customBtn;
