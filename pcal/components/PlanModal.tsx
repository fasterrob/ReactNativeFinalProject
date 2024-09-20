import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface PlanModalProps {
  isVisible: boolean;
  onClose: () => void;
  goal?: string;
  durationLeft?: string;
  caloriePerDay?: string;
  caloriePerMeal?: string;
}

const PlanModal: React.FC<PlanModalProps> = ({
  isVisible,
  onClose,
  goal,
  durationLeft,
  caloriePerDay,
  caloriePerMeal,
}) => {
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
            <Text style={styles.title}>Your Goal</Text>
            <Text style={styles.value}>{goal || '-'}</Text>
            
            <Text style={styles.title}>Duration Left</Text>
            <Text style={styles.value}>{durationLeft || '-'}</Text>
            
            <Text style={styles.title}>Calorie limit per day</Text>
            <Text style={styles.value}>{caloriePerDay || '-'}</Text>
            
            <Text style={styles.title}>Calorie limit per meal</Text>
            <Text style={styles.value}>{caloriePerMeal || '-'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#00C8B3',
  },
  contentContainer: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
});

export default PlanModal;