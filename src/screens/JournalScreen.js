import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalScreen = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const storedEntries = await AsyncStorage.getItem('journalEntries');
            if (storedEntries) {
                setEntries(JSON.parse(storedEntries));
            }
        } catch (error) {
            console.error('Failed to load entries', error);
        }
    };

    const saveEntry = async () => {
        if (entry.trim() === '') {
            return;
        }
        const newEntries = [...entries, { id: Date.now().toString(), text: entry }];
        setEntries(newEntries);
        setEntry('');
        try {
            await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
        } catch (error) {
            console.error('Failed to save entry', error);
        }
    };

    const deleteEntry = async (id) => {
        const newEntries = entries.filter((item) => item.id !== id);
        setEntries(newEntries);
        try {
            await AsyncStorage.setItem('journalEntries', JSON.stringify(newEntries));
        } catch (error) {
            console.error('Failed to delete entry', error);
        }
    };

    const confirmDelete = (id) => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteEntry(id) },
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.entryContainer}>
            <Text style={styles.entryText}>{item.text}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Journal</Text>
            <TextInput
                style={styles.input}
                placeholder="Write your entry..."
                value={entry}
                onChangeText={setEntry}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={saveEntry}>
                <Text style={styles.buttonText}>Save Entry</Text>
            </TouchableOpacity>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        padding: 15,
        backgroundColor: '#4682b4',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    entryContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    entryText: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default JournalScreen;