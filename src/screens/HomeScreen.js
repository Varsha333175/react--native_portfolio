import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';


export default function HomeScreen() {
  const speak = () => {
    const message =
      "Namaste! Welcome to my portfolio. Here, you can explore my projects, skills, and achievements.";
    Speech.speak(message, {
      pitch: 1.3,
      rate: 0.9,
      language: 'en-IN',
      voice: 'Google UK English Female',
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
  };

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, I'm [Your Name]</Text>
        <Text style={styles.subtitle}>
          Creative Developer | Problem Solver | Innovator
        </Text>
        <TouchableOpacity style={styles.button} onPress={speak}>
          <Text style={styles.buttonText}>Play Narration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={stopSpeaking}>
          <Text style={styles.secondaryButtonText}>Stop Narration</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#333333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: '#1DB954',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
