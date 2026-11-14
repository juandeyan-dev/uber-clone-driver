// AI-assisted: see docs/AI_LOG.md #15 & #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Enrutamiento principal basado en sesión y aprobación del conductor.
// MapScreen solamente se monta después de confirmar isApproved === true.

import 'react-native-gesture-handler';

import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createStackNavigator,
} from '@react-navigation/stack';

import {
  DriverProvider,
  useDriverSession,
} from './src/context/DriverContext';

import DriverRegistrationNavigator from './src/navigation/DriverRegistrationNavigator';
import DriverProfileNavigator from './src/navigation/DriverProfileNavigator';

import PendingApprovalScreen from './src/screens/driverRegistration/PendingApprovalScreen';
import MapScreen from './src/screens/MapScreen';
import ActiveTripScreen from './src/screens/ActiveTripScreen';

const Stack = createStackNavigator();

function LoadingScreen() {
  return (
    <View style={styles.centeredScreen}>
      <ActivityIndicator
        size="large"
        color="#1976d2"
      />

      <Text style={styles.statusText}>
        Verificando la sesión del conductor...
      </Text>
    </View>
  );
}

function SessionErrorScreen({ message }) {
  return (
    <View style={styles.centeredScreen}>
      <Text style={styles.errorTitle}>
        No fue posible cargar la sesión
      </Text>

      <Text style={styles.errorText}>
        {message ||
          'Intenta nuevamente más tarde.'}
      </Text>
    </View>
  );
}

/*
 * Este navegador solamente se renderiza cuando:
 *
 * sessionStatus === 'approved'
 *
 * Por esa razón, MapScreen no se monta para conductores
 * sin aprobación confirmada.
 */
function ApprovedDriverNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
    >
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ActiveTrip"
        component={ActiveTripScreen}
        options={{
          title: 'Viaje en curso',
          headerLeft: () => null,
        }}
      />

      <Stack.Screen
        name="DriverProfileNavigator"
        component={DriverProfileNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

/*
 * Navegador mostrado cuando no existe driverId local.
 */
function RegistrationRootNavigator() {
  return (
    <Stack.Navigator
      key="registration-root"
    >
      <Stack.Screen
        name="DriverRegistration"
        component={DriverRegistrationNavigator}
        options={{
          title: 'Registro de conductor',
        }}
      />
    </Stack.Navigator>
  );
}

/*
 * Decide qué flujo de la aplicación puede mostrarse.
 */
function ApplicationNavigator() {
  const {
    sessionReady,
    sessionStatus,
    sessionError,
  } = useDriverSession();

  /*
   * Mientras no termine la verificación, no se monta
   * ningún navegador operativo ni MapScreen.
   */
  if (
    !sessionReady ||
    sessionStatus === 'loading'
  ) {
    return <LoadingScreen />;
  }

  /*
   * Error de AsyncStorage o Firestore.
   */
  if (sessionStatus === 'error') {
    return (
      <SessionErrorScreen
        message={sessionError}
      />
    );
  }

  /*
   * No existe driverId local.
   * El inicio correcto es el registro.
   */
  if (sessionStatus === 'no-session') {
    return <RegistrationRootNavigator />;
  }

  /*
   * Existe driverId, pero Firestore no confirmó
   * isApproved === true.
   */
  if (sessionStatus === 'pending') {
    return <PendingApprovalScreen />;
  }

  /*
   * El mapa solamente se permite en este caso.
   */
  if (sessionStatus === 'approved') {
    return <ApprovedDriverNavigator />;
  }

  /*
   * Protección adicional ante cualquier estado inesperado.
   * Nunca se envía al mapa por defecto.
   */
  return <LoadingScreen />;
}

export default function App() {
  return (
    <DriverProvider>
      <NavigationContainer>
        <ApplicationNavigator />
      </NavigationContainer>
    </DriverProvider>
  );
}

const styles = StyleSheet.create({
  centeredScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f4f6f8',
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  errorTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c62828',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
