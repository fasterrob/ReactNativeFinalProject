import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

const IngredientsForm: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "เนื้อสัตว์", quantity: "", unit: "วัว" },
    { name: "ผัก", quantity: "", unit: "ผักชี" },
    { name: "ผลไม้", quantity: "", unit: "กล้วย" },
    { name: "เครื่องปรุง", quantity: "", unit: "น้ำปลา" },
  ]);

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

  const handleCalculate = () => {
    // Implement calculation logic here
    console.log("Calculating with ingredients:", ingredients);
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
                  <Picker.Item
                    label={ingredient.unit}
                    value={ingredient.unit}
                  />
                  {/* Add more Picker.Item components for other units */}
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
    marginBottom: 10,
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
  },
  ingredientName: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
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
});

export default IngredientsForm;
