import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FreeMap({ driverLocation, originCoords, destinationCoords }) {
    // Coordenadas por defecto (Medellín) si el GPS tarda en responder
    const lat = driverLocation?.latitude || 6.2442;
    const lng = driverLocation?.longitude || -75.5812;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { width: 100vw; height: 100vh; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Inicializar mapa sin controles de zoom para que parezca nativo
            var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lng}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(map);

            var hasRoute = ${Boolean(originCoords && destinationCoords)};

            if (hasRoute) {
                var origin = [${originCoords?.latitude || 0}, ${originCoords?.longitude || 0}];
                var dest = [${destinationCoords?.latitude || 0}, ${destinationCoords?.longitude || 0}];

                // Pines de origen y destino
                L.marker(origin).addTo(map).bindPopup('Origen');
                L.marker(dest).addTo(map).bindPopup('Destino');

                // Línea de la ruta
                var polyline = L.polyline([origin, dest], { color: '#111111', weight: 5 }).addTo(map);
                map.fitBounds(polyline.getBounds(), { padding: [60, 60] });
            } else {
                // Pin del conductor (Círculo azul estilo GPS)
                L.circleMarker([${lat}, ${lng}], {
                    radius: 9,
                    fillColor: '#1976d2',
                    color: '#ffffff',
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(map);
            }
        </script>
    </body>
    </html>
    `;

    return (
        <WebView
            originWhitelist={['*']}
            source={{ html }}
            style={StyleSheet.absoluteFillObject}
            scrollEnabled={false} // Evita que la pantalla completa haga scroll accidental
        />
    );
}