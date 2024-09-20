import { View, Text } from "react-native";
import styles from "../styles/styles";
import NavBanner from "../components/NavBanner";

const IngredientsCalculatorScreen = () => {
  return (
    <>
      <NavBanner page={"ingredients"}/>
      <View style={styles.screen}>
        <Text>Ingredients Calculator Screen</Text>
      </View>
    </>
  );
};

export default IngredientsCalculatorScreen;
