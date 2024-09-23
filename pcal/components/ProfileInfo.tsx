import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeProfile } from "../store/store"; // Adjust the import path as needed
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../store/store";

interface Data {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
}

const ProfileInfo: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector((state: RootState) => state.profile);

  const handleDelete = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(removeProfile());
            navigation.navigate("FirstScreen" as never);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Information</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <Text>{profile.name}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age</Text>
        <Text>{profile.age}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Height</Text>
          <Text>{profile.height}</Text>
        </View>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Weight</Text>
          <Text>{profile.weight}</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <Text>{profile.gender}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Feather name="trash-2" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 16,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  deleteButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default ProfileInfo;
