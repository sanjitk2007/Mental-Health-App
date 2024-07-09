import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import FidgetButton from '../components/FidgetButton';

const FidgetToyScreen = () => {
    const [buttons, setButtons] = useState([]);
    const { width, height } = Dimensions.get('window');

    const addNewButton = () => {
        const id = Math.random().toString();
        const x = Math.floor(Math.random() * (width - 50));
        const y = Math.floor(Math.random() * (height - 50));
        setButtons((currentButtons) => [...currentButtons, { id, x, y }]);
    };

    const removeButton = (id) => {
        setButtons((currentButtons) => currentButtons.filter((button) => button.id !== id));
    };

    return (
        <View style={styles.container}>
            <Button title="Add Button" onPress={addNewButton} />
            {buttons.map((button) => (
                <FidgetButton
                    key={button.id}
                    id={button.id}
                    onRemove={removeButton}
                    style={{ top: button.y, left: button.x }}
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
});

export default FidgetToyScreen;