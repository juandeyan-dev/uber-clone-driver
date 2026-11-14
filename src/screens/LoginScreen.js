// AI-assisted: see docs/AI_LOG.md #14
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Estados para los errores específicos debajo de cada campo
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Limpiamos errores previos
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        if (!email.trim()) {
            setEmailError('El correo electrónico es obligatorio.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('La contraseña es obligatoria.');
            isValid = false;
        }

        if (!isValid) return;

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            // El enrutador global detectará el cambio y abrirá el mapa
        } catch (error) {
            setPasswordError('Correo o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Uber Conductor</Text>
            <Text style={styles.subtitle}>Inicia sesión para comenzar</Text>

            <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(text) => { setEmail(text); setEmailError(''); }}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
                <Text style={styles.btnText}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
                <Text style={styles.linkText}>¿No tienes cuenta? <Text style={{fontWeight: 'bold', color: '#1976d2'}}>Regístrate</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#111' },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
    input: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 5, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
    inputError: { borderColor: '#c62828', backgroundColor: '#ffebee' },
    errorText: { color: '#c62828', fontSize: 12, marginBottom: 10, marginLeft: 5, fontWeight: '500' },
    btnPrimary: { backgroundColor: '#111', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    linkContainer: { marginTop: 20, alignItems: 'center' },
    linkText: { color: '#666', fontSize: 14 }
});