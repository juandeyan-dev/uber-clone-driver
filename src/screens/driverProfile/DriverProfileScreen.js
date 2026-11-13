// AI-assisted: see docs/AI_LOG.md #16
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje
// Pantalla de consulta del perfil del conductor desde DriverContext y Firestore.

import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useDriverSession } from '../../context/DriverContext';

/**
 * Función auxiliar para verificar si un documento o foto ya fue subido.
 * Retorna 'Cargado' si existe valor, de lo contrario 'Pendiente'.
 */
function getDocumentStatus(value) {
    return value ? 'Cargado' : 'Pendiente';
}

/**
 * Función auxiliar para formatear fechas de forma segura.
 * Maneja textos directos, objetos Timestamp de Firestore (vía .toDate()) o valores vacíos.
 */
function formatDate(value) {
    if (!value) {
        return 'No registrada';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (value?.toDate) {
        return value.toDate().toLocaleDateString('es-CO');
    }

    return 'No registrada';
}

/**
 * Componente reutilizable para mostrar filas de información (etiqueta y valor).
 */
function InfoRow({ label, value }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>
                {value || 'No registrado'}
            </Text>
        </View>
    );
}

/**
 * Componente reutilizable para los títulos de cada sección del perfil.
 */
function SectionTitle({ children }) {
    return (
        <Text style={styles.sectionTitle}>
            {children}
        </Text>
    );
}

