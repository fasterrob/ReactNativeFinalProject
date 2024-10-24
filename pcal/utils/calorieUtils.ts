// src/utils/calorieUtils.ts

export interface ProfileState {
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

export interface CalorieResults {
  dailyLimit: number;
  mealLimit: number;
  remainingCalories: number;
}

export const ACTIVITY_MULTIPLIERS: Record<
  ProfileState["activityLevel"],
  number
> = {
  sedentary: 1.2,
  "lightly active": 1.375,
  "moderately active": 1.55,
  "very active": 1.725,
  "extra active": 1.9,
};

/**
 * Calculates BMR (Basal Metabolic Rate) using the Harris-Benedict equation
 * @param weight Weight in kg
 * @param height Height in cm
 * @param age Age in years
 * @param gender 'male' or 'female'
 * @returns BMR in calories
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): number => {
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
};

/**
 * Calculates daily calorie limit based on profile state
 * @param profileState User's profile information
 * @returns Daily calorie limit in calories
 */
export const calculateCalorieLimit = (
  profileState: ProfileState
): { dailyLimit: number; mealLimit: number; remainingCalories: number } => {
  const { height, weight, age, gender } = profileState;

  const heightCm = parseFloat(height);
  const weightKg = parseFloat(weight);
  const ageYears = parseInt(age, 10);

  // Calculate BMR
  const bmr = calculateBMR(weightKg, heightCm, ageYears, gender);

  // Calculate daily limit based on activity level
  const dailyLimit = Math.round(
    bmr * ACTIVITY_MULTIPLIERS["moderately active"]
  );

  const mealLimit = Math.round(dailyLimit / 3);

  return { dailyLimit, mealLimit, remainingCalories: dailyLimit };
};

/**
 * Calculates per-meal calorie limit
 * @param dailyLimit Total daily calorie limit
 * @param meals Number of meals per day (default: 3)
 * @returns Calories per meal
 */
export const calculateMealLimit = (
  dailyLimit: number,
  meals: number = 3
): number => {
  return Math.round(dailyLimit / meals);
};

/**
 * Calculates remaining calories for the day
 * @param dailyLimit Total daily calorie limit
 * @param consumedCalories Calories consumed so far
 * @returns Remaining calories
 */
export const calculateRemainingCalories = (
  dailyLimit: number,
  consumedCalories: number
): number => {
  return Math.max(0, dailyLimit - consumedCalories);
};

/**
 * Calculates calorie burn percentage for the day
 * @param dailyLimit Total daily calorie limit
 * @param remainingCalories Remaining calories
 * @returns Percentage of calories remaining
 */
export const calculateCaloriePercentage = (
  dailyLimit: number,
  remainingCalories: number
): number => {
  return (remainingCalories / dailyLimit) * 100;
};
