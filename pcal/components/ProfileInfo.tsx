import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface Data {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
}

const ProfileInfo: React.FC = () => {
  const [data, setData] = useState<Data>({
    name: "-",
    age: "-",
    height: "-",
    weight: "-",
    gender: "-",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <Text>{data.name}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age</Text>
        <Text>{data.age}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Height</Text>
          <Text>{data.height}</Text>
        </View>
        <View style={[styles.formGroup, styles.halfWidth]}>
          <Text style={styles.label}>Weight</Text>
          <Text>{data.weight}</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <Text>{data.gender}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
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
