import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../contexts/AudioContext';

export default function WorkExperienceImmersive() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const workExperiences = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'PwC US',
      duration: 'Sep 2021 - Jan 2023',
      summary:
        'Architected microservices handling 5M+ transactions daily. Improved performance by 40% with Redis caching and secured privileged accounts with CyberArk PAM.',
      keyAchievements: [
        { icon: 'star', text: 'Achieved 100% security compliance' },
        { icon: 'speedometer', text: 'Reduced API response times by 40%' },
      ],
      challenges:
        'Faced significant performance bottlenecks in APIs, resolved by optimizing database queries and caching strategies.',
      skills: ['Java', 'Spring Boot', 'AWS', 'Redis', 'CyberArk'],
      bgColor: ['#1DB954', '#121212'],
    },
    {
      id: '2',
      title: 'Associate Software Engineer',
      company: 'DXC Technology',
      duration: 'Dec 2020 - Sep 2021',
      summary:
        'Developed healthcare APIs processing 100K+ records daily. Automated IAM workflows and reduced unauthorized access by 50%.',
      keyAchievements: [
        { icon: 'lock-closed', text: 'Achieved zero breaches for 12 months' },
        { icon: 'construct', text: 'Improved task efficiency by 40%' },
      ],
      challenges:
        'Faced data migration risks during API transitions; ensured seamless integration with zero downtime.',
      skills: ['Node.js', 'PowerShell', 'Angular', 'CI/CD', 'JWT'],
      bgColor: ['#0f2027', '#2c5364'],
    },
  ];

  const { isPlaying, playTrack, stopTrack, currentTrack } = useAudio();

  const handleNextSlide = () => {
    if (currentSlide < workExperiences.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <LinearGradient
      colors={workExperiences[currentSlide].bgColor}
      style={styles.container}
    >
      {/* Slide Content */}
      <View style={styles.slide}>
        <Text style={styles.title}>
          {workExperiences[currentSlide].title}
        </Text>
        <Text style={styles.company}>{workExperiences[currentSlide].company}</Text>
        <Text style={styles.duration}>
          {workExperiences[currentSlide].duration}
        </Text>

        {/* Summary */}
        <Text style={styles.summary}>
          {workExperiences[currentSlide].summary}
        </Text>

        {/* Key Achievements */}
        <View style={styles.achievements}>
          {workExperiences[currentSlide].keyAchievements.map((item, index) => (
            <View key={index} style={styles.achievementItem}>
              <Ionicons name={item.icon} size={20} color="#FFFFFF" />
              <Text style={styles.achievementText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.skills}>
          {workExperiences[currentSlide].skills.map((skill, index) => (
            <Text key={index} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>

        {/* Audio Controls */}
        <TouchableOpacity
          onPress={() =>
            currentTrack?.title === workExperiences[currentSlide].title &&
            isPlaying
              ? stopTrack()
              : playTrack(
                  workExperiences.map((exp) => ({
                    title: exp.title,
                    description: exp.summary,
                    text: `Role: ${exp.title}, Company: ${exp.company}. Achievements: ${exp.keyAchievements.map(
                      (ach) => ach.text
                    ).join(', ')}`,
                  })),
                  currentSlide,
                  'Work Experience',
                  'Professional Journey'
                )
          }
        >
          <Ionicons
            name={
              currentTrack?.title === workExperiences[currentSlide].title &&
              isPlaying
                ? 'pause-circle'
                : 'play-circle'
            }
            size={50}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePreviousSlide} disabled={currentSlide === 0}>
          <Ionicons
            name="chevron-back-circle"
            size={40}
            color={currentSlide === 0 ? '#666' : '#FFFFFF'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextSlide}
          disabled={currentSlide === workExperiences.length - 1}
        >
          <Ionicons
            name="chevron-forward-circle"
            size={40}
            color={currentSlide === workExperiences.length - 1 ? '#666' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', padding: 20 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' },
  company: { fontSize: 18, color: '#CCCCCC', marginTop: 5 },
  duration: { fontSize: 16, color: '#1DB954', marginVertical: 10 },
  summary: { fontSize: 16, color: '#DDDDDD', marginVertical: 20, textAlign: 'center' },
  achievements: { marginTop: 20 },
  achievementItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  achievementText: { color: '#FFFFFF', marginLeft: 10 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 },
  skillBadge: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  navigation: { flexDirection: 'row', justifyContent: 'space-between' },
});
