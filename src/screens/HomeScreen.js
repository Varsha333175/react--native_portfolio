import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const opacityAnim = useState(new Animated.Value(0))[0];

  const storyLines = [
    "Imagine a world where technology not only solves problems but anticipates them.",
    "That’s the mindset I bring to every project as a Full-Stack Software Developer.",
    "Whether it’s designing APIs that handle millions of requests or engineering intuitive UIs with React,",
    "I strive to create systems that are robust and user-friendly.",
    "My love for debugging complex workflows is matched only by my passion for learning new tools to stay ahead of the curve.",
    "I believe in crafting software that isn’t just functional but transformative.",
  ];

  const playNarration = (index = currentLine) => {
    setIsPlaying(true);
    if (index < storyLines.length) {
      Speech.speak(storyLines[index], {
        pitch: 1.2,
        rate: 0.9,
        language: 'en-IN',
        voice: 'Google UK English Female',
        onDone: () => {
          setCurrentLine(index + 1);
          playNarration(index + 1);
        },
      });
    } else {
      setIsPlaying(false);
      setCurrentLine(0);
    }
  };

  const pauseNarration = () => {
    setIsPlaying(false);
    Speech.stop();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseNarration();
    } else {
      playNarration();
    }
  };

  const startReadingStory = () => {
    setShowModal(true);
    setVisibleLines([]);
    setCurrentLine(0);
    displayStoryLine(0);
  };

  const displayStoryLine = (index) => {
    if (index < storyLines.length) {
      setVisibleLines((prevLines) => [...prevLines, storyLines[index]]);
      setCurrentLine(index);

      opacityAnim.setValue(0);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => displayStoryLine(index + 1), 3000);
      });
    }
  };

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Avatar Image */}
          <Image
            source={require('../assets/my avatar.webp')} // Adjust the path if necessary
            style={styles.avatar}
          />

          {/* Name */}
          <Text style={styles.title}>Hi, I'm Varsha Thondalapally</Text>

          {/* LinkedIn-Style Headline */}
          <Text style={styles.headline}>
            🚀 Full-Stack Developer | AI & Cloud Enthusiast | Scalable Systems & Intuitive UX | Building Future-Ready Tech
          </Text>

          {/* Tagline */}
          <Text style={styles.tagline}>
            I grew up questioning how things work 🤔—now, I build systems that answer before you even ask ⚡. 
            I turn chaos into structure 🏗️, problems into opportunities 🚀, and ideas into products that actually make a difference 🌍.
          </Text>

          {/* Listen to My Story Button */}
          <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'mic-circle'}
              size={80}
              color="#FFFFFF"
            />
            <Text style={styles.buttonLabel}>Listen to My Story</Text>
          </TouchableOpacity>

          {/* Read My Story Button */}
          <TouchableOpacity style={styles.secondaryButton} onPress={startReadingStory}>
            <Text style={styles.secondaryButtonText}>Read My Story</Text>
          </TouchableOpacity>

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

                <View style={styles.storyContainer}>
                  {visibleLines.map((line, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.storyText,
                        index === currentLine && styles.currentLine,
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
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 160,  // Increased size
    height: 160, // Increased size
    borderRadius: 80, // Keeps it circular
    marginBottom: 20, // Slightly more spacing from text
    borderWidth: 4,
    borderColor: '#1DB954',
    shadowColor: '#000',  // Subtle shadow effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Shadow for Android
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headline: {
    color: '#1DB954',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
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
    color: '#1DB954',
    fontWeight: 'bold',
  },
});
