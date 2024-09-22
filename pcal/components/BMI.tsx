import {
  View,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import styles from "../styles/styles";
import React from "react";

const BMI = () => {
  return (
    <View style={styles.containerBMI}>
      <Text style={styles.titleBMI}>Your BMI/BMR</Text>
      <Text style={styles.fontBMI}>BMI</Text>
      <TextInput editable={false} style={styles.textBox} placeholder="-" />
      <Text style={styles.fontBMI}>BMR</Text>
      <TextInput editable={false} style={styles.textBox} placeholder="-" />
    </View>
  );
};

export default BMI;