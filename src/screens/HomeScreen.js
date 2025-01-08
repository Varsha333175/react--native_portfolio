import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const storyTextChunks = [
    "Imagine a world where technology not only solves problems but anticipates them.",
    "That’s the mindset I bring to every project as a Full-Stack Software Developer.",
    "Whether it’s designing APIs that handle millions of requests or engineering intuitive UIs with React,",
    "I strive to create systems that are robust and user-friendly.",
    "My love for debugging complex workflows is matched only by my passion for learning new tools to stay ahead of the curve.",
    "I believe in crafting software that isn’t just functional but transformative.",
  ];

  const playNarration = (index = 0) => {
    if (index < storyTextChunks.length) {
      Speech.speak(storyTextChunks[index], {
        pitch: 1.2,
        rate: 0.9,
        language: 'en-IN',
        voice: 'Google UK English Female',
        onDone: () => playNarration(index + 1),
      });
    }
  };

  const stopNarration = () => {
    Speech.stop();
  };

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, I'm [Your Name]</Text>
        <Text style={styles.subtitle}>
          Creative Developer | Problem Solver | Innovator
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => playNarration()}>
          <Text style={styles.buttonText}>Play Narration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={stopNarration}>
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
    textAlign: 'center',
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
    borderRadius: 50,
    marginBottom: 15,
    elevation: 5,
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
    borderRadius: 50,
    elevation: 3,
  },
  secondaryButtonText: {
    color: '#1DB954',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
