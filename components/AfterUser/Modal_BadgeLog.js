import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";

export default function Modal_BadgeLog() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        isModalVisible(!isModalVisible);
        console.log("modal appearance");
      }}
    >
      <Text>Modal is appearance!</Text>
      <Pressable
        onPress={() => {
          Alert.alert("Modal", "모달이 나타남...");
        }}
      >
        <Text>View Alert!</Text>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  styl: {
    justifyContent: "space-between",
  },
});
