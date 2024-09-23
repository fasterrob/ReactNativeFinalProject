import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";
import NavBanner from "../components/NavBanner";
import CalorieGoldPerDay from "../components/CalorieGoldPerDay";
import IngredientsForm from "../components/IngredientsForm";

const IngredientsCalculatorScreen = () => {
  return (
    <>
      <NavBanner page={"ingredients"} />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <CalorieGoldPerDay />
          <IngredientsForm />
        </ScrollView>
      </View>
    </>
  );
};

export default IngredientsCalculatorScreen;
