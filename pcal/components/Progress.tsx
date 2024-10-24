import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import AddWeight from "../components/AddWeight";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  calculateCalorieLimit,
  CalorieResults,
  ProfileState,
} from "../utils/calorieUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setProfileComplete } from "../store/store";

interface WeightEntry {
  weight: number;
  date: Date;
}

interface WeightData {
  entries: WeightEntry[];
  lastUpdated: Date;
}

const Progress: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [weightGoal, setWeightGoal] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [calorieLimit, setCalorieLimit] = useState<CalorieResults | null>(null);
  const [modalVisible, setVisibleModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch weight data
      const storedWeightData = await AsyncStorage.getItem("weightData");
      if (storedWeightData) {
        const parsedData: WeightData = JSON.parse(storedWeightData);
        setWeightData(parsedData.entries);
      }

      // Fetch other data
      const storedWeightGoal = await AsyncStorage.getItem("weightGoal");
      const storedDuration = await AsyncStorage.getItem("duration");
      const profileStateJson = await AsyncStorage.getItem("profileState");

      if (storedWeightGoal) setWeightGoal(storedWeightGoal);
      if (storedDuration) setDuration(storedDuration);

      if (profileStateJson) {
        const profileState: ProfileState = JSON.parse(profileStateJson);
        const calculatedCalorieLimit = calculateCalorieLimit(profileState);
        setCalorieLimit(calculatedCalorieLimit);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (newEntry: WeightEntry) => {
    try {
      // Get existing data
      const storedWeightData = await AsyncStorage.getItem("weightData");
      console.log(storedWeightData);
      let weightData: WeightData;

      if (storedWeightData) {
        weightData = JSON.parse(storedWeightData);
        weightData.entries.push(newEntry);
      } else {
        weightData = {
          entries: [newEntry],
          lastUpdated: new Date(),
        };
      }

      // Sort entries by date
      weightData.entries.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Update AsyncStorage for weight data
      await AsyncStorage.setItem("weightData", JSON.stringify(weightData));

      // Update profileState with the latest weight
      const profileStateJson = await AsyncStorage.getItem("profileState");
      if (profileStateJson) {
        const profileState: ProfileState = JSON.parse(profileStateJson);
        profileState.weight = String(newEntry.weight);

        console.log(profileState);

        // Update AsyncStorage for profile state
        await AsyncStorage.setItem(
          "profileState",
          JSON.stringify(profileState)
        );

        dispatch(
          setProfileComplete({ ...profile, weight: profileState.weight })
        );

        // Recalculate calorie limit with updated weight
        const calculatedCalorieLimit = calculateCalorieLimit(profileState);
        setCalorieLimit(calculatedCalorieLimit);
      }

      // Update state
      setWeightData(weightData.entries);

      // Close modal
      handleCloseModal();
    } catch (error) {
      console.error("Error saving weight data:", error);
    }
  };

  const formatChartData = (entries: WeightEntry[]) => {
    return entries.map((entry) => ({
      value: entry.weight,
      // date: new Date(entry.date).toLocaleDateString(),
    }));
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <LineChart maxValue={150} data={formatChartData(weightData)} />
      </ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          onPress={handleOpenModal}
          style={styles.addWeightButton}
        >
          <Text style={{ color: "white" }}>Add weight</Text>
        </TouchableOpacity>
        <AddWeight
          isVisible={modalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </View>
      <Text style={styles.titleValue}>Your Goal</Text>
      <Text>{weightGoal} kg</Text>
      <Text style={styles.titleValue}>Duration Left</Text>
      <Text>{duration} weeks</Text>
      <Text style={styles.titleValue}>Calorie limit per day</Text>
      <Text>
        {calorieLimit ? `${calorieLimit.dailyLimit} Cal` : "Calculating..."}
      </Text>
      <Text style={styles.titleValue}>Calorie limit per meal</Text>
      <Text>
        {calorieLimit ? `${calorieLimit.mealLimit} Cal` : "Calculating..."}
      </Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    padding: 30,
    paddingBottom: 30,
    marginVertical: 40,
    marginHorizontal: "auto",
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleValue: {
    fontSize: 16,
    marginTop: 10,
  },

  addWeightButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#66C6A8",
    borderRadius: 50,
    width: 200,
    height: 40,
  },
});
