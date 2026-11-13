// AI-assisted: see docs/AI_LOG.md #14, 15, 16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Persistencia del driverId en almacenamiento local y lectura del perfil en tiempo real desde Firestore.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection,doc,onSnapshot,serverTimestamp,setDoc,updateDoc} from 'firebase/firestore';

import { db } from './firebase';

const DRIVER_ID_STORAGE_KEY = '@uber_clone_driver_id';

export async function saveDriverRegistration(form, uploadedUrls) {
    if (!form || !uploadedUrls) {
        throw new Error('Faltan los datos del registro o las imágenes.');
    }

    const requiredUrls = [
        uploadedUrls.profilePhoto,
        uploadedUrls.vehiclePhoto,
        uploadedUrls.licensePhoto,
        uploadedUrls.soatPhoto,
        uploadedUrls.technicalReviewPhoto,
    ];

    if (requiredUrls.some((url) => !url)) {
        throw new Error(
            'Todas las imágenes deben subirse correctamente antes de guardar el registro.'
        );
    }

    const driverReference = doc(collection(db, 'drivers'));

    const driverData = {
        driverId: driverReference.id,
        isApproved: false,
        personal: {
            ...form.personal,
            profilePhoto: uploadedUrls.profilePhoto,
        },
        vehicle: {
            ...form.vehicle,
            vehiclePhoto: uploadedUrls.vehiclePhoto,
        },
        documents: {
            ...form.documents,
            licensePhoto: uploadedUrls.licensePhoto,
            soatPhoto: uploadedUrls.soatPhoto,
            technicalReviewPhoto: uploadedUrls.technicalReviewPhoto,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    try {
        console.log('🔥 [driverService] Intentando escribir en Firestore con ID:', driverReference.id);

        await setDoc(driverReference, driverData);

        console.log('✅ [driverService] ¡Escritura en Firestore exitosa!');
    } catch (error) {
        console.error('❌ [driverService] Error crítico en setDoc:', error);
        throw new Error(`Error al guardar en la base de datos: ${error.message}`);
    }

    return {
        driverId: driverReference.id,
        isApproved: false,
    };
}

export async function updateDriverPersonalData(driverId, personalData) {
    if (!driverId || typeof driverId !== 'string') {
        throw new Error('El driverId no es válido.');
    }

    if (!personalData) {
        throw new Error('Faltan los datos personales del conductor.');
    }

    const driverReference = doc(db, 'drivers', driverId);

    await updateDoc(driverReference, {
        'personal.fullName': personalData.fullName,
        'personal.identityNumber': personalData.identityNumber,
        'personal.phone': personalData.phone,
        'personal.birthDate': personalData.birthDate,
        'personal.gender': personalData.gender,
        'personal.email': personalData.email,
        'personal.language': personalData.language,
        updatedAt: serverTimestamp(),
    });
}

export async function updateDriverPersonalData(driverId, personalData) {
    if (!driverId || typeof driverId !== 'string') {
        throw new Error('El driverId no es válido.');
    }

    if (!personalData) {
        throw new Error('Faltan los datos personales del conductor.');
    }

    const driverReference = doc(db, 'drivers', driverId);

    await updateDoc(driverReference, {
        'personal.fullName': personalData.fullName,
        'personal.identityNumber': personalData.identityNumber,
        'personal.phone': personalData.phone,
        'personal.birthDate': personalData.birthDate,
        'personal.gender': personalData.gender,
        'personal.email': personalData.email,
        'personal.language': personalData.language,
        updatedAt: serverTimestamp(),
    });
}

// Gestión segura del identificador de sesión local en AsyncStorage (sin datos sensibles)
export async function saveDriverId(driverId) {
    if (!driverId || typeof driverId !== 'string') {
        throw new Error('El driverId no es válido.');
    }

    await AsyncStorage.setItem(DRIVER_ID_STORAGE_KEY, driverId);
}

export async function getStoredDriverId() {
    return AsyncStorage.getItem(DRIVER_ID_STORAGE_KEY);
}

export async function clearStoredDriverId() {
    return AsyncStorage.removeItem(DRIVER_ID_STORAGE_KEY);
}

// Suscripción en tiempo real al documento del conductor en Firestore mediante onSnapshot
export function subscribeToDriverProfile(driverId, onProfileChange, onError) {
    if (!driverId || typeof driverId !== 'string') {
        throw new Error('No se puede suscribir el perfil sin un driverId válido.');
    }

    const driverReference = doc(db, 'drivers', driverId);

    return onSnapshot(
        driverReference,
        (snapshot) => {
            if (!snapshot.exists()) {
                onProfileChange(null);
                return;
            }

            onProfileChange({
                id: snapshot.id,
                ...snapshot.data(),
            });
        },
        (error) => {
            if (onError) {
                onError(error);
            }
        }
    );
}