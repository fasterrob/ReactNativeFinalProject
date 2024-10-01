import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface AddWeightModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddWeight: React.FC<AddWeightModalProps> = ({isVisible, onClose}) => {

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
            <Text style={styles.textInfo}>Weight</Text>
            <TextInput style={styles.textBox} placeholder="-" />
            <Text style={styles.textInfo}>Date</Text>
            <TextInput style={styles.textBox} placeholder="-" />

            <TouchableOpacity
              style={styles.GoToPlanButton}
              onPress={onClose}
            >
              <Text style={styles.GoToPlan}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWeight;

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
    textBox: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#dedede",
        height: 40,
        paddingLeft: 15,
    },
    textInfo: {
        fontSize: 18,
        marginTop: 10,
    },
  });
