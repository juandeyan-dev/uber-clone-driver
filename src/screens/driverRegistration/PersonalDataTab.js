import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRegistration } from './RegistrationContext';

// AI-assistant: see docs/AI_LOG.md #4
//aunque sea con ayuda de ia, estoy escribiendo cada linea para entender por mi parte
export default function PersonalDataTab() {
    const { form, updateSection } = useRegistration();
    const personal = form.personal;

    const [errors, setErrors] = useState({});

    function updateField(field, value) {
        updateSection('personal', field, value);
    }

    function validateFields(field, value) {
        let message = '';

        if (!value.trim()) {
            message = 'Este campo es obligatorio';
        }

        if (field === 'fullName' && value.length > 50) {
            message = 'El nombre completo no puede exceder los 50 caracteres';
        }

        if (
            field === 'fullName' &&
            value.trim() &&
            !/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(value)
        ) {
            message = 'El nombre solo puede tener letras y espacios';
        }

        if (
            field === 'identityNumber' &&
            value.trim() !== '' &&
            !/^\d{6,10}$/.test(value)
        ) {
            message = 'Debe contener entre 6 y 10 dígitos';
        }

        if (
            field === 'phone' &&
            value.trim() !== '' &&
            !/^\d{10}$/.test(value)
        ) {
            message = 'Debe contener exactamente 10 dígitos';
        }

        if (
            field === 'email' &&
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

    function handleChange(field, value) {
        updateField(field, value);
        validateFields(field, value);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Datos Personales</Text>

            <Text style={styles.label}>Foto de perfil</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => updateField('profilePhoto', 'pendiente')}
            >
                <Text>Seleccionar Foto</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>La carga con Cloudinary se implementara despues.</Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
                style={styles.input}
                value={personal.fullName}
                onChangeText={(value) => handleChange('fullName', value)}
                placeholder="Ejemplo: Stiven Hernandez"
            />
            <ErrorMessage message={errors.fullName} />

            <Text style={styles.label}>Documento de identidad</Text>
            <TextInput
                style={styles.input}
                value={personal.identityNumber}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('identityNumber', value)}
                placeholder="Entre 6 y 10 dígitos"
            />
            <ErrorMessage message={errors.identityNumber} />

            <Text style={styles.label}>Numero de celular</Text>
            <TextInput
                style={styles.input}
                value={personal.phone}
                keyboardType="phone-pad"
                onChangeText={(value) => handleChange('phone', value)}
                placeholder="10 dígitos"
            />
            <ErrorMessage message={errors.phone} />

            <Text style={styles.label}>Fecha de nacimiento</Text>
            <TextInput
                style={styles.input}
                value={personal.birthDate}
                onChangeText={(value) => handleChange('birthDate', value)}
                placeholder="YYYY-MM-DD"
            />
            <ErrorMessage message={errors.birthDate} />

            <Text style={styles.label}>Genero</Text>
            <TextInput
                style={styles.input}
                value={personal.gender}
                onChangeText={(value) => handleChange('gender', value)}
                placeholder="Masculino/Femenino/travesti"
            />
            <ErrorMessage message={errors.gender} />

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                value={personal.email}
                keyboardType="email-address"
                onChangeText={(value) => handleChange('email', value)}
                placeholder="hola123@dominio.com"
            />
            <ErrorMessage message={errors.email} />

            <Text style={styles.label}>Idioma</Text>
            <View style={styles.languageContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        personal.language === 'es' && styles.selectedOptionButton,
                    ]}
                    onPress={() => updateField('language', 'es')}
                >
                    <Text>Español</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        personal.language === 'en' && styles.selectedOptionButton,
                    ]}
                    onPress={() => updateField('language', 'en')}
                >
                    <Text>Inglés</Text>
                </TouchableOpacity>
            </View>
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
    error: {
        color: '#c62828',
        marginTop: 4,
        fontSize: 12,
    },
    helperText: {
        color: '#666',
        fontSize: 12,
        marginTop: 5,
    },
    photoButton: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    languageContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
    },
    selectedOption: {
        backgroundColor: '#d6eaff',
        borderColor: '#1976d2',
    },
});