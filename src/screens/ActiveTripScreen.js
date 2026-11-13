import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FreeMap from '../components/FreeMap';
import { DriverContext } from '../context/DriverContext';

export default function ActiveTripScreen({ route, navigation }) {
    const { finishTrip } = useContext(DriverContext);
    const tripData = route.params?.trip;
    const [tripStatus, setTripStatus] = useState('accepted');

    if (!tripData || !tripData.originCoords || !tripData.destinationCoords) {
        return (
            <View style={styles.center}>
                <Text>Error: Datos del viaje no encontrados.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#1976d2', fontWeight: 'bold' }}>Volver al mapa</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {/* MAPA GRATUITO CON ORIGEN Y DESTINO */}
            <FreeMap 
                originCoords={tripData.originCoords} 
                destinationCoords={tripData.destinationCoords} 
            />

            <View style={styles.bottomCard}>
                <Text style={styles.title}>Viaje a {tripData.destination}</Text>
                <Text style={styles.fare}>Tarifa: ${tripData.fare}</Text>

                {tripStatus === 'accepted' && (
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: '#1976d2' }]} 
                        onPress={() => setTripStatus('driver_arriving')}
                    >
                        <Text style={styles.btnText}>Llegué al origen</Text>
                    </TouchableOpacity>
                )}

                {tripStatus === 'driver_arriving' && (
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: '#f57c00' }]} 
                        onPress={() => setTripStatus('in_progress')}
                    >
                        <Text style={styles.btnText}>Pasajero a bordo (Iniciar viaje)</Text>
                    </TouchableOpacity>
                )}

                {tripStatus === 'in_progress' && (
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: '#d32f2f' }]} 
                        onPress={() => {
                            setTripStatus('completed');
                            finishTrip(tripData.fare);
                            navigation.navigate('MapScreen');
                        }}
                    >
                        <Text style={styles.btnText}>Finalizar viaje</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bottomCard: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    fare: { fontSize: 16, color: '#2e7d32', marginBottom: 15, fontWeight: 'bold' },
    btn: { paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});