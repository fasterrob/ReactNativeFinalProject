import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

type CustomTabBarProps = BottomTabBarProps & {
  // Removed ParamListBase
  state: TabNavigationState<ParamListBase>; // Updated type with type argument
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const route = state.routes;

  const routeIndex = route ? route[0].state?.index : 0;
  if (routeIndex === 0 || route[0].state === undefined) {
    return;
  }
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <View style={styles.button} />
            <Icon
              name={label === "Home" ? "arrow-left" : "user"}
              size={24}
              color="black"
            />
            <Text style={styles.tabText}>{label as string}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2AB793", // Turquoise color
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  tabItem: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#2AB793",
  },
  button: {
    position: "absolute",
    backgroundColor: "white",
    width: 60,
    height: 30,
    top: 1.5,
    borderRadius: 50,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTabBar;
