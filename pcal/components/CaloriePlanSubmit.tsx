import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface CaloriePlanModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CaloriePlanSubmit: React.FC<CaloriePlanModalProps> = ({
  isVisible,
  onClose,
}) => {

    const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Goal Submited!</Text>

            <TouchableOpacity
              style={styles.GoToPlanButton}
              onPress={() => navigation.navigate("Progress" as never)}
            >
              <Text style={styles.GoToPlan}>Go to your plan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.GoToPlanButton}
              onPress={() => navigation.navigate("IngredientsCalculator" as never)}
            >
              <Text style={styles.GoToPlan}>Go to ingredient calculator</Text>
            </TouchableOpacity>


          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CaloriePlanSubmit;

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
  },
  closeButtonText: {
    fontSize: 24,
    color: "#00C8B3",
  },
  contentContainer: {
    width: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
  },
  GoToPlan: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: "#66C6A8",
    color: "white",
    borderRadius: 50,
    width: 200,
    height: 40,
  },
  GoToPlanButton: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
