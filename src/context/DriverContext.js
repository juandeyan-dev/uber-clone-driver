// AI-assisted: see docs/AI_LOG.md #15 & #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Contexto global del conductor: gestiona sesión, persistencia del driverId y escucha en tiempo real de isApproved en Firestore.

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    clearStoredDriverId,
    getStoredDriverId,
    saveDriverId,
    subscribeToDriverProfile,
} from '../services/driverService';

export const DriverContext = createContext(null);

export function DriverProvider({ children }) {
    // Estado de disponibilidad del conductor en el mapa
    const [isAvailable, setIsAvailable] = useState(false);

    // Memoria local de ganancias y viajes completados
    const [earnings, setEarnings] = useState(0);
    const [completedTrips, setCompletedTrips] = useState(0);
    const [user, setUser] = useState(null); 

    // Estados de sesión, perfil y sincronización con Firestore
    const [driverId, setDriverId] = useState(null);
    const [driverProfile, setDriverProfile] = useState(null);
    const [sessionReady, setSessionReady] = useState(false);
    const [sessionStatus, setSessionStatus] = useState('loading'); // loading, no-session, pending, approved, error
    const [sessionError, setSessionError] = useState('');

    // Finaliza un viaje activo, suma ganancias y marca al conductor como disponible de nuevo
    const finishTrip = (fare) => {
        setEarnings((previousEarnings) => previousEarnings + Number(fare));
        setCompletedTrips((previousTrips) => previousTrips + 1);
        setIsAvailable(true);
    };

    // 1. Restaura únicamente el driverId guardado en AsyncStorage al iniciar la app
    useEffect(() => {
        let isMounted = true;

        async function restoreSession() {
            try {
                const storedDriverId = await getStoredDriverId();

                if (!isMounted) return;

                setDriverId(storedDriverId || null);
                setSessionReady(true);

                if (!storedDriverId) {
                    setSessionStatus('no-session');
                }
            } catch (error) {
                if (!isMounted) return;

                setSessionError(error?.message || 'Error al restaurar sesión.');
                setSessionStatus('error');
                setSessionReady(true);
            }
        }

        restoreSession();

        return () => {
            isMounted = false;
        };
    }, []);

    // 2. Suscripción en tiempo real (onSnapshot) al documento de Firestore para verificar isApproved
    useEffect(() => {
        if (!sessionReady || !driverId) return undefined;

        setSessionStatus('loading');
        setSessionError('');

        const unsubscribe = subscribeToDriverProfile(
            driverId,
            (profile) => {
                if (!profile) {
                    setDriverProfile(null);
                    setSessionStatus('error');
                    setSessionError('Perfil no encontrado en Firestore.');
                    return;
                }

                setDriverProfile(profile);

                // Control central de acceso operativo según estado de aprobación
                if (profile.isApproved === true) {
                    setSessionStatus('approved');
                } else {
                    setSessionStatus('pending');
                    setIsAvailable(false); // Seguridad: bloquea disponibilidad si no está aprobado
                }
            },
            (error) => {
                setSessionStatus('error');
                setSessionError(error?.message || 'Error al leer el perfil.');
            }
        );

        return unsubscribe;
    }, [driverId, sessionReady]);

    // Inicia sesión guardando el ID localmente y activando la escucha
    async function startDriverSession(newDriverId) {
        await saveDriverId(newDriverId);
        setDriverId(newDriverId);
        setDriverProfile(null);
        setSessionError('');
        setSessionReady(true);
        setSessionStatus('loading');
    }

    // Cierra sesión limpiando el almacenamiento local
    async function logoutDriver() {
        setIsAvailable(false);
        setDriverId(null);
        setDriverProfile(null);
        setSessionStatus('no-session');
        setSessionError('');
        await clearStoredDriverId();
    }

    const isApproved = driverProfile?.isApproved === true;

    return (
        <DriverContext.Provider
            value={{
                isAvailable,
                setIsAvailable,
                earnings,
                completedTrips,
                finishTrip,
                driverId,
                driverProfile,
                isApproved,
                sessionReady,
                sessionStatus,
                sessionError,
                startDriverSession,
                logoutDriver,
                user,
                setUser,
            }}
        >
            {children}
        </DriverContext.Provider>
    );
}

// Hook personalizado para consumir el contexto de forma limpia
export function useDriverSession() {
    const context = useContext(DriverContext);
    if (!context) {
        throw new Error('useDriverSession debe usarse dentro de un DriverProvider.');
    }
    return context;
}