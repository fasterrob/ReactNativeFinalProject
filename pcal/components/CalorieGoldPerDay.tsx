import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Circle } from "react-native-svg";

interface ProfileState {
  height: string;
  weight: string;
  age: string;
  gender: "male" | "female";
  activityLevel:
    | "sedentary"
    | "lightly active"
    | "moderately active"
    | "very active"
    | "extra active";
}

interface Results {
  dailyLimit: number;
  mealLimit: number;
  remainingCalories: number;
}

const CalorieGoldPerDay: React.FC = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    calculateCalorieLimits();
  }, []);

  const calculateCalorieLimits = async () => {
    try {
      const profileStateJson = await AsyncStorage.getItem("profileState");
      if (profileStateJson) {
        const profileState: ProfileState = JSON.parse(profileStateJson);
        const { height, weight, age, gender, activityLevel } = profileState;

        const heightCm = parseFloat(height);
        const weightKg = parseFloat(weight);
        const ageYears = parseInt(age, 10);

        let bmr: number;
        if (gender === "male") {
          bmr =
            88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears;
        } else {
          bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears;
        }

        const activityMultipliers: Record<
          ProfileState["activityLevel"],
          number
        > = {
          sedentary: 1.2,
          "lightly active": 1.375,
          "moderately active": 1.55,
          "very active": 1.725,
          "extra active": 1.9,
        };

        const dailyLimit = Math.round(
          bmr * activityMultipliers["moderately active"]
        );
        const mealLimit = Math.round(dailyLimit / 3);

        // For this example, let's assume the user has consumed 500 calories
        const consumedCalories = 1200;
        const remainingCalories = dailyLimit - consumedCalories;

        setResults({ dailyLimit, mealLimit, remainingCalories });
      } else {
        console.error("Profile state not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error calculating calorie limits:", error);
    } finally {
      setLoading(false);
    }
  };

  const CircularProgress: React.FC<{ percentage: number }> = ({
    percentage,
  }) => {
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#2AB793"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {results ? (
        <View style={styles.results}>
          <Text style={styles.goalText}>Your Goal</Text>
          <View style={styles.contentContainer}>
            <View style={styles.circularProgressContainer}>
              <CircularProgress
                percentage={
                  (results.remainingCalories / results.dailyLimit) * 100
                }
              />
              <View style={styles.calorieInfo}>
                <Text style={styles.remainingCalories}>
                  {results.remainingCalories} Cal
                </Text>
                <Text style={styles.caloriesLabel}>Remaining</Text>
              </View>
            </View>
            <View style={styles.limitContainer}>
              <Text style={styles.resultText}>
                Daily Limit: {results.dailyLimit} Cal
              </Text>
              <Text style={styles.resultText}>
                Per-meal Limit: {results.mealLimit} Cal
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>
          Unable to calculate calorie limits. Please check your profile data.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  results: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalText: {
    fontSize: 30,
    alignSelf: "flex-start",
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  circularProgressContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  calorieInfo: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  remainingCalories: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2AB793",
  },
  caloriesLabel: {
    fontSize: 14,
    color: "#666",
  },
  limitContainer: {
    flex: 1,
    gap: 20,
    marginLeft: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 20,
  },
});

export default CalorieGoldPerDay;
