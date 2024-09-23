import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { useDispatch } from "react-redux";
import { setProfileComplete } from "../store/store";
import { useNavigation } from "@react-navigation/native";

type Gender = "Man" | "Woman";

const FirstScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const radioButtons: RadioButtonProps[] = [
    {
      id: "1",
      label: "Man",
      value: "Man",
    },
    {
      id: "2",
      label: "Woman",
      value: "Woman",
    },
  ];

  const handleSubmit = () => {
    dispatch(
      setProfileComplete({
        isProfile: true,
        name,
        age,
        height,
        weight,
        gender,
      })
    );
    navigation.navigate("Home" as never);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.labelHeader}>Personal Information</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.genderContainer}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={(selectedId) => {
              const selected = radioButtons.find(
                (button) => button.id === selectedId
              );
              setGender(selected?.value as Gender);
            }}
            selectedId={
              gender === "Man" ? "1" : gender === "Woman" ? "2" : undefined
            }
            layout="row"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  labelHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2AB793",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FirstScreen;
