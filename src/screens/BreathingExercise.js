import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const BreathingExercise = ({ navigation }) => {
    const [breathPhase, setBreathPhase] = useState('Start');
    const [animValue] = useState(new Animated.Value(1));

    const startBreathingExercise = () => {
        setBreathPhase('Inhale');
        Animated.sequence([
            Animated.timing(animValue, { toValue: 1.5, duration: 4000, useNativeDriver: true }), // Inhale for 4 seconds
            Animated.timing(animValue, { toValue: 1.5, duration: 7000, useNativeDriver: true }), // Hold for 7 seconds
            Animated.timing(animValue, { toValue: 1, duration: 8000, useNativeDriver: true }),  // Exhale for 8 seconds
        ]).start(() => setBreathPhase('Start'));
    };

    useEffect(() => {
        let timeout;
        if (breathPhase === 'Inhale') {
            timeout = setTimeout(() => setBreathPhase('Hold'), 4000);
        } else if (breathPhase === 'Hold') {
            timeout = setTimeout(() => setBreathPhase('Exhale'), 7000);
        } else if (breathPhase === 'Exhale') {
            timeout = setTimeout(() => setBreathPhase('Start'), 8000);
        }
        return () => clearTimeout(timeout);
    }, [breathPhase]);

    return (
        <View style={styles.container}>
            <Text style={styles.instructionText}>4-7-8 Breathing Exercise</Text>
            <Text style={styles.phaseText}>{breathPhase === 'Start' ? 'Press Start to Begin' : breathPhase}</Text>
            <View style={styles.circleContainer}>
                <Animated.View style={[styles.circle, { transform: [{ scale: animValue }] }]} />
            </View>
            {breathPhase === 'Start' && (
                <TouchableOpacity style={styles.button} onPress={startBreathingExercise}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 20,
    },
    instructionText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    phaseText: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    circleContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#87cefa',
    },
    button: {
        padding: 15,
        backgroundColor: '#4682b4',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default BreathingExercise;