import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";
import NavBanner from "../components/NavBanner";
import CalorieGoldPerDay from "../components/CalorieGoldPerDay";
import IngredientsForm from "../components/IngredientsForm";
import { useState } from "react";

const IngredientsCalculatorScreen = () => {
  const [updateCounter, setUpdateCounter] = useState(0);
  const ingredientUpdate = () => {
    setUpdateCounter((prev) => prev + 1);
  };
  return (
    <>
      <NavBanner page={"ingredients"} />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <CalorieGoldPerDay onUpdate={updateCounter} />
          <IngredientsForm onUpdate={ingredientUpdate} />
        </ScrollView>
      </View>
    </>
  );
};

export default IngredientsCalculatorScreen;
