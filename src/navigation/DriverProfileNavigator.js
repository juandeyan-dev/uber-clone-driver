// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Navegación propia del módulo de perfil y configuración del conductor.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditVehicleScreen from '../screens/driverProfile/EditVehicleScreen';
import DriverProfileScreen from '../screens/driverProfile/DriverProfileScreen';
import EditPersonalDataScreen from '../screens/driverProfile/EditPersonalDataScreen';
import EditDocumentsScreen from '../screens/driverProfile/EditDocumentsScreen';
import DriverPreferencesScreen from '../screens/driverProfile/DriverPreferencesScreen';


const Stack = createStackNavigator();

export default function DriverProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DriverProfile"
                component={DriverProfileScreen}
                options={{
                    title: 'Perfil del conductor',
                }}
            />

            <Stack.Screen
                name="EditPersonalData"
                component={EditPersonalDataScreen}
                options={{
                    title: 'Editar datos personales',
                }}
            />

            <Stack.Screen
                name="EditVehicle"
                component={EditVehicleScreen}
                options={{
                    title: 'Editar vehículo',
                }}
            />

            <Stack.Screen
                name="EditDocuments"
                component={EditDocumentsScreen}
                options={{
                    title: 'Editar documentos',
                }}
            />

            <Stack.Screen
                name="DriverPreferences"
                component={DriverPreferencesScreen}
                options={{
                    title: 'Preferencias',
                }}
            />


        </Stack.Navigator>
    );
}
