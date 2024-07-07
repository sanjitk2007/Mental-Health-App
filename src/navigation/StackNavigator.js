import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BreathingExercise from '../screens/BreathingExercise';

const Stack = createStackNavigator();

const StackNavigator = () => (

    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Breathing Exercise" component={BreathingExercise} />
    </Stack.Navigator>
);

export default StackNavigator;