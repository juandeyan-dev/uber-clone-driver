import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';

import { DriverContext } from '../context/DriverContext';
import FreeMap from '../components/FreeMap';
import useDriverLocation from '../services/useDriverLocation';
import useTripRequests from '../services/useTripRequests';

export default function MapScreen({ navigation }) {
    const { isAvailable, setIsAvailable, earnings } = useContext(DriverContext);
    const { location } = useDriverLocation(isAvailable);
    const { incomingRequests, timeLeft, rejectRequest } = useTripRequests(isAvailable);
    
    const [isApproved, setIsApproved] = useState(true);   

    const acceptTrip = () => {
        const acceptedTripData = incomingRequests;
        rejectRequest(); 
        navigation.navigate('ActiveTrip', { trip: acceptedTripData });
    };

    return (
        <View style={{ flex: 1 }}>
            {/* AQUÍ INYECTAMOS EL NUEVO MAPA GRATUITO */}
            <FreeMap driverLocation={location?.coords} />

            <View style={styles.earningsBadge}>
                <Text style={styles.earningsText}>Ganancias: ${earnings}</Text>
            </View>

            {!isApproved && (
                <View style={styles.warningBanner}>
                    <Text style={{ color: '#c62828', textAlign: 'center', fontWeight: 'bold' }}>
                        Tu cuenta está pendiente. No puedes recibir viajes.
                    </Text>
                </View>
            )}

            {incomingRequests != null ? (
                <View style={styles.bottomCard}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>¡Nuevo Viaje!</Text>
                    <Text>📍 Origen: {incomingRequests.origin}</Text>
                    <Text>🏁 Destino: {incomingRequests.destination}</Text>
                    <Text style={{ marginTop: 10, fontSize: 16, color: 'green', fontWeight: 'bold' }}>
                        💵 Tarifa estimada: ${incomingRequests.fare}
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#c62828', marginTop: 10 }}>
                        ⏳ {timeLeft}s
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity 
                            onPress={acceptTrip}
                            style={{ backgroundColor: '#2e7d32', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={rejectRequest} 
                            style={{ backgroundColor: '#c62828', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Rechazar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.availabilityPill}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15, color: isAvailable ? '#2e7d32' : '#555' }}>
                        {isAvailable ? "Conectado" : "Desconectado"}
                    </Text>
                    <Switch 
                        value={isAvailable} 
                        onValueChange={setIsAvailable}
                        disabled={!isApproved}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    earningsBadge: { position: 'absolute', top: 50, alignSelf: 'center', backgroundColor: '#ffffff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, zIndex: 20 },
    earningsText: { fontSize: 16, fontWeight: 'bold', color: '#2e7d32' },
    warningBanner: { position: 'absolute', top: 110, alignSelf: 'center', backgroundColor: '#ffebee', padding: 10, borderRadius: 8, width: '90%', zIndex: 15 },
    bottomCard: { position: 'absolute', bottom: 40, left: 20, right: 20, backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, zIndex: 20 },
    availabilityPill: { position: 'absolute', bottom: 40, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, zIndex: 20 }
});