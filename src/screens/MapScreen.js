import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useDriverLocation from '../services/useDriverLocation';

export default function MapScreen() {
    const [isAvailable, setIsAvailable] = useState(false);
    const { location } = useDriverLocation(isAvailable);

    // Valor quemado temporalmente para probar la UI
    const [isApproved, setIsApproved] = useState(false);    

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
        </View>
    );

};//Corchete de cierre del componente MapScreen