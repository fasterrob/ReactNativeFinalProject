import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import NavBanner from "../components/NavBanner";
import styles from "../styles/styles";
import ProfileInfo from "../components/ProfileInfo";
import PlanModal from "../components/PlanModal";
import { useNavigation } from "@react-navigation/native";
import EditProfile from "../components/EditProfile";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [modalEditProfileVisible, setModalEditProfileVisible] = useState(false);

  const handleOpenModalEditProfileVisible = () => {
    setModalEditProfileVisible(!modalEditProfileVisible);
  };

  return (
    <>
      <NavBanner page="profile" />
      <View style={styles.backgroundScreen}>
        <View style={styles.circleScreen} />
        <ProfileInfo
          openModalEditProfileVisible={handleOpenModalEditProfileVisible}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Progress" as never)}
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
      <EditProfile
        modalVisible={modalEditProfileVisible}
        onSave={() => {}}
        onClose={() => {
          setModalEditProfileVisible(false);
        }}
      />
    </>
  );
};

export default ProfileScreen;
