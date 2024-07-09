import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';

const FidgetButton = ({ id, onRemove, style }) => {
    const animation = new Animated.Value(1);

    useEffect(() => {
        Animated.spring(animation, {
            toValue: 1.2,
            friction: 2,
            tension: 160,
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = async () => {
        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync(require('../../assets/sounds/happy-pop-2-185287.mp3'));
            await soundObject.playAsync();
        } catch (error) {
            console.error('Failed to load sound', error);
        }

        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            onRemove(id);
        });
    };

    return (
        <Animated.View style={[styles.buttonContainer, style, { transform: [{ scale: animation }] }]}>
            <TouchableOpacity style={styles.button} onPress={handlePress} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
    },
});

export default FidgetButton;
