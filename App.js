// AI-assisted: see docs/AI_LOG.md #15 & #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Guardián de navegación superior: bloquea el montaje de MapScreen y módulos operativos hasta confirmar isApproved === true.

import 'react-native-gesture-handler';
import React from 'react';
import {ActivityIndicator,StyleSheet,Text,View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {DriverProvider,useDriverSession,} from './src/context/DriverContext';

import DriverRegistrationNavigator from './src/navigation/DriverRegistrationNavigator';
import PendingApprovalScreen from './src/screens/driverRegistration/PendingApprovalScreen';
import MapScreen from './src/screens/MapScreen';
import ActiveTripScreen from './src/screens/ActiveTripScreen';

// Importamos el navegador aislado del perfil y configuración del conductor
import DriverProfileNavigator from './src/navigation/DriverProfileNavigator';

const Stack = createStackNavigator();

// Pantalla de carga mientras se valida AsyncStorage y Firestore
function LoadingScreen() {
  return (
    <View style={styles.centeredScreen}>
      <ActivityIndicator size="large" color="#1976d2" />
      <Text style={styles.statusText}>
        Verificando la sesión del conductor...
      </Text>
    </View>
  );
}

// Pantalla de error si falla la lectura de la sesión
function SessionErrorScreen({ message }) {
  return (
    <View style={styles.centeredScreen}>
      <Text style={styles.errorTitle}>
        No fue posible cargar la sesión
      </Text>
      <Text style={styles.errorText}>
        {message || 'Intenta nuevamente más tarde.'}
      </Text>
    </View>
  );
}

// Navegador exclusivo para conductores aprobados (MapScreen, ActiveTrip y DriverProfileNavigator)
function ApprovedDriverNavigator() {
  return (
    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActiveTrip"
        component={ActiveTripScreen}
        options={{
          title: 'Viaje en curso',
          headerLeft: () => null,
        }}
      />
      {/* 
        Nuevo navegador de perfil integrado de forma aislada. 
        Mantiene oculto su header superior para que cada pantalla interna controle sus títulos.
      */}
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

// Enrutador condicional basado en el estado de sesión y aprobación
function ApplicationNavigator() {
  const {
    sessionReady,
    sessionStatus,
    sessionError,
  } = useDriverSession();

  // 1. Cargando sesión inicial
  if (!sessionReady || sessionStatus === 'loading') {
    return <LoadingScreen />;
  }

  // 2. Error al leer sesión o perfil
  if (sessionStatus === 'error') {
    return <SessionErrorScreen message={sessionError} />;
  }

  // 3. Sin sesión guardada -> Muestra el flujo de Registro
  if (sessionStatus === 'no-session') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="DriverRegistration"
          component={DriverRegistrationNavigator}
          options={{ title: 'Registro de conductor' }}
        />
      </Stack.Navigator>
    );
  }

  // 4. Con sesión pero pendiente de aprobación -> Muestra pantalla de espera
  if (sessionStatus === 'pending') {
    return <PendingApprovalScreen />;
  }

  // 5. Aprobado -> Permite acceso completo al mapa, viajes y perfil
  if (sessionStatus === 'approved') {
    return <ApprovedDriverNavigator />;
  }

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
  },
});