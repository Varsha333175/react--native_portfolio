import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false); // Tracks if narration is playing
  const [showModal, setShowModal] = useState(false); // Toggles the modal for "Read My Story"
  const [visibleLines, setVisibleLines] = useState([]); // Lines currently displayed
  const [currentLine, setCurrentLine] = useState(0); // Tracks the currently highlighted line
  const opacityAnim = useState(new Animated.Value(0))[0]; // Animation for line opacity

  const storyLines = [
    "Imagine a world where technology not only solves problems but anticipates them.",
    "That’s the mindset I bring to every project as a Full-Stack Software Developer.",
    "Whether it’s designing APIs that handle millions of requests or engineering intuitive UIs with React,",
    "I strive to create systems that are robust and user-friendly.",
    "My love for debugging complex workflows is matched only by my passion for learning new tools to stay ahead of the curve.",
    "I believe in crafting software that isn’t just functional but transformative.",
  ];

  // Function to handle narration (speech)
  const playNarration = (index = currentLine) => {
    setIsPlaying(true);
    if (index < storyLines.length) {
      Speech.speak(storyLines[index], {
        pitch: 1.2,
        rate: 0.9,
        language: 'en-IN',
        voice: 'Google UK English Female',
        onDone: () => {
          setCurrentLine(index + 1); // Move to the next line
          playNarration(index + 1); // Play the next line
        },
      });
    } else {
      setIsPlaying(false); // Stop narration if all lines are done
      setCurrentLine(0); // Reset to the first line
    }
  };

  const pauseNarration = () => {
    setIsPlaying(false);
    Speech.stop(); // Stop the narration
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseNarration(); // Pause if playing
    } else {
      playNarration(); // Start or resume narration
    }
  };

  // Lyric-style animation for "Read My Story"
  const startReadingStory = () => {
    setShowModal(true); // Show modal
    setVisibleLines([]); // Reset visible lines
    setCurrentLine(0); // Reset current line
    displayStoryLine(0); // Start displaying lines
  };

  const displayStoryLine = (index) => {
    if (index < storyLines.length) {
      setVisibleLines((prevLines) => [...prevLines, storyLines[index]]); // Add line to visible stack
      setCurrentLine(index); // Highlight the current line

      opacityAnim.setValue(0); // Reset opacity animation
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => displayStoryLine(index + 1), 3000); // Move to the next line after a delay
      });
    }
  };

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, I'm Varsha Thondalapally</Text>
        <Text style={styles.subtitle}>Creative Developer | Problem Solver | Innovator</Text>
        <Text style={styles.about}>Building software that isn’t just functional but transformative.</Text>

        {/* Listen to My Story Button */}
        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'mic-circle'}
            size={80}
            color="#FFFFFF" // Spotify white icons
          />
          <Text style={styles.buttonLabel}>Listen to My Story</Text>
        </TouchableOpacity>

        {/* Read My Story Button */}
        <TouchableOpacity style={styles.secondaryButton} onPress={startReadingStory}>
          <Text style={styles.secondaryButtonText}>Read My Story</Text>
        </TouchableOpacity>

        {/* Modal for Lyric-Style Story */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={40} color="#1DB954" />
              </TouchableOpacity>

              {/* Display all visible lines */}
              <View style={styles.storyContainer}>
                {visibleLines.map((line, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.storyText,
                      index === currentLine && styles.currentLine, // Highlight current line
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Modal>
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
    marginBottom: 10,
  },
  about: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  playPauseButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  storyContainer: {
    marginTop: 20,
  },
  storyText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  currentLine: {
    color: '#1DB954', // Highlighted color for the current line
    fontWeight: 'bold',
  },
});
