import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,

} from "react-native";
// import styles from "../styles/styles";
import React from "react";

const BMI = () => {
  return (
    // <SafeAreaView style={styles.backgroundBMI}>
    //   <View style={styles.headerBMI}></View>
    //   <View style={styles.circleBMI} />
    //     <View style={styles.containerBMI}>
    //       <View>
    //         <Text style={styles.titleBMI}>Your BMI/BMR</Text>
    //         <Text style={styles.fontBMI}>BMI</Text>
    //         <TextInput style={styles.textBox} placeholder="Value"></TextInput>
    //         <Text style={styles.fontBMI}>BMR</Text>
    //         <TextInput style={styles.textBox} placeholder="Value"></TextInput>
    //       </View>
    //     </View>
    // </SafeAreaView>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>


      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Item 1</Text>
        <Text style={styles.text}>Item 2</Text>
        <Text style={styles.text}>Item 3</Text>

      </ScrollView>


          <View style={styles.footer}>
            <Text style={styles.footerText}>Footer</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BMI;

const styles = StyleSheet.create({
  container: {

    height: '100%'
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 16,
  },
});
