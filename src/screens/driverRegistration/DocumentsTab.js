import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRegistration } from '../driverRegistration/RegistrationContext';

// AI-assistant: see docs/AI_LOG.md #4, #10
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export default function DocumentsTab() {
    const { form, updateSection } = useRegistration();
    const documents = form.documents;

    const [errors, setErrors] = useState({});

    const [activeDateField, setActiveDateField] = useState(null);

    function handleChange(field, value) {
        updateSection('documents', field, value);

        let message = '';

        if (typeof value === 'string' && !value.trim()) {
            message = 'Este campo es obligatorio';
        }

        if (
            field === 'mercadoPagoEmail' &&
            value.trim() !== '' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
            message = 'Debe ser un correo electrónico válido';
        }

        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: message,
        }));
    }

    async function selectDocumentPhoto(field) {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            setErrors((previousErrors) => ({
                ...previousErrors,
                [field]: 'Se necesita permiso para seleccionar una imagen.',
            }));

            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets?.length > 0) {
            updateSection('documents', field, result.assets[0].uri);

            setErrors((previousErrors) => ({
                ...previousErrors,
                [field]: '',
            }));
        }
    }


    function toggleTerms() {
        updateSection(
            'documents',
            'acceptedTerms',
            !documents.acceptedTerms
        );

        setErrors((previousErrors) => ({
            ...previousErrors,
            acceptedTerms: documents.acceptedTerms
                ? 'Debes aceptar los términos para continuar'
                : '',
        }));
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function getDateValue(field) {
        const storedDate = documents[field];

        if (storedDate) {
            return new Date(`${storedDate}T12:00:00`)
        }

        return new Date();
    }

    function handleExpirationDateChange(event, selectedDate) {
        setActiveDateField(null);

        if (!selectedDate || !activeDateField) {
            return;
        }

        const formattedDate = formatDate(selectedDate);

        handleChange(activeDateField, formattedDate);
    }

    function renderDatePicker(field) {
        if (activeDateField !== field) {
            return null;
        }

        return (
            <DateTimePicker
                value={getDateValue(field)}
                mode="date"
                display="default"
                minimumDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                onValueChange={handleExpirationDateChange}
                onDismiss={() => setActiveDateField(null)}
            />
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Documentos y pagos</Text>

            <Text style={styles.label}>Número de licencia</Text>
            <TextInput
                style={styles.input}
                value={documents.licenseNumber}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('licenseNumber', value)}
                placeholder="Número de licencia"
            />
            <ErrorMessage message={errors.licenseNumber} />

            <Text style={styles.label}>Foto de licencia</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => selectDocumentPhoto('licensePhoto')}
            > // AI-assisted: see docs/AI_LOG.md #13
                <Text>
                    {documents.licensePhoto
                        ? 'Cambiar foto de licencia'
                        : 'Seleccionar foto de licencia'}
                </Text>
            </TouchableOpacity>

            <ErrorMessage message={errors.licensePhoto} />


            <Text style={styles.label}>Vencimiento de licencia</Text>
            <TouchableOpacity style={styles.dateButton}
                onPress={() => setActiveDateField('licenseExpiration')}
            >
                <Text style={styles.dateButtonText}>
                    {documents.licenseExpiration || 'seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker('licenseExpiration')}

            <ErrorMessage message={errors.licenseExpiration} />

            <Text style={styles.label}>Foto del SOAT</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => selectDocumentPhoto('soatPhoto')}
            > // AI-assisted: see docs/AI_LOG.md #13
                <Text>
                    {documents.soatPhoto
                        ? 'Cambiar foto del SOAT'
                        : 'Seleccionar foto del SOAT'}
                </Text>
            </TouchableOpacity>

            <ErrorMessage message={errors.soatPhoto} />


            <Text style={styles.label}>Vencimiento del SOAT</Text>
            <TouchableOpacity style={styles.dateButton} // AI-assisted: see docs/AI_LOG.md #12
                onPress={() => setActiveDateField('soatExpiration')}
            >
                <Text style={styles.dateButtonText}>
                    {documents.soatExpiration || 'seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker('soatExpiration')}

            <ErrorMessage message={errors.soatExpiration} />

            <Text style={styles.label}>Foto de revisión técnico-mecánica</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => selectDocumentPhoto('technicalReviewPhoto')}
            > // AI-assisted: see docs/AI_LOG.md #13
                <Text>
                    {documents.technicalReviewPhoto
                        ? 'Cambiar foto de revisión'
                        : 'Seleccionar foto de revisión técnico-mecánica'}
                </Text>
            </TouchableOpacity>

            <ErrorMessage message={errors.technicalReviewPhoto} />


            <Text style={styles.label}>
                Vencimiento de revisión técnico-mecánica
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setActiveDateField('technicalReviewExpiration')
                }
            >
                <Text style={styles.dateButtonText}>
                    {documents.technicalReviewExpiration || 'seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker('technicalReviewExpiration')}

            <ErrorMessage message={errors.technicalReviewExpiration} />

            <Text style={styles.label}>
                Correo de la cuenta de Mercado Pago
            </Text>
            <TextInput
                style={styles.input}
                value={documents.mercadoPagoEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) =>
                    handleChange('mercadoPagoEmail', value)
                }
                placeholder="pagos@ejemplo.com"
            />
            <ErrorMessage message={errors.mercadoPagoEmail} />

            <TouchableOpacity
                style={styles.termsContainer}
                onPress={toggleTerms}
            >
                <Text style={styles.checkbox}>
                    {documents.acceptedTerms ? '☑' : '☐'}
                </Text>

                <Text style={styles.termsText}>
                    Acepto los términos y autorizo una comisión de plataforma del 20%.
                </Text>
            </TouchableOpacity>

            <ErrorMessage message={errors.acceptedTerms} />
        </ScrollView>
    );
}

function ErrorMessage({ message }) {
    if (!message) {
        return null;
    }

    return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff'
    },
    dateButtonText: {
        color: '#333'
    },
    photoButton: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
    },
    checkbox: {
        fontSize: 24,
        marginRight: 8,
    },
    termsText: {
        flex: 1,
    },
    error: {
        color: '#c62828',
        marginTop: 4,
        fontSize: 12,
    },
})