// AI-assisted: see docs/AI_LOG.md #14
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

const CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1';

export async function uploadImageToCloudinary(imageUri, folder) {
    if (!imageUri) {
        throw new Error('No se recibió una imagen para subir.');
    }

    const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error(
            'Faltan las variables de configuración de Cloudinary.'
        );
    }

    const formData = new FormData();

    formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `${folder}-${Date.now()}.jpg`,
    });

    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    const response = await fetch(
        `${CLOUDINARY_UPLOAD_URL}/${cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error?.message || 'No fue posible subir la imagen.'
        );
    }

    return data.secure_url;
}