import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import styles from "../styles/styles";
import BMI from "../components/BMI";
import NavBanner from "../components/NavBanner";
import Goal from "../components/Goal";
import { RootState } from "../store/store"; // Assuming you have a types file

const CaloriePlanScreen = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [bmi, setBMI] = useState<number>(0);
  const [bmr, setBMR] = useState<number>(0);

  useEffect(() => {
    if (profile.height && profile.weight) {
      const heightInMeters = parseFloat(profile.height) / 100;
      const weightInKg = parseFloat(profile.weight);
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
      setBMI(parseFloat(calculatedBMI.toFixed(1)));
    }

    if (profile.age && profile.height && profile.weight && profile.gender) {
      let calculatedBMR: number;
      const weight = parseFloat(profile.weight);
      const height = parseFloat(profile.height);
      const age = parseInt(profile.age);

      if (profile.gender.toLowerCase() === "male") {
        calculatedBMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        calculatedBMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }

      setBMR(Math.round(calculatedBMR));
    }
  }, [profile]);

  return (
    <>
      <NavBanner page="calorie" />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <BMI bmiValue={bmi.toString()} bmrValue={bmr.toString()} />
          <Goal />
        </ScrollView>
      </View>
    </>
  );
};

export default CaloriePlanScreen;
