// AI-assisted: see docs/AI_LOG.md #14
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

import * as FileSystem from 'expo-file-system/legacy';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1';

export async function uploadImageToCloudinary(imageUri, folder) {
    // 1. Validar que la URI de la imagen exista antes de procesar
    if (!imageUri) {
        throw new Error('No se recibió una imagen para subir.');
    }

    const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    // 2. Verificar credenciales de configuración de Cloudinary en variables de entorno
    if (!cloudName || !uploadPreset) {
        throw new Error(
            'Faltan las variables de configuración de Cloudinary.'
        );
    }

    try {
        let base64Data = imageUri;

        // 3. Convertir la ruta local a Base64 si no viene formateada previamente
        if (!imageUri.startsWith('data:image')) {
            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const extension = imageUri.split('.').pop() || 'jpg';
            const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';

            base64Data = `data:${mimeType};base64,${base64}`;
        }

        // 4. Enviar la imagen optimizada en formato JSON a Cloudinary
        const uploadResponse = await fetch(
            `${CLOUDINARY_UPLOAD_URL}/${cloudName}/image/upload`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: base64Data,
                    upload_preset: uploadPreset,
                    folder: folder,
                }),
            }
        );

        const data = await uploadResponse.json();

        // 5. Validar la respuesta de la API y retornar la URL segura
        if (!uploadResponse.ok) {
            throw new Error(
                data?.error?.message || 'No fue posible subir la imagen a Cloudinary.'
            );
        }

        return data.secure_url;
    } catch (error) {
        console.error('Error detallado en Cloudinary:', error);
        throw error;
    }
}