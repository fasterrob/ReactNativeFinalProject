import { View, Text, TextInput, ScrollView, Image } from "react-native";
import styles from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import BMI from "../component/BMI";
import NavBanner from "../components/NavBanner";

const CaloriePlanScreen = () => {
  return (
    <>
        <NavBanner page="calorie" />
        <BMI />
    </>

    // <SafeAreaView style={styles.backgroundBMI}>
    //   <ScrollView style={styles.scrollView}>
    //     <View style={{flex:1}}>
    //       <View style={styles.logoContainerBMI}>
    //         <Image source={require("../assets/logo.png")} />
    //       </View>
    //       <Text style={styles.caloriePlanText}>CALORIE PLAN</Text>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default CaloriePlanScreen;
