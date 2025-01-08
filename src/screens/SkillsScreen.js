import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SkillsScreen() {
  const skills = [
    { name: 'React Native', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'UI/UX Design', level: 75 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Skills</Text>
      {skills.map((skill, index) => (
        <View key={index} style={styles.skillContainer}>
          <Text style={styles.skillName}>{skill.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${skill.level}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  heading: {
    color: '#1DB954',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  skillContainer: {
    marginBottom: 15,
  },
  skillName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#1DB954',
  },
});
