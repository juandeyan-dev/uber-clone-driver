// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Pantalla para editar únicamente los datos personales del conductor de forma aislada y segura.

import React, { useEffect, useState } from 'react';
import {ActivityIndicator,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';

import { useDriverSession } from '../../context/DriverContext';
import { updateDriverPersonalData } from '../../services/driverService';

/**
 * Componente auxiliar para renderizar mensajes de error bajo cada campo de texto.
 */
function ErrorMessage({ message }) {
    if (!message) {
        return null;
    }

    return (
        <Text style={styles.errorMessage}>
            {message}
        </Text>
    );
}

/**
 * Validador estricto para los campos del formulario personal.
 * Asegura que cumplan con la longitud y formato requeridos (nombre sin números, celular de 10 dígitos, etc.).
 */
function validatePersonalData(personal) {
    const errors = {};

    const fullName = personal.fullName.trim();
    const identityNumber = personal.identityNumber.trim();
    const phone = personal.phone.trim();
    const email = personal.email.trim();

    // Validación del Nombre Completo
    if (!fullName) {
        errors.fullName = 'El nombre completo es obligatorio.';
    } else if (fullName.length > 50) {
        errors.fullName = 'El nombre no puede superar 50 caracteres.';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(fullName)) {
        errors.fullName = 'El nombre solo puede contener letras y espacios.';
    }

    // Validación del Documento de Identidad (6 a 10 dígitos numéricos)
    if (!identityNumber) {
        errors.identityNumber = 'El documento es obligatorio.';
    } else if (!/^\d{6,10}$/.test(identityNumber)) {
        errors.identityNumber =
            'El documento debe tener entre 6 y 10 dígitos.';
    }

    // Validación estricta del Celular (Exactamente 10 dígitos)
    if (!phone) {
        errors.phone = 'El número de celular es obligatorio.';
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone =
            'El número de celular debe tener exactamente 10 dígitos.';
    }

    if (!personal.birthDate.trim()) {
        errors.birthDate = 'La fecha de nacimiento es obligatoria.';
    }

    if (!personal.gender.trim()) {
        errors.gender = 'Selecciona un género.';
    }

    // Validación de formato de correo electrónico mediante RegEx
    if (!email) {
        errors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!personal.language.trim()) {
        errors.language = 'Selecciona un idioma.';
    }

    return errors;
}

export default function EditPersonalDataScreen({ navigation }) {
    // Obtenemos el driverId y el perfil actual desde el contexto global
    const {
        driverId,
        driverProfile,
        sessionStatus,
    } = useDriverSession();

    // Estado local para manejar los campos del formulario editable
    const [personal, setPersonal] = useState({
        fullName: '',
        identityNumber: '',
        phone: '',
        birthDate: '',
        gender: '',
        email: '',
        language: '',
    });

    // Estados para control de errores, carga y alertas de éxito/fallo
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');

    // useEffect para precargar los datos actuales del conductor en cuanto el perfil esté disponible
    useEffect(() => {
        if (!driverProfile?.personal) {
            return;
        }

        setPersonal({
            fullName: driverProfile.personal.fullName || '',
            identityNumber: driverProfile.personal.identityNumber || '',
            phone: driverProfile.personal.phone || '',
            birthDate: driverProfile.personal.birthDate || '',
            gender: driverProfile.personal.gender || '',
            email: driverProfile.personal.email || '',
            language: driverProfile.personal.language || '',
        });
    }, [driverProfile]);

    /**
     * Manejador de cambios en tiempo real con saneamiento de entradas (filtra letras en números).
     */
    function handleChange(field, value) {
        let normalizedValue = value;

        // Limpia caracteres no numéricos en documentos y teléfonos
        if (
            field === 'identityNumber' ||
            field === 'phone'
        ) {
            normalizedValue = value.replace(/\D/g, '');
        }

        // Evita espacios dobles consecutivos en el nombre
        if (field === 'fullName') {
            normalizedValue = value.replace(/\s{2,}/g, ' ');
        }

        setPersonal((previousPersonal) => ({
            ...previousPersonal,
            [field]: normalizedValue,
        }));

        // Limpia el error del campo específico al empezar a escribir
        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: '',
        }));

        setSaveError('');
        setSaveSuccess('');
    }

    /**
     * Ejecuta las validaciones y procede a guardar los cambios en Firestore de manera asíncrona.
     */
    async function handleSave() {
        const validationErrors = validatePersonalData(personal);

        setErrors(validationErrors);
        setSaveError('');
        setSaveSuccess('');

        // Si hay errores de validación, detenemos el proceso
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
            // Llamada al servicio encargado de hacer el updateDoc en Firestore
            await updateDriverPersonalData(driverId, personal);

            setSaveSuccess(
                'Los datos personales se actualizaron correctamente.'
            );

            // Regresa a la pantalla anterior automáticamente después de un breve retraso visual
            setTimeout(() => {
                navigation.goBack();
            }, 800);
        } catch (error) {
            console.error(
                'Error al actualizar los datos personales:',
                error
            );

            setSaveError(
                error?.message ||
                'No fue posible actualizar los datos personales.'
            );
        } finally {
            setIsSaving(false);
        }
    }

    // Pantalla de carga mientras se sincroniza el perfil
    if (sessionStatus === 'loading' || !driverProfile) {
        return (
            <View style={styles.centeredScreen}>
                <ActivityIndicator
                    size="large"
                    color="#1976d2"
                />
                <Text style={styles.loadingText}>
                    Cargando datos personales...
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
                Editar datos personales
            </Text>

            {/* Campo: Nombre completo */}
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
                style={styles.input}
                value={personal.fullName}
                maxLength={50}
                onChangeText={(value) =>
                    handleChange('fullName', value)
                }
                placeholder="Nombre completo"
            />
            <ErrorMessage message={errors.fullName} />

            {/* Campo: Documento de identidad */}
            <Text style={styles.label}>Documento de identidad</Text>
            <TextInput
                style={styles.input}
                value={personal.identityNumber}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(value) =>
                    handleChange('identityNumber', value)
                }
                placeholder="Número de documento"
            />
            <ErrorMessage message={errors.identityNumber} />

            {/* Campo: Número de celular */}
            <Text style={styles.label}>Número de celular</Text>
            <TextInput
                style={styles.input}
                value={personal.phone}
                keyboardType="phone-pad"
                maxLength={10}
                onChangeText={(value) =>
                    handleChange('phone', value)
                }
                placeholder="Número de celular"
            />
            <ErrorMessage message={errors.phone} />

            {/* Campo: Fecha de nacimiento */}
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <TextInput
                style={styles.input}
                value={personal.birthDate}
                onChangeText={(value) =>
                    handleChange('birthDate', value)
                }
                placeholder="AAAA-MM-DD"
            />
            <ErrorMessage message={errors.birthDate} />

            {/* Campo: Género (Opciones interactivas tipo botón) */}
            <Text style={styles.label}>Género</Text>
            <View style={styles.optionsRow}>
                {[
                    { label: 'Femenino', value: 'femenino' },
                    { label: 'Masculino', value: 'masculino' },
                    { label: 'Otro', value: 'otro' },
                ].map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.optionButton,
                            personal.gender === option.value &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                            handleChange('gender', option.value)
                        }
                    >
                        <Text
                            style={[
                                styles.optionText,
                                personal.gender === option.value &&
                                styles.selectedOptionText,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ErrorMessage message={errors.gender} />

            {/* Campo: Correo electrónico */}
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                value={personal.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) =>
                    handleChange('email', value.trim())
                }
                placeholder="correo@ejemplo.com"
            />
            <ErrorMessage message={errors.email} />

            {/* Campo: Idioma */}
            <Text style={styles.label}>Idioma</Text>
            <View style={styles.optionsRow}>
                {[
                    { label: 'Español', value: 'es' },
                    { label: 'Inglés', value: 'en' },
                ].map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.optionButton,
                            personal.language === option.value &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                            handleChange('language', option.value)
                        }
                    >
                        <Text
                            style={[
                                styles.optionText,
                                personal.language === option.value &&
                                styles.selectedOptionText,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ErrorMessage message={errors.language} />

            {/* Mensajes de feedback global (Error o Éxito) */}
            {saveError ? (
                <Text style={styles.saveError}>{saveError}</Text>
            ) : null}

            {saveSuccess ? (
                <Text style={styles.saveSuccess}>{saveSuccess}</Text>
            ) : null}

            {/* Botón principal de Guardar cambios */}
            <TouchableOpacity
                style={[
                    styles.saveButton,
                    isSaving && styles.disabledButton,
                ]}
                disabled={isSaving}
                onPress={handleSave}
            >
                <Text style={styles.saveButtonText}>
                    {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// Estilos visuales organizados para la interfaz de edición
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
    errorMessage: {
        marginTop: 4,
        color: '#c62828',
        fontSize: 13,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
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
        color: '#333',
        fontSize: 14,
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: 'bold',
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