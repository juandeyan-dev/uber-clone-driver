// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Pantalla de preferencias locales del conductor.

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    getDriverPreferences,
    saveDriverPreferences,
} from '../../services/preferencesService';

export default function DriverPreferencesScreen() {
    const [language, setLanguage] = useState('es');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        async function loadPreferences() {
            try {
                const storedPreferences =
                    await getDriverPreferences();

                setLanguage(
                    storedPreferences.language || 'es'
                );
            } catch (error) {
                console.error(
                    'Error al cargar las preferencias:',
                    error
                );

                setSaveError(
                    'No fue posible cargar las preferencias.'
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadPreferences();
    }, []);

    async function handleSave() {
        setIsSaving(true);
        setSaveMessage('');
        setSaveError('');

        try {
            await saveDriverPreferences({
                language,
            });

            setSaveMessage(
                'Las preferencias se guardaron correctamente.'
            );
        } catch (error) {
            console.error(
                'Error al guardar las preferencias:',
                error
            );

            setSaveError(
                error?.message ||
                'No fue posible guardar las preferencias.'
            );
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <View style={styles.centeredScreen}>
                <ActivityIndicator
                    size="large"
                    color="#1976d2"
                />

                <Text style={styles.loadingText}>
                    Cargando preferencias...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Preferencias
            </Text>

            <Text style={styles.label}>
                Idioma de la aplicación
            </Text>

            <View style={styles.optionsRow}>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        language === 'es' &&
                        styles.selectedOption,
                    ]}
                    onPress={() => {
                        setLanguage('es');
                        setSaveMessage('');
                        setSaveError('');
                    }}
                >
                    <Text
                        style={[
                            styles.optionText,
                            language === 'es' &&
                            styles.selectedOptionText,
                        ]}
                    >
                        Español
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        language === 'en' &&
                        styles.selectedOption,
                    ]}
                    onPress={() => {
                        setLanguage('en');
                        setSaveMessage('');
                        setSaveError('');
                    }}
                >
                    <Text
                        style={[
                            styles.optionText,
                            language === 'en' &&
                            styles.selectedOptionText,
                        ]}
                    >
                        Inglés
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>
                Esta preferencia se guarda únicamente en este
                dispositivo. No modifica el perfil almacenado en
                Firestore.
            </Text>

            {saveMessage ? (
                <Text style={styles.saveMessage}>
                    {saveMessage}
                </Text>
            ) : null}

            {saveError ? (
                <Text style={styles.saveError}>
                    {saveError}
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
                        : 'Guardar preferencias'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 24,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
    },
    label: {
        marginBottom: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: '#c7cdd2',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    selectedOption: {
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
    },
    optionText: {
        fontSize: 15,
        color: '#333',
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    helperText: {
        marginTop: 16,
        lineHeight: 20,
        color: '#666',
        fontSize: 13,
    },
    saveMessage: {
        marginTop: 20,
        color: '#2e7d32',
        textAlign: 'center',
    },
    saveError: {
        marginTop: 20,
        color: '#c62828',
        textAlign: 'center',
    },
    saveButton: {
        marginTop: 24,
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
