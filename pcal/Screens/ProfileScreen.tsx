import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import NavBanner from "../components/NavBanner";
import styles from "../styles/styles";
import ProfileInfo from "../components/ProfileInfo";

const ProfileScreen = () => {
  return (
    <>
      <NavBanner page="profile" />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ProfileInfo />
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 60,
            padding: 12,
            width: 180,
            backgroundColor: "#2AB793",
            marginTop: 50,
          }}
        >
          <Text style={{ color: "white" }}>CHECK YOUR PLAN</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;
