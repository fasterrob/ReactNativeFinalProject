import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setProfileComplete } from "../store/store";

interface EditProfileProps {
  modalVisible: boolean;
  onSave: (value: any) => void;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  modalVisible,
  onClose,
  onSave,
}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [gender, setGender] = useState<"Man" | "Woman" | null>(
    profile.gender as "Man" | "Woman" | null
  );

  const handleSave = () => {
    // Dispatch โปรไฟล์ที่แก้ไขแล้วกลับไปยัง store
    dispatch(
      setProfileComplete({ isProfile: true, name, age, height, weight, gender })
    );
    onClose();
  };
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Edit Profile</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
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
                keyboardType="numeric"
                onChangeText={setAge}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Height</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                value={height}
                keyboardType="numeric"
                onChangeText={setHeight}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Weight</Text>
              <TextInput
                style={styles.input}
                placeholder="Value"
                value={weight}
                keyboardType="numeric"
                onChangeText={setWeight}
              />
            </View>

            <View style={styles.radioContainer}>
              <TouchableOpacity
                onPress={() => setGender("Man")}
                style={styles.radioOption}
              >
                <Text style={styles.radioLabel}>Man</Text>
                <View
                  style={[
                    styles.radioCircle,
                    gender === "Man" && styles.selectedRadio,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender("Woman")}
                style={styles.radioOption}
              >
                <Text style={styles.radioLabel}>Woman</Text>
                <View
                  style={[
                    styles.radioCircle,
                    gender === "Woman" && styles.selectedRadio,
                  ]}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    color: "#2ecc71",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  radioOption: {
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2AB793",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  selectedRadio: {
    backgroundColor: "#2AB793",
  },
  saveButton: {
    backgroundColor: "#2AB793",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontSize: 16,
  },
});
