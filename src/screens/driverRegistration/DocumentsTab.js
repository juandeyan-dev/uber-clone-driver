import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRegistration } from './RegistrationContext';

// AI-assistant: see docs/AI_LOG.md #4
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export default function DocumentsTab() {
    const { form, updateSection } = useRegistration();
    const documents = form.documents;

    const [errors, setErrors] = useState({});

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
                onPress={() => handleChange('licensePhoto', 'pendiente')}
            >
                <Text>Seleccionar foto</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Vencimiento de licencia</Text>
            <TextInput
                style={styles.input}
                value={documents.licenseExpiration}
                onChangeText={(value) =>
                    handleChange('licenseExpiration', value)
                }
                placeholder="YYYY-MM-DD"
            />
            <ErrorMessage message={errors.licenseExpiration} />

            <Text style={styles.label}>Foto del SOAT</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => handleChange('soatPhoto', 'pendiente')}
            >
                <Text>Seleccionar foto</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Vencimiento del SOAT</Text>
            <TextInput
                style={styles.input}
                value={documents.soatExpiration}
                onChangeText={(value) => handleChange('soatExpiration', value)}
                placeholder="YYYY-MM-DD"
            />
            <ErrorMessage message={errors.soatExpiration} />

            <Text style={styles.label}>Foto de revisión técnico-mecánica</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() =>
                    handleChange('technicalReviewPhoto', 'pendiente')
                }
            >
                <Text>Seleccionar foto</Text>
            </TouchableOpacity>

            <Text style={styles.label}>
                Vencimiento de revisión técnico-mecánica
            </Text>
            <TextInput
                style={styles.input}
                value={documents.technicalReviewExpiration}
                onChangeText={(value) =>
                    handleChange('technicalReviewExpiration', value)
                }
                placeholder="YYYY-MM-DD"
            />
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