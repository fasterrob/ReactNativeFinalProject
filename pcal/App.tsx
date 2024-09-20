import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import CaloriePlanScreen from "./Screens/CaloriePlanScreen";
import IngredientsCalculatorScreen from "./Screens/IngredientsCalculatorScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./components/CustomTabBar";

type RootStackParamList = {
  Home: undefined;
  CaloriePlan: undefined;
  IngredientsCalculator: undefined;
  HomeScreen: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }} // Hide tab bar in HomeScreen
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
