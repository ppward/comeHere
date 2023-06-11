import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Auth = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSingUp, setIsSignUp] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
    return unsubscribe;
  }, []);

  const signUp = async () => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
  };
  const signIn = async () => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result != null) {
      props.navigation.navigate("MainScreen");
    }
  };

  const handleLogin = () => {
    // 로그인 버튼을 눌렀을 때의 동작을 구현합니다.
    // 여기에서는 간단하게 입력한 사용자명과 비밀번호를 출력하는 예시를 보여줍니다.
    console.log("사용자명:", username);
    console.log("비밀번호:", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="사용자명"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={signIn} style={styles.btnStyle}>
            <Text style={styles.fontStyle}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signUp} style={styles.btnStyle}>
            <Text style={styles.fontStyle}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "80%",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  btnStyle: {
    justifyContent: "center",
    backgroundColor: "#8000FF",
    borderRadius: 20,
    width: 100,
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

export default Auth;
