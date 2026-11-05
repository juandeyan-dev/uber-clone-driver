import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useDriverLocation from '../services/useDriverLocation';

export default function MapScreen() {
    const { location } = useDriverLocation();
    const [isAvailable, setIsAvailable] = useState(false);

    return (
        <View>
            <Switch 
                value={isAvailable} 
                onValueChange={setIsAvailable}
            />
            {location != null ? (
                <Text>{location.coords.latitude}, {location.coords.longitude}</Text>
                ) : (
                <Text>Esperando ubicación...</Text>
            )}          
        </View>
    );

}