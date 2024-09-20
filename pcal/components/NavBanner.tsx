import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
interface PropType {
  page: string;
}

const NavBanner = ({ page }: PropType): React.JSX.Element => {
  // Destructure page from PropType
  const Render = () => {
    if (page === "ingredients") {
      return (
        <>
          <View style={{ marginLeft: 40 }}>
            <Text
              style={{
                color: "#2AB793",
                fontSize: 24,
                fontWeight: "500", // Changed to string for fontWeight
              }}
            >
              INGREDIENT
            </Text>
            <Text
              style={{
                color: "#2AB793",
                fontSize: 24,
                fontWeight: "500", // Changed to string for fontWeight
              }}
            >
              CALCULATOR
            </Text>
          </View>
        </> // Moved closing tag here
      );
    } else if (page === "calorie") {
      return (
        <>
          <View style={{ marginLeft: 40 }}>
            <Text
              style={{
                color: "#2AB793",
                fontSize: 24,
                fontWeight: "500",
              }}
            >
              CALORIE PLAN
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                color: "#2AB793",
                fontSize: 30,
                fontWeight: "500",
              }}
            >
              PROFILE
            </Text>
          </View>
        </>
      );
    }
  };
  return (
    <View style={styles.background}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
        }}
      >
        <Image
          style={{ position: "absolute", left: 40, width: 90, height: 100 }}
          source={require("../assets/logo.png")}
        />
        <Render />
      </View>
    </View>
  );
};

export default NavBanner;

const styles = StyleSheet.create({
  background: {
    position: "static",
    backgroundColor: "#fff",
    elevation: 10,
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
