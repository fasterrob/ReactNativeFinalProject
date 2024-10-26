import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface IngredientData {
  [key: string]: {
    [unit: string]: NutritionInfo;
  };
}

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  unitOptions: { [key: string]: string };
}

const ingredientData: IngredientData = {
  คาร์โบไฮเดรต: {
    ข้าวสวย: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    ข้าวกล้อง: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    เส้นหมี่: { calories: 109, protein: 2.1, carbs: 24, fat: 0.2 },
    บะหมี่: { calories: 138, protein: 4.5, carbs: 25, fat: 2.1 },
    วุ้นเส้น: { calories: 108, protein: 0.2, carbs: 25.5, fat: 0.1 },
  },
  เนื้อสัตว์: {
    วัว: { calories: 250, protein: 26, carbs: 0, fat: 17 },
    หมู: { calories: 242, protein: 27, carbs: 0, fat: 14 },
    ไก่: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  },
  ผัก: {
    ผักชี: { calories: 23, protein: 2.1, carbs: 3.7, fat: 0.5 },
    ผักกาดขาว: { calories: 16, protein: 1.2, carbs: 3.2, fat: 0.2 },
    แครอท: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  },
  ผลไม้: {
    กล้วย: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    แอปเปิ้ล: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    ส้ม: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  },
  เครื่องปรุง: {
    น้ำปลา: { calories: 10, protein: 2, carbs: 0, fat: 0 },
    น้ำมันพืช: { calories: 884, protein: 0, carbs: 0, fat: 100 },
    ซอสถั่วเหลือง: { calories: 53, protein: 8, carbs: 3, fat: 2 },
  },
};

function calculateNutrition(ingredients: Ingredient[]): NutritionInfo {
  const totalNutrition: NutritionInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  ingredients.forEach((ingredient) => {
    if (
      ingredientData[ingredient.name] &&
      ingredientData[ingredient.name][ingredient.unit]
    ) {
      const quantity = parseFloat(ingredient.quantity) || 0;
      const nutritionPer100g = ingredientData[ingredient.name][ingredient.unit];

      const factor = quantity / 100; // Convert to 100g basis

      totalNutrition.calories += nutritionPer100g.calories * factor;
      totalNutrition.protein += nutritionPer100g.protein * factor;
      totalNutrition.carbs += nutritionPer100g.carbs * factor;
      totalNutrition.fat += nutritionPer100g.fat * factor;
    }
  });
  // Round the results to 1 decimal place
  return {
    calories: Math.round(totalNutrition.calories * 10) / 10,
    protein: Math.round(totalNutrition.protein * 10) / 10,
    carbs: Math.round(totalNutrition.carbs * 10) / 10,
    fat: Math.round(totalNutrition.fat * 10) / 10,
  };
}

const IngredientsForm: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      name: "คาร์โบไฮเดรต",
      quantity: "",
      unit: "ข้าวสวย",
      unitOptions: {
        ข้าวสวย: "ข้าวสวย",
        ข้าวกล้อง: "ข้าวกล้อง",
        เส้นหมี่: "เส้นหมี่",
        บะหมี่: "บะหมี่",
        วุ้นเส้น: "วุ้นเส้น",
      },
    },
    {
      name: "เนื้อสัตว์",
      quantity: "",
      unit: "วัว",
      unitOptions: { วัว: "วัว", หมู: "หมู", ไก่: "ไก่" },
    },
    {
      name: "ผัก",
      quantity: "",
      unit: "ผักชี",
      unitOptions: { ผักชี: "ผักชี", ผักกาดขาว: "ผักกาดขาว", แครอท: "แครอท" },
    },
    {
      name: "ผลไม้",
      quantity: "",
      unit: "กล้วย",
      unitOptions: { กล้วย: "กล้วย", แอปเปิ้ล: "แอปเปิ้ล", ส้ม: "ส้ม" },
    },
    {
      name: "เครื่องปรุง",
      quantity: "",
      unit: "น้ำปลา",
      unitOptions: {
        น้ำปลา: "น้ำปลา",
        น้ำมันพืช: "น้ำมันพืช",
        ซอสถั่วเหลือง: "ซอสถั่วเหลือง",
      },
    },
  ]);

  const [totalNutrition, setTotalNutrition] = useState<NutritionInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleQuantityChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].quantity = text;
    setIngredients(updatedIngredients);
  };

  const handleUnitChange = (itemValue: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].unit = itemValue;
    setIngredients(updatedIngredients);
  };

  const handleCalculate = async () => {
    try {
      const nutrition = calculateNutrition(ingredients);
      const result = await AsyncStorage.getItem("calorieResults");
      if (result) {
        const remain = JSON.parse(result);
        console.log(remain);
        setTotalNutrition(nutrition);
        const payload = {
          dailyLimit: remain.dailyLimit,
          mealLimit: remain.mealLimit,
          remainingCalories: remain.remainingCalories - nutrition.calories,
        };
        await AsyncStorage.setItem("calorieResults", JSON.stringify(payload));
      }
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.goalText}>Ingredients</Text>
        <View>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={ingredient.unit}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    handleUnitChange(itemValue, index)
                  }
                >
                  {Object.entries(ingredient.unitOptions).map(
                    ([key, value]) => (
                      <Picker.Item key={key} label={value} value={key} />
                    )
                  )}
                </Picker>
                <TextInput
                  style={styles.quantityInput}
                  placeholder="ปริมาณ"
                  value={ingredient.quantity}
                  onChangeText={(text) => handleQuantityChange(text, index)}
                  keyboardType="numeric"
                />
                <Text style={styles.unitLabel}>กรัม</Text>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>CALCULATE</Text>
        </TouchableOpacity>
        <View style={styles.nutritionInfo}>
          <Text style={styles.nutritionTitle}>Total Nutrition:</Text>
          <Text>Calories: {totalNutrition.calories} kcal</Text>
          <Text>Protein: {totalNutrition.protein} g</Text>
          <Text>Carbs: {totalNutrition.carbs} g</Text>
          <Text>Fat: {totalNutrition.fat} g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  goalText: {
    fontSize: 30,
    alignSelf: "flex-start",
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredientContainer: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  ingredientName: {
    fontSize: 17,
    marginBottom: 8,
    color: "#333",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  quantityInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  unitLabel: {
    marginLeft: 8,
    color: "#666",
  },
  calculateButton: {
    backgroundColor: "#2AB793",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nutritionInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default IngredientsForm;
