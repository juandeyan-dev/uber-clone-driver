// AI-assisted: see docs/AI_LOG.md #13
import React, { useState, useEffect } from 'react';

export default function useTripRequests(isAvailable) {
    const [incomingRequests, setIncomingRequests] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        let timeoutId;
        // Se dispara si estás conectado Y no tienes una solicitud activa en pantalla
        if (isAvailable && !incomingRequests) {
            timeoutId = setTimeout(() => {
                const mockRequest = {
                    id: 'trip_' + Date.now(),
                    origin: 'Terminal del Norte',
                    originCoords: { latitude: 6.2778, longitude: -75.5712 },
                    destination: 'Parque Lleras',
                    destinationCoords: { latitude: 6.2088, longitude: -75.5677 },
                    fare: 15000
                };
                setIncomingRequests(mockRequest);
            }, 5000);
        } else if (!isAvailable) {
            // Solo limpia la solicitud si tú apagas el interruptor de disponibilidad
            setIncomingRequests(null);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isAvailable, incomingRequests]); // <-- Aquí vigilamos ambos estados

    useEffect(() => {
        let timerId;
        if (incomingRequests) {
            setTimeLeft(15);
            timerId = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        setIncomingRequests(null);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [incomingRequests]);

    const rejectRequest = () => {
        setIncomingRequests(null);
    };

    return { incomingRequests, timeLeft, rejectRequest };
}