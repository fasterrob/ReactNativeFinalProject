import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useSelector } from "react-redux";
import createStoreWithPersistence, { RootState } from "./store/store";
import HomeScreen from "./Screens/HomeScreen";
import CaloriePlanScreen from "./Screens/CaloriePlanScreen";
import IngredientsCalculatorScreen from "./Screens/IngredientsCalculatorScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import CustomTabBar from "./components/CustomTabBar";
import FirstScreen from "./Screens/FIrstScreen";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import styles from "./styles/styles";

type RootStackParamList = {
  Home: undefined;
  CaloriePlan: undefined;
  IngredientsCalculator: undefined;
  HomeScreen: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const InfoStack = createNativeStackNavigator();

const { width, height } = Dimensions.get("window");

const WaterLevelLoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({
  onLoadingComplete,
}) => {
  const [waterLevel] = useState(new Animated.Value(0));
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { height } = Dimensions.get("window");

  useEffect(() => {
    Animated.timing(waterLevel, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100) {
      onLoadingComplete();
    }
  }, [loadingProgress, onLoadingComplete]);

  const waterHeight = waterLevel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.waterLevelContainer}>
      <Animated.View
        style={[styles.waterLevelWater, { height: waterHeight }]}
      />
      <View style={styles.waterLevelContent}>
        <View style={styles.waterLevelLogo}>
          <Image source={require("./assets/logo.png")} />
        </View>
        <Text
          style={styles.waterLevelLoadingText}
        >{`Loading... ${loadingProgress}%`}</Text>
      </View>
    </View>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CaloriePlan"
        component={CaloriePlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IngredientsCalculator"
        component={IngredientsCalculatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const InfoStackScreen = () => {
  return (
    <InfoStack.Navigator
      initialRouteName="Info"
      screenOptions={{
        headerShown: false,
      }}
    >
      <InfoStack.Screen name="Info" component={FirstScreen} />
    </InfoStack.Navigator>
  );
};

const FadeInView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const AppContent: React.FC = () => {
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  return (
    <FadeInView>
      <NavigationContainer>
        {isProfile ? (
          <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{ headerShown: false, tabBarStyle: { display: "none" } }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        ) : (
          <InfoStackScreen />
        )}
      </NavigationContainer>
    </FadeInView>
  );
};

const App: React.FC = () => {
  const [store, setStore] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initStore = async () => {
      const storeInstance = await createStoreWithPersistence();
      setStore(storeInstance);
    };
    initStore();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <WaterLevelLoadingScreen onLoadingComplete={handleLoadingComplete} />
    );
  }

  if (!store) {
    return null; // or a fallback error screen
  }

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
