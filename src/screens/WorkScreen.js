import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../contexts/AudioContext';

export default function WorkExperienceScreen() {
  const [workExperiences] = useState([
    {
      id: '1',
      logo: 'https://via.placeholder.com/100',
      title: 'Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2020 - Present',
      tagline: 'Building scalable apps and leading teams.',
      description: 'Developed scalable web apps, improved performance by 35%.',
      emotion: 'happy',
    },
    {
      id: '2',
      logo: 'https://via.placeholder.com/100',
      title: 'Software Engineer',
      company: 'Innovate Labs',
      duration: 'Jul 2018 - Dec 2019',
      tagline: 'Streamlined CI/CD pipelines.',
      description: 'Reduced deployment times by 50%.',
      emotion: 'neutral',
    },
    {
      id: '3',
      logo: 'https://via.placeholder.com/100',
      title: 'Intern',
      company: 'Future Tech',
      duration: 'Jan 2018 - Jun 2018',
      tagline: 'Contributed to core feature development.',
      description: 'Implemented core features, reduced system downtime.',
      emotion: 'excited',
    },
  ]);

  const { isPlaying, playTrack, stopTrack, currentTrack } = useAudio();

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Work Experience</Text>
        <Text style={styles.subtitle}>
          A playlist of my professional journey 🎵
        </Text>
      </View>

      <FlatList
        data={workExperiences}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCompany}>{item.company}</Text>
              <Text style={styles.cardDuration}>{item.duration}</Text>
              <Text style={styles.cardTagline}>{item.tagline}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                currentTrack?.title === item.title && isPlaying
                  ? stopTrack()
                  : playTrack(
                      workExperiences.map((exp) => ({
                        title: exp.title,
                        description: exp.tagline,
                        text: `Role: ${exp.title}, Company: ${exp.company}. Achievements: ${exp.description}`,
                      })),
                      index,
                      'Work Experience',
                      'Professional Journey',
                      item.emotion // Pass emotion here
                    )
              }
            >
              <Ionicons
                name={
                  currentTrack?.title === item.title && isPlaying
                    ? 'pause-circle'
                    : 'play-circle'
                }
                size={40}
                color="#1DB954"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  title: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#DDDDDD', marginTop: 5 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
  },
  logo: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  cardCompany: { fontSize: 16, color: '#CCCCCC' },
  cardDuration: { fontSize: 14, color: '#1DB954' },
  cardTagline: { fontSize: 14, color: '#AAAAAA' },
});
