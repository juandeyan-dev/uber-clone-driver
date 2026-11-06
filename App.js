import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DriverRegistrationNavigator from './src/navigation/DriverRegistrationNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DriverRegistration"
          component={DriverRegistrationNavigator}
          options={{ title: 'Registro de conductor' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
