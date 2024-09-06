import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';

export default function App(): React.JSX.Element {

  const HomeStack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName='Pcal'>
        <HomeStack.Screen name='PCAL' component={HomeScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );

}
