import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularProgress from "./CircularProgress";
import {
  calculateCalorieLimit,
  type CalorieResults,
  type ProfileState,
} from "../utils/calorieUtils";

const CalorieGoldPerDay: React.FC<{ onUpdate: number }> = ({ onUpdate }) => {
  const [results, setResults] = useState<CalorieResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredResults();
  }, [onUpdate]);

  const loadStoredResults = async () => {
    try {
      const storedResults = await AsyncStorage.getItem("calorieResults");

      const storedResultsJSON = JSON.parse(storedResults);
      if (storedResultsJSON.dailyLimit) {
        setResults(storedResultsJSON);
      } else {
        calculateCalorieLimits();
      }
    } catch (error) {
      console.error("Error loading stored results:", error);
      calculateCalorieLimits();
    } finally {
      setLoading(false);
    }
  };

  const calculateCalorieLimits = async () => {
    try {
      const profileStateJson = await AsyncStorage.getItem("profileState");
      if (profileStateJson) {
        const profileState: ProfileState = JSON.parse(profileStateJson);
        const newResults = calculateCalorieLimit(profileState);

        await AsyncStorage.setItem(
          "calorieResults",
          JSON.stringify(newResults)
        );
        setResults(newResults);
      } else {
        console.error("Profile state not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error calculating calorie limits:", error);
    } finally {
      setLoading(false);
    }
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

export default CalorieGoldPerDay;

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
