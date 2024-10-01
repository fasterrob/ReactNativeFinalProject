import { View, Text, ScrollView } from "react-native";
import styles from "../styles/styles";
import React from "react";
import NavBanner from "../components/NavBanner";
import Progress from "../components/Progress";

const ProgressScreen = () => {
  return (
    <>
      <NavBanner page="progress" />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ScrollView style={{ width: "100%", flex: 1 }}>
            <Progress />
        </ScrollView>
      </View>
    </>
  );
};

export default ProgressScreen;
