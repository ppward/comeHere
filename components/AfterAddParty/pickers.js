import { useState, useEffect, useRef } from "react";
import { Picker } from "@react-native-picker/picker";

const [pickerValue, setPickerValue] = useState("1");
const pickers = () => {
  return (
    <View>
      <Picker
        selectedValue={pickerValue}
        onValueChange={(item) => setPickerValue(item)}
      >
        <Picker.Item label="라벨_1" value="1" />
        <Picker.Item label="라벨_2" value="2" />
        <Picker.Item label="라벨_3" value="3" />
      </Picker>
      <View>
        <Text>{pickerValue}</Text>
      </View>
    </View>
  );
};

export default pickers;
