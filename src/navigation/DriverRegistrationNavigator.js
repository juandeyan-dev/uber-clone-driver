import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalDataTab from '../screens/driverRegistration/PersonalDataTab';
import VehicleTab from '../screens/driverRegistration/VehicleTab';
import DocumentsTab from '../screens/driverRegistration/DocumentsTab';
import { RegistrationProvider, useRegistration } from '../screens/driverRegistration/RegistrationContext';
import PendingApprovalScreen from '../screens/driverRegistration/PendingApprovalScreen';
import { TabBarIndicator } from 'react-native-tab-view';
import { uploadImageToCloudinary } from '../services/cloudinaryService';
import { saveDriverRegistration } from '../services/driverService';

//AI -assisted: see docs/AI_LOG.md #4, #13, #14
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

const Tab = createMaterialTopTabNavigator();

function RegistrationContent() {
    const { formIsComplete, form } = useRegistration();
    const [submitted, setSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');


    async function handleSubmit() {
        if (!formIsComplete || isSubmitting || form.isApproved !== false) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const [
                profilePhoto,
                vehiclePhoto,
                licensePhoto,
                soatPhoto,
                technicalReviewPhoto,
            ] = await Promise.all([
                uploadImageToCloudinary(
                    form.personal.profilePhoto,
                    'drivers/profile'
                ),
                uploadImageToCloudinary(
                    form.vehicle.vehiclePhoto,
                    'drivers/vehicle'
                ),
                uploadImageToCloudinary(
                    form.documents.licensePhoto,
                    'drivers/license'
                ),
                uploadImageToCloudinary(
                    form.documents.soatPhoto,
                    'drivers/soat'
                ),
                uploadImageToCloudinary(
                    form.documents.technicalReviewPhoto,
                    'drivers/technical-review'
                ),
            ]);

            const uploadedUrls = {
                profilePhoto,
                vehiclePhoto,
                licensePhoto,
                soatPhoto,
                technicalReviewPhoto,
            };

            const savedDriver = await saveDriverRegistration(
                form,
                uploadedUrls
            );

            console.log('Registro guardado correctamente:', savedDriver);

            setSubmitted(true);
        } catch (error) {
            console.error('Error al guardar el registro:', error);

            setSubmitError(
                error?.message ||
                'No fue posible enviar el registro. Intenta nuevamente.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (submitted) {
        return <PendingApprovalScreen />;
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

            {submitError ? (
                <Text style={styles.submitError}>{submitError}</Text>
            ) : null}

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    (!formIsComplete || isSubmitting) && styles.disabledButton,
                ]}
                disabled={!formIsComplete || isSubmitting}
                onPress={handleSubmit}
            >
                <Text style={styles.submitText}>
                    {isSubmitting ? 'Enviando registro...' : 'Enviar registro'}
                </Text>
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
    submitError: {
        marginHorizontal: 16,
        marginBottom: 8,
        color: '#c62828',
        textAlign: 'center',
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