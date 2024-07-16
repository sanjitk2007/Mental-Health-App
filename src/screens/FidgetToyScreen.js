import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions, TouchableOpacity } from 'react-native';
// import { Audio } from 'expo-av';

const FidgetToyScreen = () => {
    const [buttons, setButtons] = useState([]);
    const { width, height } = Dimensions.get('window');

    // const sounds = {
    //     circle: require('../assets/sounds/circle.mp3'),
    //     square: require('../assets/sounds/square.mp3'),
    //     rectangle: require('../assets/sounds/rectangle.mp3'),
    //     star: require('../assets/sounds/star.mp3'),
    //     oval: require('../assets/sounds/oval.mp3'),
    // };

    const addNewButton = (shape) => {
        const id = Math.random().toString();
        const x = Math.floor(Math.random() * (width - 50));
        const y = Math.floor(Math.random() * (height - 50));
        const color = getRandomColor();
        setButtons((currentButtons) => [...currentButtons, { id, x, y, shape, color }]);
    };

    const removeButton = async (id, shape) => {
        setButtons((currentButtons) => currentButtons.filter((button) => button.id !== id));
        // const { sound } = await Audio.Sound.createAsync(sounds[shape]);
        // await sound.playAsync();
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const FidgetButton = ({ id, shape, onRemove, style }) => {
        const getShapeStyle = (shape) => {
            switch (shape) {
                case 'circle':
                    return { borderRadius: 25, width: 50, height: 50 };
                case 'square':
                    return { width: 50, height: 50 };
                case 'rectangle':
                    return { width: 80, height: 50 };
                case 'star':
                    return { width: 60, height: 60 }; // Adjust according to your star shape implementation
                case 'oval':
                    return { borderRadius: 25, width: 80, height: 50 };
                default:
                    return {};
            }
        };

        return (
            <TouchableOpacity
                style={[styles.button, style, getShapeStyle(shape)]}
                onPress={() => onRemove(id)}
            />
        );
    };
    return (
        <View style={styles.container}>
            <Button title="Add Circle" onPress={() => addNewButton('circle')} color="#FF6347" />
            <Button title="Add Square" onPress={() => addNewButton('square')} color="#4682B4" />
            <Button title="Add Rectangle" onPress={() => addNewButton('rectangle')} color="#32CD32" />
            <Button title="Add Star" onPress={() => addNewButton('star')} color="#FFD700" />
            <Button title="Add Oval" onPress={() => addNewButton('oval')} color="#FF69B4" />
            {buttons.map((button) => (
                <FidgetButton
                    key={button.id}
                    id={button.id}
                    shape={button.shape}
                    onRemove={() => removeButton(button.id, button.shape)}
                    style={{ top: button.y, left: button.x, backgroundColor: button.color }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
    },
});

export default FidgetToyScreen;