import React, { createContext, useState } from 'react';

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
    
    const [isAvailable, setIsAvailable] = useState(false);
    
    // Memoria de Ganancias y Viajes
    const [earnings, setEarnings] = useState(0);
    const [completedTrips, setCompletedTrips] = useState(0);

    const finishTrip = (fare) => {
        setEarnings(prev => prev + fare);
        setCompletedTrips(prev => prev + 1);
        setIsAvailable(true);
    };

    return (
        <DriverContext.Provider value={{
            isAvailable,
            setIsAvailable,
            earnings,
            completedTrips,
            finishTrip
        }}>
            {children}
        </DriverContext.Provider>
    );
};