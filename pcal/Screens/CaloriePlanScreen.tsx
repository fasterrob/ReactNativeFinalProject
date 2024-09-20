import { View, Text } from "react-native";
import styles from "../styles/styles";
import NavBanner from "../components/NavBanner";
const CaloriePlanScreen = () => {
  return (
    <>
      <NavBanner page="calorie"/>
      <View style={styles.screen}>
        <Text>Calorie Plan Screen</Text>
      </View>
    </>
  );
};

export default CaloriePlanScreen;
