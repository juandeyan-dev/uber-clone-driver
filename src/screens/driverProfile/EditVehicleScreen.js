// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Pantalla para editar los datos del vehículo sin modificar su fotografía existente.

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

import { useDriverSession } from '../../context/DriverContext';
import { updateDriverVehicleData } from '../../services/driverService';

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

function validateVehicle(vehicle) {
    const errors = {};

    const category = vehicle.category.trim();
    const plate = vehicle.plate.trim().toUpperCase();
    const brand = vehicle.brand.trim();
    const model = vehicle.model.trim();
    const year = vehicle.year.trim();
    const color = vehicle.color.trim();
    const capacity = vehicle.capacity.trim();

    if (!category) {
        errors.category = 'La categoría es obligatoria.';
    }

    if (!plate) {
        errors.plate = 'La placa es obligatoria.';
    } else if (!/^[A-Z]{3}\d{3}$/.test(plate)) {
        errors.plate = 'La placa debe tener el formato ABC123.';
    }

    if (!brand) {
        errors.brand = 'La marca es obligatoria.';
    } else if (brand.length > 30) {
        errors.brand = 'La marca no puede superar 30 caracteres.';
    }

    if (!model) {
        errors.model = 'El modelo es obligatorio.';
    } else if (model.length > 30) {
        errors.model = 'El modelo no puede superar 30 caracteres.';
    }

    if (!/^\d{4}$/.test(year)) {
        errors.year = 'El año debe tener cuatro dígitos.';
    } else if (Number(year) > new Date().getFullYear()) {
        errors.year =
            'El año no puede ser superior al año actual.';
    }

    if (!color) {
        errors.color = 'El color es obligatorio.';
    }

    if (!/^\d+$/.test(capacity)) {
        errors.capacity =
            'La capacidad debe ser numérica.';
    } else if (Number(capacity) <= 0) {
        errors.capacity =
            'La capacidad debe ser mayor que cero.';
    } else if (
        category === 'xl' &&
        Number(capacity) < 6
    ) {
        errors.capacity =
            'La categoría XL requiere mínimo 6 pasajeros.';
    }

    return errors;
}

export default function EditVehicleScreen({ navigation }) {
    const {
        driverId,
        driverProfile,
        sessionStatus,
    } = useDriverSession();

    const [vehicle, setVehicle] = useState({
        category: '',
        plate: '',
        brand: '',
        model: '',
        year: '',
        color: '',
        capacity: '',
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');

    // Carga los datos actuales recibidos desde Firestore.
    useEffect(() => {
        if (!driverProfile?.vehicle) {
            return;
        }

        setVehicle({
            category: driverProfile.vehicle.category || '',
            plate: driverProfile.vehicle.plate || '',
            brand: driverProfile.vehicle.brand || '',
            model: driverProfile.vehicle.model || '',
            year: String(driverProfile.vehicle.year || ''),
            color: driverProfile.vehicle.color || '',
            capacity: String(
                driverProfile.vehicle.capacity || ''
            ),
        });
    }, [driverProfile]);

    function handleChange(field, value) {
        let normalizedValue = value;

        if (field === 'plate') {
            normalizedValue = value
                .toUpperCase()
                .replace(/\s/g, '');
        }

        if (field === 'year' || field === 'capacity') {
            normalizedValue = value.replace(/\D/g, '');
        }

        setVehicle((previousVehicle) => ({
            ...previousVehicle,
            [field]: normalizedValue,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: '',
        }));

        setSaveError('');
        setSaveSuccess('');
    }

    function handleCategoryChange(category) {
        setVehicle((previousVehicle) => ({
            ...previousVehicle,
            category,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            category: '',
            capacity: '',
        }));

        setSaveError('');
        setSaveSuccess('');
    }

    async function handleSave() {
        const normalizedVehicle = {
            ...vehicle,
            plate: vehicle.plate
                .toUpperCase()
                .replace(/\s/g, ''),
            brand: vehicle.brand.trim(),
            model: vehicle.model.trim(),
            color: vehicle.color.trim(),
        };

        const validationErrors =
            validateVehicle(normalizedVehicle);

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
            await updateDriverVehicleData(
                driverId,
                normalizedVehicle
            );

            setSaveSuccess(
                'Los datos del vehículo se actualizaron correctamente.'
            );

            setTimeout(() => {
                navigation.goBack();
            }, 800);
        } catch (error) {
            console.error(
                'Error al actualizar los datos del vehículo:',
                error
            );

            setSaveError(
                error?.message ||
                'No fue posible actualizar los datos del vehículo.'
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
                    Cargando datos del vehículo...
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
                Editar vehículo
            </Text>

            <Text style={styles.label}>
                Categoría
            </Text>

            <View style={styles.optionsRow}>
                {[
                    { label: 'Económico', value: 'economy' },
                    { label: 'XL', value: 'xl' },
                    { label: 'Premium', value: 'premium' },
                ].map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.optionButton,
                            vehicle.category === option.value &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                            handleCategoryChange(option.value)
                        }
                    >
                        <Text
                            style={[
                                styles.optionText,
                                vehicle.category === option.value &&
                                styles.selectedOptionText,
                            ]}
                        >
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ErrorMessage message={errors.category} />

            <Text style={styles.label}>
                Placa
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.plate}
                maxLength={6}
                autoCapitalize="characters"
                onChangeText={(value) =>
                    handleChange('plate', value)
                }
                placeholder="ABC123"
            />

            <ErrorMessage message={errors.plate} />

            <Text style={styles.label}>
                Marca
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.brand}
                maxLength={30}
                onChangeText={(value) =>
                    handleChange('brand', value)
                }
                placeholder="Ejemplo: Chevrolet"
            />

            <ErrorMessage message={errors.brand} />

            <Text style={styles.label}>
                Modelo
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.model}
                maxLength={30}
                onChangeText={(value) =>
                    handleChange('model', value)
                }
                placeholder="Ejemplo: Onix"
            />

            <ErrorMessage message={errors.model} />

            <Text style={styles.label}>
                Año
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.year}
                keyboardType="numeric"
                maxLength={4}
                onChangeText={(value) =>
                    handleChange('year', value)
                }
                placeholder="Ejemplo: 2020"
            />

            <ErrorMessage message={errors.year} />

            <Text style={styles.label}>
                Color
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.color}
                onChangeText={(value) =>
                    handleChange('color', value)
                }
                placeholder="Ejemplo: Rojo"
            />

            <ErrorMessage message={errors.color} />

            <Text style={styles.label}>
                Capacidad de pasajeros
            </Text>

            <TextInput
                style={styles.input}
                value={vehicle.capacity}
                keyboardType="numeric"
                onChangeText={(value) =>
                    handleChange('capacity', value)
                }
                placeholder="Ejemplo: 4"
            />

            <ErrorMessage message={errors.capacity} />

            <Text style={styles.helperText}>
                La fotografía actual del vehículo se conservará
                sin cambios.
            </Text>

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
    error: {
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
    helperText: {
        marginTop: 8,
        color: '#666',
        fontSize: 12,
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
