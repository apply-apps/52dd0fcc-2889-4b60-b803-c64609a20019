// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Button, ActivityIndicator, FlatList } from 'react-native';

const WorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [newWorkout, setNewWorkout] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addWorkout = () => {
        if (newWorkout.trim()) {
            setIsLoading(true);
            setTimeout(() => { // Simulate network request
                setWorkouts([...workouts, { id: Date.now().toString(), name: newWorkout.trim() }]);
                setNewWorkout('');
                setIsLoading(false);
            }, 500); // Adjust delay as necessary
        }
    };

    return (
        <View style={styles.workoutContainer}>
            <Text style={styles.header}>Add a new workout:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter workout name"
                value={newWorkout}
                onChangeText={setNewWorkout}
            />
            <Button title="Add Workout" onPress={addWorkout} disabled={isLoading} />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
                data={workouts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.workoutItem}>
                        <Text style={styles.workoutText}>{item.name}</Text>
                    </View>
                )}
                style={styles.list}
            />
        </View>
    );
};

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <ScrollView>
                <WorkoutTracker />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    workoutContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    workoutItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
    },
    workoutText: {
        fontSize: 16,
    },
    list: {
        marginTop: 20,
    },
});