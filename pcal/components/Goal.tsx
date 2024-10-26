import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import CaloriePlanSubmit from "../components/CaloriePlanSubmit";

const Goal = () => {
  const [modalVisible, setVisibleModal] = useState(false);
  const [weightGoal, setWeightGoal] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    // Load saved data when the component mounts
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedWeightGoal = await AsyncStorage.getItem("weightGoal");
      const savedDuration = await AsyncStorage.getItem("duration");
      if (savedWeightGoal !== null) {
        setWeightGoal(savedWeightGoal);
      }
      if (savedDuration !== null) {
        setDuration(savedDuration);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("weightGoal", weightGoal);
      await AsyncStorage.setItem("duration", duration);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const handleOpenModal = () => {
    saveData();
    setVisibleModal(true);
  };

  const handleWeightGoalChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setWeightGoal(numericValue);
  };

  const handleDurationChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setDuration(numericValue);
  };

  return (
    <View style={styles.containerGoal}>
      <Text style={styles.titleBMI}>Your Goal</Text>
      <Text style={styles.fontBMI}>Weight Goal</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#dedede",
          height: 40,
          paddingLeft: 10,
        }}
        placeholder="Enter your weight goal"
        keyboardType="numeric"
        value={weightGoal}
        onChangeText={handleWeightGoalChange}
      />
      <Text style={styles.fontBMI}>Duration (Week)</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "#dedede",
          height: 40,
          paddingLeft: 10,
        }}
        placeholder="Enter duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={handleDurationChange}
      />
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#66C6A8",
            borderRadius: 50,
            width: 100,
            height: 40,
          }}
        >
          <Text style={{ color: "white" }}>SUBMIT</Text>
        </TouchableOpacity>
        <CaloriePlanSubmit
          isVisible={modalVisible}
          onClose={handleCloseModal}
        />
      </View>
    </View>
  );
};

export default Goal;
