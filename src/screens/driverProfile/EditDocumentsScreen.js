// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Pantalla para editar datos y fechas de documentos sin reemplazar las fotografías existentes.

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useDriverSession } from '../../context/DriverContext';
import { updateDriverDocumentsData } from '../../services/driverService';

function ErrorMessage({ message }) {
    if (!message) {
        return null;
    }

    return (
        <Text style={styles.error}>
            {message}
        </Text>
    );
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function parseDate(value) {
    if (!value) {
        return new Date();
    }

    return new Date(`${value}T12:00:00`);
}

function isFutureDate(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const selectedDate = new Date(`${value}T12:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return selectedDate > today;
}

function validateDocuments(documents) {
    const errors = {};

    const licenseNumber = documents.licenseNumber.trim();
    const mercadoPagoEmail =
        documents.mercadoPagoEmail.trim();

    if (!licenseNumber) {
        errors.licenseNumber =
            'El número de licencia es obligatorio.';
    }

    if (!isFutureDate(documents.licenseExpiration)) {
        errors.licenseExpiration =
            'La fecha de licencia debe ser posterior a hoy.';
    }

    if (!isFutureDate(documents.soatExpiration)) {
        errors.soatExpiration =
            'La fecha del SOAT debe ser posterior a hoy.';
    }

    if (!isFutureDate(
        documents.technicalReviewExpiration
    )) {
        errors.technicalReviewExpiration =
            'La fecha de revisión debe ser posterior a hoy.';
    }

    if (!mercadoPagoEmail) {
        errors.mercadoPagoEmail =
            'El correo de Mercado Pago es obligatorio.';
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mercadoPagoEmail)
    ) {
        errors.mercadoPagoEmail =
            'Ingresa un correo de Mercado Pago válido.';
    }

    return errors;
}

export default function EditDocumentsScreen({ navigation }) {
    const {
        driverId,
        driverProfile,
        sessionStatus,
    } = useDriverSession();

    const [documents, setDocuments] = useState({
        licenseNumber: '',
        licenseExpiration: '',
        soatExpiration: '',
        technicalReviewExpiration: '',
        mercadoPagoEmail: '',
    });

    const [activeDateField, setActiveDateField] =
        useState(null);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');

    useEffect(() => {
        if (!driverProfile?.documents) {
            return;
        }

        setDocuments({
            licenseNumber:
                driverProfile.documents.licenseNumber || '',
            licenseExpiration:
                driverProfile.documents.licenseExpiration || '',
            soatExpiration:
                driverProfile.documents.soatExpiration || '',
            technicalReviewExpiration:
                driverProfile.documents
                    .technicalReviewExpiration || '',
            mercadoPagoEmail:
                driverProfile.documents.mercadoPagoEmail || '',
        });
    }, [driverProfile]);

    function handleChange(field, value) {
        let normalizedValue = value;

        if (field === 'licenseNumber') {
            normalizedValue = value.replace(/\D/g, '');
        }

        if (field === 'mercadoPagoEmail') {
            normalizedValue = value.trim();
        }

        setDocuments((previousDocuments) => ({
            ...previousDocuments,
            [field]: normalizedValue,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: '',
        }));

        setSaveError('');
        setSaveSuccess('');
    }

    function handleDateChange(event, selectedDate) {
        const currentField = activeDateField;

        setActiveDateField(null);

        if (!selectedDate || !currentField) {
            return;
        }

        const formattedDate = formatDate(selectedDate);

        handleChange(currentField, formattedDate);
    }

    function renderDatePicker(field) {
        if (activeDateField !== field) {
            return null;
        }

        return (
            <DateTimePicker
                value={parseDate(documents[field])}
                mode="date"
                display="default"
                minimumDate={
                    new Date(
                        Date.now() + 24 * 60 * 60 * 1000
                    )
                }
                onChange={handleDateChange}
                onValueChange={handleDateChange}
                onDismiss={() => setActiveDateField(null)}
            />
        );
    }

    async function handleSave() {
        const normalizedDocuments = {
            ...documents,
            licenseNumber:
                documents.licenseNumber.trim(),
            mercadoPagoEmail:
                documents.mercadoPagoEmail.trim(),
        };

        const validationErrors =
            validateDocuments(normalizedDocuments);

        setErrors(validationErrors);
        setSaveError('');
        setSaveSuccess('');

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (!driverId) {
            setSaveError(
                'No se encontró el identificador del conductor.'
            );
            return;
        }

        setIsSaving(true);

        try {
            await updateDriverDocumentsData(
                driverId,
                normalizedDocuments
            );

            setSaveSuccess(
                'Los documentos se actualizaron correctamente.'
            );

            setTimeout(() => {
                navigation.goBack();
            }, 800);
        } catch (error) {
            console.error(
                'Error al actualizar los documentos:',
                error
            );

            setSaveError(
                error?.message ||
                'No fue posible actualizar los documentos.'
            );
        } finally {
            setIsSaving(false);
        }
    }

    if (sessionStatus === 'loading' || !driverProfile) {
        return (
            <View style={styles.centeredScreen}>
                <ActivityIndicator
                    size="large"
                    color="#1976d2"
                />

                <Text style={styles.loadingText}>
                    Cargando documentos...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>
                Editar documentos y pagos
            </Text>

            <Text style={styles.label}>
                Número de licencia
            </Text>

            <TextInput
                style={styles.input}
                value={documents.licenseNumber}
                keyboardType="numeric"
                onChangeText={(value) =>
                    handleChange('licenseNumber', value)
                }
                placeholder="Número de licencia"
            />

            <ErrorMessage
                message={errors.licenseNumber}
            />

            <Text style={styles.label}>
                Vencimiento de licencia
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setActiveDateField('licenseExpiration')
                }
            >
                <Text style={styles.dateButtonText}>
                    {documents.licenseExpiration ||
                        'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker('licenseExpiration')}

            <ErrorMessage
                message={errors.licenseExpiration}
            />

            <Text style={styles.label}>
                Vencimiento del SOAT
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setActiveDateField('soatExpiration')
                }
            >
                <Text style={styles.dateButtonText}>
                    {documents.soatExpiration ||
                        'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker('soatExpiration')}

            <ErrorMessage
                message={errors.soatExpiration}
            />

            <Text style={styles.label}>
                Vencimiento de revisión técnico-mecánica
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setActiveDateField(
                        'technicalReviewExpiration'
                    )
                }
            >
                <Text style={styles.dateButtonText}>
                    {documents.technicalReviewExpiration ||
                        'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {renderDatePicker(
                'technicalReviewExpiration'
            )}

            <ErrorMessage
                message={errors.technicalReviewExpiration}
            />

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

            <ErrorMessage
                message={errors.mercadoPagoEmail}
            />

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    Las fotografías actuales de licencia, SOAT y
                    revisión técnico-mecánica se conservarán sin
                    cambios.
                </Text>

                <Text style={styles.infoText}>
                    Términos aceptados: Sí. La comisión acordada es
                    del 20 %.
                </Text>
            </View>

            {saveError ? (
                <Text style={styles.saveError}>
                    {saveError}
                </Text>
            ) : null}

            {saveSuccess ? (
                <Text style={styles.saveSuccess}>
                    {saveSuccess}
                </Text>
            ) : null}

            <TouchableOpacity
                style={[
                    styles.saveButton,
                    isSaving && styles.disabledButton,
                ]}
                disabled={isSaving}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>
                    {isSaving
                        ? 'Guardando...'
                        : 'Guardar cambios'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f4f6f8',
    },
    centeredScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f4f6f8',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        minHeight: 48,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#c7cdd2',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#222',
    },
    dateButton: {
        minHeight: 48,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#c7cdd2',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    dateButtonText: {
        color: '#333',
    },
    error: {
        marginTop: 4,
        color: '#c62828',
        fontSize: 13,
    },
    infoBox: {
        marginTop: 20,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#e3f2fd',
    },
    infoText: {
        color: '#24506b',
        lineHeight: 20,
    },
    saveError: {
        marginTop: 16,
        color: '#c62828',
        textAlign: 'center',
    },
    saveSuccess: {
        marginTop: 16,
        color: '#2e7d32',
        textAlign: 'center',
    },
    saveButton: {
        marginTop: 24,
        marginBottom: 24,
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#1976d2',
    },
    disabledButton: {
        backgroundColor: '#aeb8c2',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
