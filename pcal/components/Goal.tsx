import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

interface GoalProps {}

const Goal: React.FC<GoalProps> = () => {
  const [weightGoal, setWeightGoal] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadWeightGoal();
  }, []);

  const loadWeightGoal = async () => {
    try {
      const savedWeightGoal = await AsyncStorage.getItem("weightGoal");
      if (savedWeightGoal !== null) {
        setWeightGoal(savedWeightGoal);
      }
    } catch (error) {
      console.error("Error loading weight goal:", error);
    }
  };

  const saveWeightGoal = async (goal: string) => {
    try {
      await AsyncStorage.setItem("weightGoal", goal);
    } catch (error) {
      console.error("Error saving weight goal:", error);
    }
  };

  const handleSubmit = () => {
    if (weightGoal) {
      saveWeightGoal(weightGoal);
      setIsModalVisible(true);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || targetDate;
    setShowDatePicker(false);
    setTargetDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Goal</Text>

      <Text style={styles.label}>Weight Goal (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight goal"
        keyboardType="numeric"
        value={weightGoal}
        onChangeText={setWeightGoal}
      />

      <Text style={styles.label}>Target Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{targetDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={targetDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Goal Submitted</Text>
            <Text style={styles.modalText}>
              Your weight goal of {weightGoal} kg by {targetDate.toDateString()}{" "}
              has been set.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                navigation.navigate("IngredientsCalculator" as never)
              }
            >
              <Text style={styles.buttonText}>Go to ingredient calculator</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "80%",
    marginVertical: 30,
    marginHorizontal: "auto",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#66C6A8",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#66C6A8",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default Goal;
