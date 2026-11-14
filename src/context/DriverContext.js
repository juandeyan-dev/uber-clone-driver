// AI-assisted: see docs/AI_LOG.md #15 & #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Contexto global del conductor: gestiona sesión, persistencia y aprobación en tiempo real.

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
    // Estado de disponibilidad del conductor.
    const [isAvailable, setIsAvailable] = useState(false);

    // Datos utilizados por los módulos operativos.
    const [earnings, setEarnings] = useState(0);
    const [completedTrips, setCompletedTrips] = useState(0);
    const [user, setUser] = useState(null);

    // Sesión y perfil actual del conductor.
    const [driverId, setDriverId] = useState(null);
    const [driverProfile, setDriverProfile] = useState(null);

    /*
     * Estados posibles:
     *
     * loading     → verificando AsyncStorage o Firestore
     * no-session  → no existe driverId local
     * pending     → existe perfil, pero no está aprobado
     * approved    → Firestore confirmó isApproved === true
     * error       → ocurrió un error de lectura
     */
    const [sessionReady, setSessionReady] = useState(false);
    const [sessionStatus, setSessionStatus] =
        useState('loading');
    const [sessionError, setSessionError] = useState('');

    // Finaliza un viaje y actualiza las métricas locales.
    function finishTrip(fare) {
        setEarnings(
            (previousEarnings) =>
                previousEarnings + Number(fare)
        );

        setCompletedTrips(
            (previousTrips) => previousTrips + 1
        );

        setIsAvailable(true);
    }

    /*
     * Restaura solamente el driverId local.
     *
     * El driverId no significa que el conductor esté aprobado.
     * La aprobación siempre se confirma después directamente
     * desde Firestore mediante onSnapshot.
     */
    useEffect(() => {
        let isMounted = true;

        async function restoreSession() {
            try {
                const storedDriverId =
                    await getStoredDriverId();

                if (!isMounted) {
                    return;
                }

                if (!storedDriverId) {
                    setDriverId(null);
                    setDriverProfile(null);
                    setIsAvailable(false);
                    setSessionError('');
                    setSessionStatus('no-session');
                    setSessionReady(true);
                    return;
                }

                /*
                 * Existe una sesión local, pero todavía no se
                 * considera aprobada. Se debe consultar Firestore.
                 */
                setDriverId(storedDriverId);
                setDriverProfile(null);
                setIsAvailable(false);
                setSessionError('');
                setSessionStatus('loading');
                setSessionReady(true);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setDriverId(null);
                setDriverProfile(null);
                setIsAvailable(false);
                setSessionError(
                    error?.message ||
                    'Error al restaurar la sesión.'
                );
                setSessionStatus('error');
                setSessionReady(true);
            }
        }

        restoreSession();

        return () => {
            isMounted = false;
        };
    }, []);

    /*
     * Suscripción al perfil actual del conductor.
     *
     * El mapa solamente podrá mostrarse si el callback recibe:
     *
     * profile.isApproved === true
     */
    useEffect(() => {
        if (!sessionReady || !driverId) {
            return undefined;
        }

        let isActive = true;

        setSessionStatus('loading');
        setSessionError('');
        setDriverProfile(null);
        setIsAvailable(false);

        const unsubscribe = subscribeToDriverProfile(
            driverId,
            (profile) => {
                if (!isActive) {
                    return;
                }

                if (!profile) {
                    setDriverProfile(null);
                    setIsAvailable(false);
                    setSessionError(
                        'No se encontró el perfil del conductor.'
                    );
                    setSessionStatus('error');
                    return;
                }

                setDriverProfile(profile);

                /*
                 * Regla principal de seguridad:
                 *
                 * Solamente true permite acceder al mapa.
                 * false, undefined, null o cualquier otro valor
                 * mantienen al conductor en estado pendiente.
                 */
                if (profile.isApproved === true) {
                    setSessionError('');
                    setSessionStatus('approved');
                    return;
                }

                setIsAvailable(false);
                setSessionError('');
                setSessionStatus('pending');
            },
            (error) => {
                if (!isActive) {
                    return;
                }

                setDriverProfile(null);
                setIsAvailable(false);
                setSessionStatus('error');
                setSessionError(
                    error?.message ||
                    'Error al leer el perfil del conductor.'
                );
            }
        );

        return () => {
            isActive = false;
            unsubscribe();
        };
    }, [driverId, sessionReady]);

    /*
     * Inicia la sesión después de guardar correctamente
     * el registro en Firestore.
     */
    async function startDriverSession(newDriverId) {
        if (
            !newDriverId ||
            typeof newDriverId !== 'string'
        ) {
            throw new Error(
                'No se puede iniciar la sesión sin un driverId válido.'
            );
        }

        await saveDriverId(newDriverId);

        setDriverId(newDriverId);
        setDriverProfile(null);
        setIsAvailable(false);
        setSessionError('');
        setSessionReady(true);
        setSessionStatus('loading');
    }

    /*
     * Cierra la sesión y elimina el driverId local.
     */
    async function logoutDriver() {
        setIsAvailable(false);
        setDriverId(null);
        setDriverProfile(null);
        setSessionError('');
        setSessionStatus('no-session');

        await clearStoredDriverId();
    }

    const isApproved =
        driverProfile?.isApproved === true;

    return (
        <DriverContext.Provider
            value={{
                isAvailable,
                setIsAvailable,

                earnings,
                setEarnings,

                completedTrips,
                setCompletedTrips,

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

export function useDriverSession() {
    const context = useContext(DriverContext);

    if (!context) {
        throw new Error(
            'useDriverSession debe usarse dentro de DriverProvider.'
        );
    }

    return context;
}
