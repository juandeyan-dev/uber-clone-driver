// AI-assisted: see docs/AI_LOG.md #13
import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FreeMap({ driverLocation, originCoords, destinationCoords, tripStatus }) {
    // Coordenadas por defecto
    const lat = driverLocation?.latitude || 6.2442;
    const lng = driverLocation?.longitude || -75.5812;

    const isNavigating = Boolean(originCoords && destinationCoords && tripStatus);

    let startPoint = { latitude: lat, longitude: lng };
    let endPoint = { latitude: lat, longitude: lng };
    let labelStart = '';
    let labelEnd = '';

    // Lógica de máquina de estados para los puntos A y B
    if (isNavigating) {
        if (tripStatus === 'accepted' || tripStatus === 'driver_arriving') {
            startPoint = { latitude: lat, longitude: lng }; // Tu ubicación actual
            endPoint = originCoords; // Terminal del Norte
            labelStart = 'Tu ubicación (Conductor)';
            labelEnd = 'Punto de recogida';
        } else {
            startPoint = originCoords; // Terminal del Norte
            endPoint = destinationCoords; // Parque Lleras
            labelStart = 'Punto de recogida';
            labelEnd = 'Destino final';
        }
    }

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
            var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lng}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

            var hasRoute = ${isNavigating};

            if (hasRoute) {
                var startLat = ${startPoint.latitude};
                var startLng = ${startPoint.longitude};
                var endLat = ${endPoint.latitude};
                var endLng = ${endPoint.longitude};

                // Pines dinámicos
                L.marker([startLat, startLng]).addTo(map).bindPopup('${labelStart}');
                L.marker([endLat, endLng]).addTo(map).bindPopup('${labelEnd}');

                // Consumo de API OSRM para trazar ruta por las calles
                var osrmUrl = 'https://router.project-osrm.org/route/v1/driving/' + startLng + ',' + startLat + ';' + endLng + ',' + endLat + '?overview=full&geometries=geojson';

                fetch(osrmUrl)
                    .then(res => res.json())
                    .then(data => {
                        if(data.routes && data.routes.length > 0) {
                            var routeGeoJSON = data.routes[0].geometry;
                            var polyline = L.geoJSON(routeGeoJSON, {
                                style: { color: '#1976d2', weight: 6, opacity: 0.8 }
                            }).addTo(map);
                            map.fitBounds(polyline.getBounds(), { padding: [60, 60] });
                        }
                    })
                    .catch(err => {
                        // Fallback a línea recta si la API falla
                        var fallback = L.polyline([[startLat, startLng], [endLat, endLng]], { color: '#111111', weight: 5 }).addTo(map);
                        map.fitBounds(fallback.getBounds(), { padding: [60, 60] });
                    });
            } else {
                L.circleMarker([${lat}, ${lng}], {
                    radius: 9, fillColor: '#1976d2', color: '#ffffff', weight: 3, opacity: 1, fillOpacity: 1
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
            scrollEnabled={false}
        />
    );
}