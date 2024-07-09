import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BreathingExercise from '../screens/BreathingExercise';
import JournalScreen from '../screens/JournalScreen';
import FidgetToyScreen from '../screens/FidgetToyScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (

    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Breathing Exercise" component={BreathingExercise} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Fidget Toy" component={FidgetToyScreen} />
    </Stack.Navigator>
);

export default StackNavigator;