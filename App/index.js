// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
    const [letters, setLetters] = useState([]);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchLetters();
    }, []);

    const fetchLetters = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: "Give me a sequence of letters for kids to learn reading." }
                ],
                model: "gpt-4o"
            });
            const resultString = response.data.response;
            setLetters(resultString.split(''));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const showNextLetter = () => {
        if (currentLetterIndex < letters.length - 1) {
            setCurrentLetterIndex(currentLetterIndex + 1);
        }
    };

    const showPreviousLetter = () => {
        if (currentLetterIndex > 0) {
            setCurrentLetterIndex(currentLetterIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.title}>Learn to Read</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.letterContainer}>
                        <Text style={styles.letter}>{letters[currentLetterIndex]}</Text>
                    </View>
                )}
                <View style={styles.buttonsContainer}>
                    <Button title="Previous" onPress={showPreviousLetter} disabled={currentLetterIndex === 0} />
                    <Button title="Next" onPress={showNextLetter} disabled={currentLetterIndex >= letters.length - 1} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    letterContainer: {
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        fontSize: 100,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});