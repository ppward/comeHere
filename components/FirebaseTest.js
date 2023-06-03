import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // 로그인 버튼을 눌렀을 때의 동작을 구현합니다.
    // 여기에서는 간단하게 입력한 사용자명과 비밀번호를 출력하는 예시를 보여줍니다.
    console.log("사용자명:", username);
    console.log("비밀번호:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="사용자명"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="로그인" onPress={handleLogin} />
      </View>
    </View>
  );
}

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
});
