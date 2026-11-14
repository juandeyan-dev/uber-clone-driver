import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// AI-assisted: see docs/AI_LOG.md #13
// Estructura base sugerida por IA; código analizado, comprendido y transcrito manualmente para asegurar el aprendizaje

export default function PendingApprovalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>✓</Text>

            <Text style={styles.title}>
                Registro enviado
            </Text>

            <Text style={styles.message}>
                Tu información fue recibida correctamente.
            </Text>

            <Text style={styles.message}>
                Tu cuenta está pendiente de aprobación por parte de la plataforma.
            </Text>

            <View style={styles.statusBox}>
                <Text style={styles.statusLabel}>
                    Estado de la cuenta
                </Text>

                <Text style={styles.statusValue}>
                    Pendiente de aprobación
                </Text>
            </View>

            <Text style={styles.helperText}>
                Mientras la cuenta permanezca pendiente, no podrás activar tu
                disponibilidad ni acceder al mapa como conductor.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f4f6f8',
    },
    icon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 42,
        color: '#fff',
        backgroundColor: '#1976d2',
        marginBottom: 24,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'center',
        marginBottom: 8,
        color: '#333',
    },
    statusBox: {
        width: '100%',
        marginTop: 24,
        marginBottom: 24,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d7dce1',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    statusValue: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#d98200',
    },
    helperText: {
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
        color: '#666',
    },
});
