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
      summary: 'Crafted scalable full-stack solutions, handling 5M+ daily transactions while implementing robust IAM systems with cutting-edge security protocols.',
keyAchievements: [
  { icon: 'laptop', text: 'Full Stack Development: Built microservices with Java, Spring Boot, and Angular.' },
  { icon: 'lock', text: 'IAM Expertise: Deployed CyberArk PAM for 100+ privileged accounts with MFA and RBAC.' },
  { icon: 'rocket', text: 'Performance Optimization: Boosted API response by 40% with Redis caching.' },
  { icon: 'cloud', text: 'Cloud Integration: Designed scalable systems on AWS (EC2, RDS, Lambda).' },
  { icon: 'wrench', text: 'Tech Stack: Java, Spring Boot, Angular, AWS, Redis, CyberArk, Jenkins, Docker.' },
],
challenges: 'Faced significant performance bottlenecks in APIs, resolved by optimizing database queries and caching strategies.',
skills: ['Java', 'Spring Boot', 'Angular', 'AWS', 'Redis', 'CyberArk', 'Jenkins', 'Docker'],
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
    currentTrack?.title === workExperiences[currentSlide].title && isPlaying
      ? stopTrack()
      : playTrack(
          workExperiences.map((exp) => ({
            title: exp.title,
            description: exp.summary,
            text: exp.id === '1'
              ? `At PwC US, I combined full-stack development expertise and IAM solutions to deliver secure, high-performance systems. On the backend, I developed microservices in Java and Spring Boot, seamlessly integrated with scalable front-end components using Angular. I implemented Redis caching to optimize API response times by 40% and designed efficient database schemas that supported over 5 million daily transactions. As an IAM analyst, I implemented CyberArk PAM for 100+ privileged accounts, securing access with MFA and RBAC, achieving flawless security compliance. I also automated deployment pipelines using Jenkins, Docker, and Kubernetes, reducing release cycles by 30% while maintaining high code quality. My work was driven by the challenge to ensure performance, security, and user-centric design across every layer of the stack.`
              : exp.id === '2'
              ? `At DXC Technology, I developed healthcare APIs processing 100K+ records daily, ensuring efficiency and accuracy. I automated IAM workflows, significantly reducing unauthorized access by 50% while enhancing task efficiency by 40%. My contributions involved ensuring seamless data migrations during API transitions and securing data with JWT authentication. I also optimized CI/CD pipelines for faster deployments and greater scalability.`
              : ``
          })),
          currentSlide,
          'Work Experience',
          'Professional Journey'
        )
  }
>
  <Ionicons
    name={
      currentTrack?.title === workExperiences[currentSlide].title && isPlaying
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
