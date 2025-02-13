import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform, Linking } from 'react-native';
import ReactGA from 'react-ga4';


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


  const downloadResume = async () => {
    const resumeURL = '/resume.pdf'; // Path in the public folder
  
    if (Platform.OS === 'web') {
      // Open the resume in a new tab
      window.open(resumeURL, '_blank');
  
      // Ask user if they want to download
      setTimeout(() => {
        const confirmDownload = window.confirm("Do you want to download the resume?");
        if (confirmDownload) {
          const anchor = document.createElement('a');
          anchor.href = resumeURL;
          anchor.download = 'resume.pdf';
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
  
          // Track download event in Google Analytics
          ReactGA.event({
            category: 'Resume',
            action: 'Download',
            label: 'User downloaded resume from web',
          });
        }
      }, 2000);
    } else {
      // Mobile: Open URL in browser (you can also use Linking)
      Linking.openURL(resumeURL);
  
      // Track analytics immediately
      ReactGA.event({
        category: 'Resume',
        action: 'Open',
        label: 'User opened resume on mobile',
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
          <Text style={styles.title}>Hi, I'm Varsha </Text>

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

          {/* Download Resume Button */}
          <TouchableOpacity style={styles.downloadButton} onPress={downloadResume}>
            <Ionicons name="download" size={24} color="#FFFFFF" />
            <Text style={styles.downloadButtonText}>Download Resume</Text>
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
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#1DB954',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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
    marginTop: 10, // Adjusted margin to ensure proper spacing
  },
  secondaryButtonText: {
    color: '#1DB954',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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

