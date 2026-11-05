import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalDataTab from '../screens/driverRegistration/PersonalDataTab';
import VehicleTab from '../screens/driverRegistration/VehicleTab';
import DocumentsTab from '../screens/driverRegistration/DocumentsTab';
import { RegistrationProvider, useRegistration } from '../screens/driverRegistration/RegistrationContext';
import { TabBarIndicator } from 'react-native-tab-view';

//AI -assisted: see docs/AI_LOG.md #4

const Tab = createMaterialTopTabNavigator();

function RegistrationContent() {
    const { formIsComplete, form } = useRegistration();

    function handleSubmit() {
        if (!formIsComplete) {
            return;
        }
        console.log('Formulario listo para enviarse:', form);
    }

    return (
        <View style={styles.screen}>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: styles.tabLabel,
                    tabBarIndicatorStyle: styles.indicator,
                }}
            >
                <Tab.Screen
                    name="PersonalData"
                    component={PersonalDataTab}
                    options={{ title: 'Datos' }}
                />

                <Tab.Screen
                    name="Vehicle"
                    component={VehicleTab}
                    options={{ title: 'Vehículo' }}
                />

                <Tab.Screen
                    name="Documents"
                    component={DocumentsTab}
                    options={{ title: 'Documentos' }}
                />
            </Tab.Navigator>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    !formIsComplete && styles.disabledButton,
                ]}
                disabled={!formIsComplete}
                onPress={handleSubmit}
            >
                <Text style={styles.submitText}>Enviar registro</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function DriverRegistrationNavigator() {
    return (
        <RegistrationProvider>
            <RegistrationContent />
        </RegistrationProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
    indicator: {
        backgroundColor: '#1976d2',
        height: 3,
    },
    submitButton: {
        margin: 16,
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#1976d2',
    },
    disabledButton: {
        backgroundColor: '#aeb8c2',
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});