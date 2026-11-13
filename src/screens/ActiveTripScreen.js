import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ActivityIndicator } from 'react-native';

import { DriverContext } from '../context/DriverContext';
import MapView, { Marker, Polyline } from 'react-native-maps';
import useDriverLocation from '../services/useDriverLocation';

export default function ActiveTripScreen({ route, navigation }) {
    //TODOS LOS HOOKS AL PRINCIPIO (Regla estricta de React)
    const { location } = useDriverLocation(true);
    const [tripStatus, setTripStatus] = useState('accepted');
    const mapRef = useRef(null);
    const tripData = route?.params?.trip;
    const { finishTrip } = useContext(DriverContext);
    
    //FORZAMOS LAS COORDENADAS PARA DESCARTAR EL BUG DE CALIFORNIA
    const targetCoords = (tripStatus === 'accepted' || tripStatus === 'driver_arriving') 
        ? tripData?.originCoords 
        : tripData?.destinationCoords;

    const routeCoordinates = [
        { latitude: 6.2750, longitude: -75.5690 },
        targetCoords
    ];

    useEffect(() => {
        if (mapRef.current && routeCoordinates.length > 1) {
            mapRef.current.fitToCoordinates(routeCoordinates, {
                edgePadding: { top: 80, right: 50, bottom: 350, left: 50 },
                animated: true,
            });
        }
    }, [tripStatus, location]);

    //EARLY RETURNS DESPUÉS DE LOS HOOKS
    if (!tripData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, color: 'red', marginBottom: 20 }}>
                    Error: Se perdieron los datos del viaje.
                </Text>
                <Button title="Volver al Mapa" onPress={() => navigation.navigate('MapScreen')} />
            </View>
        );
    }

    if (!location) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
                <ActivityIndicator size="large" color="#1976d2" />
                <Text style={{ marginTop: 15, fontSize: 16, color: '#666' }}>
                    Obteniendo señal GPS...
                </Text>
            </View>
        );
    }

    //RENDERIZADO PRINCIPAL
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject} 
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={targetCoords}
                    title={tripStatus === 'in_progress' ? "Destino" : "Pasajero"}
                    description={tripStatus === 'in_progress' ? tripData.destination : tripData.origin}
                    pinColor={tripStatus === 'in_progress' ? "red" : "blue"}
                />

                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#1976d2"
                    strokeWidth={4}
                />
            </MapView>

            <View style={styles.statusHeader}>
                <Text style={styles.statusText}>
                    {tripStatus === 'accepted' && '📍 En camino al punto de recogida'}
                    {tripStatus === 'driver_arriving' && '⏳ Esperando al pasajero'}
                    {tripStatus === 'in_progress' && '🚗 En trayecto al destino'}
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.card}>
                    <Text style={styles.label}>Origen: {tripData.origin}</Text>
                    <Text style={styles.label}>Destino: {tripData.destination}</Text>
                    <Text style={styles.fare}>Tarifa: ${tripData.fare}</Text>
                </View>

                {tripStatus === 'accepted' && (
                    <TouchableOpacity style={styles.actionButton} onPress={() => setTripStatus('driver_arriving')}>
                        <Text style={styles.buttonText}>Llegué al origen</Text>
                    </TouchableOpacity>
                )}

                {tripStatus === 'driver_arriving' && (
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1976d2' }]} onPress={() => setTripStatus('in_progress')}>
                        <Text style={styles.buttonText}>Pasajero a bordo</Text>
                    </TouchableOpacity>
                )}

                {tripStatus === 'in_progress' && (
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: '#d32f2f' }]} 
                        onPress={() => {
                            setTripStatus('completed');

                            finishTrip(tripData.fare);
                            
                            navigation.navigate('MapScreen'); 
                        }}
                    >
                        <Text style={styles.buttonText}>Finalizar viaje</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between' },
    statusHeader: { padding: 15, backgroundColor: '#e3f2fd', borderRadius: 8, alignItems: 'center', marginTop: 10, marginHorizontal: 20 },
    statusText: { fontSize: 16, fontWeight: 'bold', color: '#0d47a1' },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3, marginBottom: 20 },
    label: { fontSize: 12, color: '#666', marginTop: 8 },
    text: { fontSize: 16, fontWeight: '500' },
    fare: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginTop: 15 },
    bottomContainer: { padding: 20 },
    actionButton: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});