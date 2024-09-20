import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native'
import styles from "../styles/styles";
import React from 'react'

const BMI = () => {
  return (
    <SafeAreaView style={styles.backgroundBMI}>
    <View style={styles.headerBMI}></View>
    <View style={styles.circleBMI} />
    <View style={styles.containerBMI}>
      <Text style={styles.titleBMI}>Your BMI/BMR</Text>
      <Text style={styles.fontBMI}>BMI</Text>
      <TextInput style={styles.textBox} placeholder="Value"></TextInput>
      <Text style={styles.fontBMI}>BMR</Text>
      <TextInput style={styles.textBox} placeholder="Value"></TextInput>
    </View>
  </SafeAreaView>
  // <SafeAreaView style={styles.backgroundBMI}>
    
  // </SafeAreaView>
  )
}

export default BMI