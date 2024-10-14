import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import AddWeight from "../components/AddWeight";

const Progress = () => {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
  ];
  const [modalVisible, setVisibleModal] = useState(false);

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <LineChart maxValue={150} data={data} />
      </ScrollView>
      {/* <BarChart data={data} /> */}
      {/* <PieChart data={data} />
      <PopulationPyramid
        data={[
          { left: 10, right: 12 },
          { left: 9, right: 8 },
        ]}
      />
      <BarChart data={data} horizontal />

      <LineChart data={data} areaChart />

      <PieChart data={data} donut /> */}
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleOpenModal}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#66C6A8",
            borderRadius: 50,
            width: 200,
            height: 40,
          }}
        >
          <Text style={{ color: "white" }}>Add weight</Text>
        </TouchableOpacity>
        <AddWeight isVisible={modalVisible} onClose={handleCloseModal} />
      </View>
      <Text style={styles.titleValue}>Your Goal</Text>
      <Text>-</Text>
      <Text style={styles.titleValue}>Duration Left</Text>
      <Text>-</Text>
      <Text style={styles.titleValue}>Calorie limit per day</Text>
      <Text>-</Text>
      <Text style={styles.titleValue}>Calorie limit per meal</Text>
      <Text>-</Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    padding: 30,
    paddingBottom: 30,
    marginVertical: 40,
    marginHorizontal: "auto",
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleValue: {
    fontSize: 16,
    marginTop: 10,
  },
});
