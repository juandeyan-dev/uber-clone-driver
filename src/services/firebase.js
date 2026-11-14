// AI-assisted: see docs/AI_LOG.md #14
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// 1. Inicializar la app de Firebase de manera segura (evita duplicados con Hot Reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Inicializar Firestore con Long Polling de forma segura ante recargas en caliente
let dbInstance;
try {
    dbInstance = initializeFirestore(app, {
        experimentalForceLongPolling: true,
    });
} catch (error) {
    // Si ya había una instancia previa en memoria, la recuperamos sin lanzar error
    dbInstance = getFirestore(app);
}

export const db = dbInstance;