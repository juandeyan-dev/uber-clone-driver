// AI-assisted: see docs/AI_LOG.md #14
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Errores individuales por campo
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setNameError('');
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        if (!fullName.trim()) {
            setNameError('El nombre completo es obligatorio.');
            isValid = false;
        }
        if (!email.trim()) {
            setEmailError('El correo electrónico es obligatorio.');
            isValid = false;
        }
        if (!password || password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }

        if (!isValid) return;

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            const user = userCredential.user;

            await setDoc(doc(db, 'drivers', user.uid), {
                uid: user.uid,
                fullName: fullName.trim(),
                email: email.trim(),
                isApproved: false, 
                createdAt: new Date().toISOString()
            });

            // Redirige o deja que el contexto actúe
        } catch (error) {
            setEmailError('Este correo ya está registrado o no es válido.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro Conductor</Text>
            <Text style={styles.subtitle}>Crea tu cuenta en la plataforma</Text>

            <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                placeholder="Nombre completo"
                placeholderTextColor="#888"
                value={fullName}
                onChangeText={(text) => { setFullName(text); setNameError(''); }}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

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
                placeholder="Contraseña (mínimo 6 caracteres)"
                placeholderTextColor="#888"
                value={password}
                onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister} disabled={loading}>
                <Text style={styles.btnText}>{loading ? 'Registrando...' : 'Registrarse'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
                <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={{fontWeight: 'bold', color: '#1976d2'}}>Inicia Sesión</Text></Text>
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
    btnPrimary: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    linkContainer: { marginTop: 20, alignItems: 'center' },
    linkText: { color: '#666', fontSize: 14 }
});