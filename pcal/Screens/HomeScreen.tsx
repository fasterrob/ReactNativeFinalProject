import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.circle} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("../assets/Avatar.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CaloriePlan")}
          >
            <Image source={require("../assets/calendar.png")} />
            <Text style={styles.buttonText}>CALORIE PLAN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("IngredientsCalculator")}
          >
            <Image source={require("../assets/calculator.png")} />
            <View>
              <Text style={styles.buttonText}>INGREDIENTS</Text>
              <Text style={styles.buttonText}>CALCULATOR</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
