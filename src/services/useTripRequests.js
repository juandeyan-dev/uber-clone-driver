import React, { useState, useEffect } from 'react';

export default function useTripRequests(isAvailable) {
    const [incomingRequests, setIncomingRequests] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        let timeoutId;
        if (isAvailable) {
            timeoutId = setTimeout(() => {
                const mockRequest = {
                    id: 'trip_123',
                    origin: 'Terminal del Norte',
                    originCoords: { latitude: 6.2753, longitude: -75.5694 },
                    destination: 'Parque Lleras',
                    destinationCoords: { latitude: 6.2088, longitude: -75.5677 },
                    fare: 15000
                };
                setIncomingRequests(mockRequest);
            }, 5000);
        } else {
            setIncomingRequests(null);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isAvailable]);

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