// Recibimos 'navigation' por props para permitir el cambio de pantallas en el Stack Navigator
export default function DriverProfileScreen({ navigation }) {
    // Consumimos el contexto global de sesión para obtener datos del conductor y la función de cierre de sesión
    const {
        driverId,
        driverProfile,
        sessionStatus,
        logoutDriver,
    } = useDriverSession();

    // Pantalla de carga mientras se sincroniza el perfil con Firestore
    if (sessionStatus === 'loading' || !driverProfile) {
        return (
            <View style={styles.centeredScreen}>
                <ActivityIndicator size="large" color="#1976d2" />
                <Text style={styles.loadingText}>
                    Cargando perfil del conductor...
                </Text>
            </View>
        );
    }

    // Desestructuración segura de los subdocumentos del perfil
    const { personal = {}, vehicle = {}, documents = {} } = driverProfile;

    // Determinamos texto y color del estado de aprobación de forma dinámica
    const approvalText =
        driverProfile.isApproved === true
            ? 'Aprobado'
            : 'Pendiente de aprobación';

    const approvalColor =
        driverProfile.isApproved === true
            ? '#2e7d32' // Verde
            : '#d98200'; // Naranja/Ámbar

    // Manejador seguro para cerrar la sesión local y de Firestore
    async function handleLogout() {
        try {
            await logoutDriver();
        } catch (error) {
            console.error('Error al cerrar la sesión:', error);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Cabecera del Perfil: Foto, Nombre y Correo */}
            <View style={styles.profileHeader}>
                {personal.profilePhoto ? (
                    <Image
                        source={{ uri: personal.profilePhoto }}
                        style={styles.profileImage}
                    />
                ) : (
                    <View style={styles.profileImagePlaceholder}>
                        <Text style={styles.profileImagePlaceholderText}>
                            Sin foto
                        </Text>
                    </View>
                )}

                <Text style={styles.profileName}>
                    {personal.fullName || 'Conductor sin nombre'}
                </Text>

                <Text style={styles.profileEmail}>
                    {personal.email || 'Correo no registrado'}
                </Text>
            </View>

            {/* Tarjeta de Estado de la Cuenta */}
            <View style={styles.statusCard}>
                <Text style={styles.statusLabel}>
                    Estado de la cuenta
                </Text>

                <Text
                    style={[
                        styles.statusValue,
                        { color: approvalColor },
                    ]}
                >
                    {approvalText}
                </Text>
            </View>

            {/* Tarjeta: Datos de Sesión */}
            <View style={styles.card}>
                <SectionTitle>Datos de sesión</SectionTitle>

                <InfoRow
                    label="Identificador del conductor"
                    value={driverId}
                />

                <InfoRow
                    label="Fuente del perfil"
                    value="Firestore"
                />
            </View>

            {/* Tarjeta: Datos Personales (INCLUYE EL BOTÓN DE EDICIÓN AQUÍ) */}
            <View style={styles.card}>
                <SectionTitle>Datos personales</SectionTitle>

                <InfoRow
                    label="Nombre completo"
                    value={personal.fullName}
                />

                <InfoRow
                    label="Documento de identidad"
                    value={personal.identityNumber}
                />

                <InfoRow
                    label="Celular"
                    value={personal.phone}
                />

                <InfoRow
                    label="Fecha de nacimiento"
                    value={formatDate(personal.birthDate)}
                />

                <InfoRow
                    label="Género"
                    value={personal.gender}
                />

                <InfoRow
                    label="Correo electrónico"
                    value={personal.email}
                />

                <InfoRow
                    label="Idioma"
                    value={personal.language}
                />

                {/* Botón para navegar a la pantalla de edición de datos personales */}
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditPersonalData')}
                >
                    <Text style={styles.editButtonText}>
                        Editar datos personales
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Tarjeta: Datos del Vehículo */}
            <View style={styles.card}>
                <SectionTitle>Datos del vehículo</SectionTitle>

                <InfoRow
                    label="Categoría"
                    value={vehicle.category}
                />

                <InfoRow
                    label="Placa"
                    value={vehicle.plate}
                />

                <InfoRow
                    label="Marca"
                    value={vehicle.brand}
                />

                <InfoRow
                    label="Modelo"
                    value={vehicle.model}
                />

                <InfoRow
                    label="Año"
                    value={vehicle.year}
                />

                <InfoRow
                    label="Color"
                    value={vehicle.color}
                />

                <InfoRow
                    label="Capacidad"
                    value={
                        vehicle.capacity
                            ? `${vehicle.capacity} pasajeros`
                            : null
                    }
                />

                <InfoRow
                    label="Foto del vehículo"
                    value={getDocumentStatus(vehicle.vehiclePhoto)}
                />
            </View>

            {/* Tarjeta: Documentos y Pagos */}
            <View style={styles.card}>
                <SectionTitle>Documentos y pagos</SectionTitle>

                <InfoRow
                    label="Licencia"
                    value={getDocumentStatus(documents.licensePhoto)}
                />

                <InfoRow
                    label="Vencimiento de licencia"
                    value={formatDate(documents.licenseExpiration)}
                />

                <InfoRow
                    label="SOAT"
                    value={getDocumentStatus(documents.soatPhoto)}
                />

                <InfoRow
                    label="Vencimiento del SOAT"
                    value={formatDate(documents.soatExpiration)}
                />

                <InfoRow
                    label="Revisión técnico-mecánica"
                    value={getDocumentStatus(
                        documents.technicalReviewPhoto
                    )}
                />

                <InfoRow
                    label="Vencimiento de revisión"
                    value={formatDate(
                        documents.technicalReviewExpiration
                    )}
                />

                <InfoRow
                    label="Correo de Mercado Pago"
                    value={documents.mercadoPagoEmail}
                />

                <InfoRow
                    label="Términos aceptados"
                    value={
                        documents.acceptedTerms === true
                            ? 'Sí'
                            : 'No'
                    }
                />
            </View>

            {/* Botón de Cierre de Sesión */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>
                    Cerrar sesión
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// Estilos visuales organizados para mantener coherencia con el diseño de la app
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f4f6f8',
    },
    centeredScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f4f6f8',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 112,
        height: 112,
        borderRadius: 56,
        marginBottom: 12,
        backgroundColor: '#d7dce1',
    },
    profileImagePlaceholder: {
        width: 112,
        height: 112,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 56,
        marginBottom: 12,
        backgroundColor: '#d7dce1',
    },
    profileImagePlaceholderText: {
        color: '#666',
        fontSize: 13,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
    },
    profileEmail: {
        marginTop: 5,
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
    },
    statusCard: {
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d7dce1',
    },
    statusLabel: {
        marginBottom: 6,
        fontSize: 13,
        color: '#666',
    },
    statusValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d7dce1',
    },
    sectionTitle: {
        marginBottom: 12,
        fontSize: 19,
        fontWeight: 'bold',
        color: '#1976d2',
    },
    infoRow: {
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#edf0f2',
    },
    infoLabel: {
        marginBottom: 3,
        fontSize: 13,
        color: '#666',
    },
    infoValue: {
        fontSize: 15,
        color: '#222',
    },
    // Estilos añadidos para el botón de edición de perfil
    editButton: {
        marginTop: 12,
        padding: 12,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#e3f2fd',
    },
    editButtonText: {
        color: '#1976d2',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 4,
        marginBottom: 24,
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#c62828',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});