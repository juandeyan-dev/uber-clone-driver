import React, { useState, useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DriverContext } from '../context/DriverContext';
import MapView, { Marker } from 'react-native-maps';
import useDriverLocation from '../services/useDriverLocation';
import useTripRequests from '../services/useTripRequests';

export default function MapScreen({ navigation }) {
    // 1. Extraemos earnings de la bóveda global
    const { isAvailable, setIsAvailable, earnings } = useContext(DriverContext);
    const { location } = useDriverLocation(isAvailable);
    const { incomingRequests, timeLeft, rejectRequest } = useTripRequests(isAvailable);

    // Valor quemado temporalmente para probar la UI
    const [isApproved, setIsApproved] = useState(true);

    // Funciones 
    const acceptTrip = () => {
        const acceptedTripData = incomingRequests;
        rejectRequest();
        navigation.navigate('ActiveTripScreen', { trip: acceptedTripData });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.earningsBadge}>
                <Text style={styles.earningsText}>
                    Ganancias: ${earnings}
                </Text>
            </View>

            {/* Acceso rápido al perfil del conductor.
            No modifica la lógica de GPS, solicitudes ni viajes. */}
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('DriverProfileNavigator')}
                accessibilityRole="button"
                accessibilityLabel="Abrir perfil del conductor"
            >
                <Text style={styles.profileButtonText}>
                    Perfil
                </Text>
            </TouchableOpacity>

            {!isApproved && (
                <View style={{ backgroundColor: '#ffebee', padding: 15, alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ color: '#c62828', textAlign: 'center', fontWeight: 'bold' }}>
                        Tu cuenta está pendiente de aprobación. No puedes recibir viajes.
                    </Text>
                </View>
            )}

            <View style={{ padding: 10, alignItems: 'center', marginTop: isApproved ? 30 : 0 }}>
                <Switch
                    value={isAvailable}
                    onValueChange={setIsAvailable}
                    disabled={!isApproved}
                />
            </View>

            {location != null ? (
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Ubicación del conductor"
                    />
                </MapView>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Esperando ubicación...</Text>
                </View>
            )}

            {incomingRequests != null && (
                <View style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 20,
                    right: 20,
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 15,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 10
                }}>
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
                            style={{ backgroundColor: '#c62828', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Rechazar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

// 3. Estilos añadidos al final para el badge flotante
const styles = StyleSheet.create({
    earningsBadge: {
        position: 'absolute',
        top: 45,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 20,
    },

    earningsText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2e7d32',
    },

    profileButton: {
        position: 'absolute',
        top: 45,
        right: 16,
        zIndex: 20,
        elevation: 7,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#1976d2',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    profileButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
