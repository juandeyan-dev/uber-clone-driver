import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

export default function useDriverLocation(isAvailable) {

    const [location, setLocation] = useState(null);

    useEffect(() =>{
        let subscription;

        const startTracking = async () =>{
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {

                subscription = await Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 5 },
                    (newLocation) => {
                        setLocation(newLocation)
                    }
                );
            }
            else{
                console.log('Los permisos de ubicación no están disponibles');
            }
        };

        if (isAvailable){
            startTracking();
        }
        

        return () => {
            if (subscription){
                subscription.remove();
            }
            else{
                console.log('No hay suscripción activa para eliminar');
            }
        };

    }, [isAvailable]);
    
    return { location };
};


