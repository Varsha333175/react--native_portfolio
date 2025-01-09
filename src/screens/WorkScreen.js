import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Animatable from 'react-native-animatable';

export default function WorkExperienceScreen() {
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: '1',
      logo: 'https://via.placeholder.com/100', // Replace with real company logo URL
      title: 'Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2020 - Present',
      tagline: 'Building scalable apps and leading teams.',
      achievements: [
        'Developed scalable web apps, improved performance by 35%.',
        'Reduced app load times by 40%.',
        'Mentored a team of junior developers.',
      ],
      technologies: ['React', 'Node.js', 'AWS'],
    },
    {
      id: '2',
      logo: 'https://via.placeholder.com/100', // Replace with real company logo URL
      title: 'Software Engineer',
      company: 'Innovate Labs',
      duration: 'Jul 2018 - Dec 2019',
      tagline: 'Streamlined CI/CD pipelines.',
      achievements: [
        'Reduced deployment times by 50%.',
        'Implemented Docker for containerization.',
        'Led internal hackathons for innovation.',
      ],
      technologies: ['Java', 'Docker', 'Kubernetes'],
    },
  ]);

  const [selectedExperience, setSelectedExperience] = useState(null);

  // TTS Functionality
  const speakDetails = (details) => {
    const text = [
      `Title: ${details.title}`,
      `Company: ${details.company}`,
      `Duration: ${details.duration}`,
      `Key Achievements: ${details.achievements.join(', ')}`,
      `Technologies Used: ${details.technologies.join(', ')}`,
    ].join('. ');
    Speech.speak(text, {
      pitch: 1.1,
      rate: 0.9,
      language: 'en-IN',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.playlistTitle}>My Work Experience</Text>
        <Text style={styles.playlistSubtitle}>
          A playlist of my professional journey 🎵
        </Text>
      </Animatable.View>

      {/* Work Experience Playlist */}
      <FlatList
        data={workExperiences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={100 * parseInt(item.id, 10)}
          >
            <TouchableOpacity
              style={styles.trackRow}
              onPress={() => setSelectedExperience(item)}
            >
              <Animatable.Image
                source={{ uri: item.logo }}
                style={styles.trackLogo}
                animation="bounceIn"
                iterationCount="infinite"
                iterationDelay={3000}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackSubtitle}>{item.company}</Text>
                <Text style={styles.trackDuration}>{item.duration}</Text>
                <Text style={styles.trackTagline}>{item.tagline}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Animatable.View>
        )}
      />

      {/* Add Job Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          setWorkExperiences([
            ...workExperiences,
            {
              id: String(workExperiences.length + 1),
              logo: 'https://via.placeholder.com/100',
              title: 'New Position',
              company: 'New Company',
              duration: 'Start Date - End Date',
              tagline: 'A new journey begins!',
              achievements: ['Achievement 1', 'Achievement 2'],
              technologies: ['Tech 1', 'Tech 2'],
            },
          ])
        }
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Detailed Job View Modal */}
      {selectedExperience && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedExperience}
          onRequestClose={() => setSelectedExperience(null)}
        >
          <Animatable.View
            animation="slideInUp"
            style={styles.modalContainer}
          >
            <ScrollView style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedExperience(null)}
              >
                <Ionicons name="close-circle" size={40} color="#1DB954" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedExperience.logo }}
                style={styles.modalLogo}
              />
              <Text style={styles.modalTitle}>{selectedExperience.title}</Text>
              <Text style={styles.modalSubtitle}>
                {selectedExperience.company}
              </Text>
              <Text style={styles.modalDuration}>
                {selectedExperience.duration}
              </Text>

              <Text style={styles.sectionTitle}>Achievements:</Text>
              {selectedExperience.achievements.map((achievement, idx) => (
                <Text key={idx} style={styles.achievement}>
                  - {achievement}
                </Text>
              ))}

              <Text style={styles.sectionTitle}>Technologies Used:</Text>
              <Text style={styles.technologies}>
                {selectedExperience.technologies.join(', ')}
              </Text>

              {/* TTS Button */}
              <TouchableOpacity
                style={styles.ttsButton}
                onPress={() => speakDetails(selectedExperience)}
              >
                <Ionicons name="volume-high" size={24} color="#FFFFFF" />
                <Text style={styles.ttsButtonText}>Listen to Details</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animatable.View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    backgroundColor: '#1DB954',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  playlistTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  playlistSubtitle: {
    fontSize: 16,
    color: '#DDDDDD',
    marginTop: 5,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  trackLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trackSubtitle: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  trackDuration: {
    fontSize: 12,
    color: '#777777',
  },
  trackTagline: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1DB954',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  modalContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDuration: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1DB954',
    marginTop: 20,
    marginBottom: 10,
  },
  achievement: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  technologies: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  ttsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  ttsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
