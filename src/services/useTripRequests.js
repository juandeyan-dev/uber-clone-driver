import React, { useState, useEffect } from 'react';

export default function useTripRequests(isAvailable) {

    const [incomingRequests, setIncomingRequests] = useState(null);

    useEffect(() => {

        let timeoutId;

        if (isAvailable) {
            timeoutId = setTimeout(() => {
                // Simulación de una solicitud entrante
                const mockRequest = {
                    id: 'trip_123',
                    origin: 'Terminal del Norte',
                    destination: 'Parque Lleras',
                    fare: 15000
                };
                setIncomingRequests(mockRequest);
            }, 5000);
        }
        else {
            setIncomingRequests(null);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };

    }, [isAvailable]);

    return { incomingRequests };

}