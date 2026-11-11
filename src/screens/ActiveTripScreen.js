import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActiveTripScreen({ route }) {

    const { trip } = route?.params?.trip || { 
        origin: 'Desconocido', 
        destination: 'Desconocido', 
        fare: 0 
    };
    const { origin, destination, fare } = trip;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Viaje en Curso</Text>

            <View style={styles.card}>
                <Text style={styles.text}>Origen: {trip.origin}</Text>
                <Text style={styles.text}>Destino: {trip.destination}</Text>
                <Text style={styles.fare}>Tarifa: ${trip.fare}</Text>
            </View>
            {/* Aquí luego irán los estados: "Llegué al origen", "Pasajero a bordo", etc. */}
        </View>
    )
}//Terminación de función

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3 },
    text: { fontSize: 16, marginBottom: 10 },
    fare: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginTop: 10 }
});