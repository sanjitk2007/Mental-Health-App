import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../images/background-image.jpg.avif')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Mindfulness Machine</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Breathing Exercise')}>
                        <Text>Breathing Exercises</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Fidget Toy')}>
                        <Text>Fidget Mechanism</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Journal')}>
                        <Text>Journal</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        top: 50,
        color: '#fff',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        position: 'absolute',
        top: 120,
        marginBottom: 100,
    },
    buttonContainer: {
        marginTop: 399,
    },
    button: {
        backgroundColor: "#FFD700",
        padding: 10,
        borderRadius: 25,
        marginTop: 30,
        width: 300,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default HomeScreen;