import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

interface BMIProps {
  bmiValue?: string;
  bmrValue?: string;
}

const BMI: React.FC<BMIProps> = ({ bmiValue = "23", bmrValue = "1500" }) => {
  return (
    <View style={styles.containerBMI}>
      <Text style={styles.titleBMI}>Your BMI/BMR</Text>
      <Text style={styles.fontBMI}>
        BMI <Text style={{ fontSize: 10 }}>( Body Mass Index )</Text>
      </Text>
      <Text style={styles.textBox}>{bmiValue}</Text>
      <Text style={styles.fontBMI}>
        BMR <Text style={{ fontSize: 10 }}>( Basal Metabolic Rate )</Text>
      </Text>
      <Text style={styles.textBox}>{bmrValue}</Text>
    </View>
  );
};

export default BMI;
