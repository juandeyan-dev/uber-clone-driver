import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRegistration } from './RegistrationContext'; // AI-assistant: see docs/AI_LOG.md #8

// AI-assistant: see docs/AI_LOG.md #4, se agregan modificaciones #8
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export default function PersonalDataTab() {
    const { form, updateSection } = useRegistration();
    const personal = form.personal;

    const [errors, setErrors] = useState({});
    const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);

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

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function handleBirthDateChange(event, selectedDate) {
        setShowBirthDatePicker(false)

        if (!selectedDate) {
            return;
        }

        const formattedDate = formatDate(selectedDate);

        updateField('birthDate', formattedDate);
        validateFields('birthDate', formattedDate)
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
            <ErrorMessage message={errors.fullName}/>

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

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowBirthDatePicker(true)}
            >
                <Text style={styles.dateButtonText}>
                    {personal.birthDate || 'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>

            {showBirthDatePicker && (
                <DateTimePicker
                    value={
                        personal.birthDate
                            ? new Date(`${personal.birthDate}T12:00:00`)
                            : new Date(2000, 0, 1)
                    }
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={handleBirthDateChange}
                />
            )}

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
    dateButton: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    dateButtonText: {
        color: '#333',
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