
import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DriverProvider } from './src/context/DriverContext';
import DriverRegistrationNavigator from './src/navigation/DriverRegistrationNavigator';
import MapScreen from './src/screens/MapScreen';
import ActiveTripScreen from './src/screens/ActiveTripScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DriverProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MapScreen">
          <Stack.Screen
            name="DriverRegistration"
            component={DriverRegistrationNavigator}
            options={{ title: 'Registro de conductor' }}
          />

          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ActiveTrip"
            component={ActiveTripScreen}
            options={{ title: 'Viaje en curso', headerLeft: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DriverProvider>
  );
}
