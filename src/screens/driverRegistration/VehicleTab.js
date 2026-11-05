import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { useRegistration } from './RegistrationContext';

//AI-assistant: see docs/AI_LOG.md #4
//aunque sea con ayuda de ia, estoy escribiendo cada linea para entender por mi parte
export default function VehicleTab() {
    const { form, updateSection } = useRegistration();
    const vehicle = form.vehicle;

    const [errors, setErrors] = useState({});

    function updateField(field, value) {
        updateSection('vehicle', field, value);
    }

    function handleChange(field, value) {
        let normalizedValue = value;

        if (field === 'plate') {
            normalizedValue = value.toUpperCase().replace(/\s/g, '');
        }

        updateField(field, normalizedValue);

        let message = '';

        if (!normalizedValue.trim()) {
            message = 'Este campo es obligatorio.';
        }

        if (
            field === 'plate' &&
            normalizedValue.trim() !== '' &&
            !/^[A-Z]{3}\d{3}$/.test(normalizedValue)
        ) {
            message = 'La placa debe tener el formato ABC123.';
        }

        if (
            (field === 'brand' || field === 'model') &&
            normalizedValue.length > 30
        ) {
            message = 'Este campo no puede superar los 30 caracteres.';
        }

        if (
            field === 'year' &&
            normalizedValue.trim() !== '' &&
            !/^\d{4}$/.test(normalizedValue)
        ) {
            message = 'El año debe tener cuatro dígitos.';
        }

        if (
            field === 'capacity' &&
            vehicle.category === 'xl' &&
            normalizedValue.trim() !== '' &&
            Number(normalizedValue) < 6
        ) {
            message = 'La categoría XL requiere mínimo 6 pasajeros.';
        }

        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: message,
        }));
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Vehiculo</Text>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.optionsRow}>
                {[
                    { label: 'Economico', value: 'economy' },
                    { label: 'XL', value: 'xl' },
                    { label: 'Premium', value: 'premium' },
                ].map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.optionButton,
                            vehicle.category === option.value && styles.selectedOption,
                        ]}
                        onPress={() => updateField('category', option.value)}
                    >
                        <Text>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ErrorMessage message={errors.category} />

            <Text style={styles.label}>Placa</Text>
            <TextInput
                style={styles.input}
                value={vehicle.plate}
                maxLength={6}
                onChangeText={(value) => handleChange('plate', value)}
            />
            <ErrorMessage message={errors.plate} />

            <Text style={styles.label}>Marca</Text>
            <TextInput
                style={styles.input}
                value={vehicle.brand}
                maxLength={30}
                onChangeText={(value) => handleChange('brand', value)}
                placeholder="Ejemplo: Chevrolet"
            />
            <ErrorMessage message={errors.brand} />

            <Text style={styles.label}>Modelo</Text>
            <TextInput
                style={styles.input}
                value={vehicle.model}
                maxLength={30}
                onChangeText={(value) => handleChange('model', value)}
                placeholder="Ejemplo: Onix"
            />
            <ErrorMessage message={errors.model} />

            <Text style={styles.label}>Año</Text>
            <TextInput
                style={styles.input}
                value={vehicle.year}
                keyboardType="numeric"
                maxLength={4}
                onChangeText={(value) => handleChange('year', value)}
                placeholder="Ejemplo: 2020"
            />
            <ErrorMessage message={errors.year} />

            <Text style={styles.label}>Color</Text>
            <TextInput
                style={styles.input}
                value={vehicle.color}
                onChangeText={(value) => handleChange('color', value)}
                placeholder="Ejemplo: Rojo"
            />
            <ErrorMessage message={errors.color} />

            <Text style={styles.label}>Capacidad de pasajeros</Text>
            <TextInput
                style={styles.input}
                value={vehicle.capacity}
                keyboardType="numeric"
                onChangeText={(value) => handleChange('capacity', value)}
                placeholder="Ejemplo: 4"
            />
            <ErrorMessage message={errors.capacity} />

            <Text style={styles.label}>Foto del vehículo</Text>
            <TouchableOpacity
                style={styles.photoButton}
                onPress={() => updateField('vehiclePhoto', 'pendiente')}
            >
                <Text>Seleccionar Foto</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>
                la foto debe mostrar la placa. Cloudinary se agregara despues.
            </Text>
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
    optionsRow: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 10,
    },
    selectedOption: {
        backgroundColor: '#d6eaff',
        borderColor: '#1976d2',
    },
    photoButton: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    helperText: {
        color: '#666',
        fontSize: 12,
        marginTop: 5,
    },
});