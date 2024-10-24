import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface AddWeightModalProps {
  value?: { weight: number; date: Date };
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: { weight: number; date: Date }) => void;
}

const AddWeight: React.FC<AddWeightModalProps> = ({
  value,
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [weight, setWeight] = useState(value?.weight?.toString() || "");
  const [date, setDate] = useState(value?.date || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ weight?: string; date?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { weight?: string; date?: string } = {};
    let isValid = true;

    if (!weight) {
      newErrors.weight = "Weight is required";
      isValid = false;
    } else if (isNaN(Number(weight)) || Number(weight) <= 0) {
      newErrors.weight = "Please enter a valid weight";
      isValid = false;
    }

    if (!date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        weight: Number(weight),
        date: date,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setWeight("");
    setDate(new Date());
    setErrors({});
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Add New Weight</Text>

            <Text style={styles.textInfo}>Weight (kg)</Text>
            <TextInput
              style={[styles.textBox, errors.weight && styles.errorInput]}
              placeholder="Enter weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
            />
            {errors.weight && (
              <Text style={styles.errorText}>{errors.weight}</Text>
            )}

            <Text style={styles.textInfo}>Date</Text>
            <TouchableOpacity
              style={[styles.textBox, styles.dateInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{formatDate(date)}</Text>
            </TouchableOpacity>
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            <TouchableOpacity
              style={styles.GoToPlanButton}
              onPress={handleSubmit}
            >
              <Text style={styles.GoToPlan}>Add New Weight</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#00C8B3",
  },
  contentContainer: {
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  textInfo: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: "#444",
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#dedede",
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  dateInput: {
    justifyContent: "center",
  },
  errorInput: {
    borderColor: "#ff6b6b",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  GoToPlanButton: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  GoToPlan: {
    backgroundColor: "#66C6A8",
    color: "white",
    borderRadius: 25,
    width: "100%",
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddWeight;
