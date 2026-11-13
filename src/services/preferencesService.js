// AI-assisted: see docs/AI_LOG.md #16
// Persistencia local de preferencias no sensibles de la aplicación.
// No se guardan datos bancarios, documentos, fotografías ni estados de aprobación.

import AsyncStorage from '@react-native-async-storage/async-storage';

const DRIVER_PREFERENCES_STORAGE_KEY =
    '@uber_clone_driver_preferences';

const defaultPreferences = {
    language: 'es',
};

export async function getDriverPreferences() {
    const storedPreferences = await AsyncStorage.getItem(
        DRIVER_PREFERENCES_STORAGE_KEY
    );

    if (!storedPreferences) {
        return defaultPreferences;
    }

    try {
        return {
            ...defaultPreferences,
            ...JSON.parse(storedPreferences),
        };
    } catch (error) {
        console.error(
            'Error al leer las preferencias del conductor:',
            error
        );

        return defaultPreferences;
    }
}

export async function saveDriverPreferences(preferences) {
    if (!preferences || typeof preferences !== 'object') {
        throw new Error('Las preferencias no son válidas.');
    }

    const preferencesToSave = {
        ...defaultPreferences,
        ...preferences,
    };

    await AsyncStorage.setItem(
        DRIVER_PREFERENCES_STORAGE_KEY,
        JSON.stringify(preferencesToSave)
    );

    return preferencesToSave;
}

export async function clearDriverPreferences() {
    await AsyncStorage.removeItem(
        DRIVER_PREFERENCES_STORAGE_KEY
    );
}
