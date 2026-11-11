import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import  {useNavigation} from '@react-navigation/native';


import MapView, { Marker } from 'react-native-maps';
import useDriverLocation from '../services/useDriverLocation';
import useTripRequests from '../services/useTripRequests';

export default function MapScreen() {
    const [isAvailable, setIsAvailable] = useState(false);
    const { location } = useDriverLocation(isAvailable);
    const { incomingRequests, timeLeft, rejectRequest } = useTripRequests(isAvailable);

    // Valor quemado temporalmente para probar la UI
    const [isApproved, setIsApproved] = useState(true);   
    const navigation = useNavigation(); 

    //Funciones 
    const acceptTrip = () => {
        // Lógica para aceptar el viaje
        const acceptedTripData = incomingRequests;
        rejectRequest(); 
        navigation.navigate('ActiveTrip', {trip: acceptedTripData});

    }

    return (
        <View style={{ flex: 1 }}>
            {!isApproved && (
                <View style={{ backgroundColor: '#ffebee', padding: 15, alignItems: 'center' }}>
                    <Text style={{ color: '#c62828', textAlign: 'center', fontWeight: 'bold' }}>
                        Tu cuenta está pendiente de aprobación. No puedes recibir viajes.
                    </Text>
                </View>
            )}
            <View style= {{padding: 10, alignItems: 'center'}}>
                <Switch 
                    value={isAvailable} 
                    onValueChange={setIsAvailable}
                    disabled={!isApproved}
                />
            </View>
            
            {location != null ? (
                <MapView
                    style={{ flex: 1}}
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

};//Corchete de cierre del componente MapScreen