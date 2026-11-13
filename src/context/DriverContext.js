// AI-assisted: see docs/AI_LOG.md #14
import React, { createContext, useState } from 'react';

export const DriverContext = createContext();

export function DriverProvider({ children }) {
    const [isAvailable, setIsAvailable] = useState(false);
    const [earnings, setEarnings] = useState(0);
    const [user, setUser] = useState(null); 

    // Función global para sumar el dinero al finalizar un viaje
    const finishTrip = (fare) => {
        setEarnings(prev => prev + Number(fare));
    };

    return (
        <DriverContext.Provider value={{ 
            isAvailable, 
            setIsAvailable, 
            earnings, 
            finishTrip,
            user,
            setUser
        }}>
            {children}
        </DriverContext.Provider>
    );
}