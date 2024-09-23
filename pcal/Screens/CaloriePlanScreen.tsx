import { View, Text, TextInput, ScrollView, Image } from "react-native";
import styles from "../styles/styles";
import BMI from "../components/BMI";
import NavBanner from "../components/NavBanner";
import Goal from "../components/Goal";

const CaloriePlanScreen = () => {
  return (
    <>
      <NavBanner page="calorie" />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <BMI />
          <Goal />
        </ScrollView>
      </View>
    </>
  );
};

export default CaloriePlanScreen;
