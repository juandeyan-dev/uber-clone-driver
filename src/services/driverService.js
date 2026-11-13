// AI-assisted: see docs/AI_LOG.md #14
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

import {collection,doc,serverTimestamp,setDoc,} from 'firebase/firestore';
import { db } from './firebase';

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

        // Este valor siempre se establece desde la aplicación.
        // El conductor no puede aprobarse a sí mismo.
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

    await setDoc(driverReference, driverData);

    return {
        driverId: driverReference.id,
        isApproved: false,
    };
}
