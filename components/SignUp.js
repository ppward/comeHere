import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import * as EmailValidator from "email-validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  query,
  where,
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SignUp(props) {
  const [email, setEmail] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setpasswordConfirm] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [nicknameError, setNicknameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmError, setConfirmError] = React.useState("");
  const [ageError, setAgeError] = React.useState("");
  const [genderError, setGenderError] = React.useState("");

  const validateEmail = () => {
    if (!EmailValidator.validate(email)) {
      setEmailError("Email 주소를 입력하세요");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validateNickname = () => {
    if (nickname === "") {
      setNicknameError("닉네임을 입력하지 않았습니다");
      return false;
    } else {
      setNicknameError("");
    }
    return true;
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    const reservedWords = ["password", "123456", "qwerty"];

    let violatedRules = [];

    if (reservedWords.includes(password.toLowerCase())) {
      violatedRules.push("Password must not contain common reserved words");
      return false;
    } else if (password.length < 6) {
      violatedRules.push("비밀번호는최소 6자리 이상이어야 합니다");
      return false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      violatedRules.push(
        "비밀번호는 최소한 한개 이상의 소문자를 사용해야합니다"
      );
      return false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      violatedRules.push(
        "비밀번호는 최소한 한개 이상의 대문자를 사용해야합니다"
      );
      return false;
    } else if (!/(?=.*\d)/.test(password)) {
      violatedRules.push(
        "비밀번호는 최소한 한개 이상의 숫자를 사용해야 합니다"
      );
      return false;
    } else if (!/(?=.*[^a-zA-Z0-9])/.test(password)) {
      violatedRules.push(
        "비밀번호는 최소한 한개 이상의 특수문자를 사용해야 합니다"
      );
      return false;
    } else {
      return true;
    }

    if (violatedRules.length > 0) {
      setPasswordError(violatedRules.join(", "));
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one special character"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirm = () => {
    if (password !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      setConfirmError("");
      return true;
    }
  };
  const validateAge = () => {
    if (age == 0) {
      setAgeError("나이를 입력하세요");
      return false;
    } else if (isNaN(age)) {
      setAgeError("숫자를 입력해주세요");
      return false;
    } else {
      setAgeError("");
      return true;
    }
  };
  const validateGender = () => {
    if (gender === "") {
      setGenderError("성별을 선택해주세요");
      return false;
    } else {
      setGenderError("");
      return true;
    }
  };
  // const signUp = async () => {
  //   const result = await createUserWithEmailAndPassword(auth, email, password);
  //   console.log(result);
  // };
  const handleLogin = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        const { uid, email } = user;

        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await addDoc(userRef, { uid, email, nickname, age, gender });
          console.log("User information saved to Firestore");
        } else {
          console.log("User document already exists in Firestore");
        }
      }
    } catch (error) {
      console.error("Error logging in and saving user information:", error);
    }
  };
  const pressDone = () => {
    const checkEmail = validateEmail();
    const checkNivkname = validateNickname();
    const checkPassword = validatePassword();
    const checkConfirm = validateConfirm();
    const checkAge = validateAge();
    const checkGender = validateGender();

    if (
      checkEmail &&
      checkNivkname &&
      checkPassword &&
      checkConfirm &&
      checkAge &&
      checkGender === true
    ) {
      alert("회원가입이 완료되었습니다");
      props.navigation.navigate("지도");
      handleLogin();
    }
  };

  //if(email!=null && password!=null&&passwordConfirm!=null && age !=null && gender !=null)

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="nickname"
        placeholderTextColor="#c1c1c1"
        maxLength={12}
        value={nickname}
        onChangeText={setNickname}
      />
      {nicknameError ? (
        <Text style={nicknameError ? styles.errorText : styles.checkText}>
          {nicknameError}
        </Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#c1c1c1"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? (
        <Text style={emailError ? styles.errorText : styles.checkText}>
          {emailError}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#c1c1c1"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="password confirm"
        placeholderTextColor="#c1c1c1"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setpasswordConfirm}
      />
      {confirmError ? (
        <Text style={styles.errorText}>{confirmError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="age"
        placeholderTextColor="#c1c1c1"
        maxLength={3}
        keyboardType="number-pad"
        returnKeyType={"done"}
        value={age}
        onChangeText={setAge}
      />
      {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "남자" ? styles.activeGenderButton : styles.genderButton,
          ]}
        >
          <Text style={styles.buttonText} onPress={() => setGender("남자")}>
            남자
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "여자" ? styles.activeGenderButton : styles.genderButton,
          ]}
          onPress={() => {
            setGender("여자");
          }}
        >
          <Text style={styles.buttonText}>여자</Text>
        </TouchableOpacity>
      </View>
      {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
      <TouchableOpacity onPress={() => pressDone()}>
        <Text style={styles.genderButton}>회원가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
}
//disabled ={(email!=null && password!=null&&passwordConfirm!=null && age !=null && gender !=null)? false:true}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "lightpurple",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: "lightpurple",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  genderButton: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  activeGenderButton: {
    backgroundColor: "purple",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  checkText: {
    display: "none",
  },
});
