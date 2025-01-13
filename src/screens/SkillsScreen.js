import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon'; // Add confetti effect

export default function SkillsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageAnim] = useState(new Animated.Value(0)); // Animation for "Hooray" message
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const skills = {
    'Coding Languages': [
      'Java',
      'JavaScript',
      'TypeScript',
      'Python',
      'C',
      'C++',
      'JUnit',
      'SQL',
      'Shell Scripting',
    ],
    'Backend Technologies': [
      'Spring Boot',
      'Microservices',
      'RESTful APIs',
      'Node.js',
      'Hibernate',
      'Backend Optimization',
    ],
    'Frontend Technologies': [
      'Angular',
      'React',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'Redux',
    ],
    'Cloud and DevOps': [
      'AWS (EC2, S3, Lambda, RDS, DynamoDB)',
      'Azure',
      'Jenkins',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD Pipelines',
      'Git',
      'Cloud-Native Systems',
      'Build Automation',
    ],
    Database: [
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Cassandra',
      'SQL Query Optimization',
      'Indexing',
    ],
    'Security and IAM': [
      'CyberArk',
      'OAuth 2.0',
      'SSO',
      'MFA',
      'Active Directory',
      'JWT',
      'RBAC',
      'SSL/TLS',
      'Access Controls',
      'Privileged Access Management (PAM)',
    ],
    'System Design': [
      'Fault-Tolerant Architectures',
      'Load Balancing',
      'Data Structures & Algorithms',
      'High Availability Systems',
      'Modular System Architecture',
      'Cloud Integration',
      'Real-Time Monitoring',
    ],
    'Project Management & Agile': [
      'Agile (Scrum, Kanban)',
      'SDLC',
      'Jira',
      'Cross-Functional Collaboration',
      'Sprint Planning',
      'Root Cause Analysis',
    ],
    'Testing and Version Control': [
      'JUnit',
      'Mockito',
      'Postman',
      'Maven',
      'Gradle',
    ],
    Certifications: [
      'AWS Certified Solutions Architect – Associate',
      'CyberArk Defender - Privileged Access Management (PAM)',
    ],
    General: [
      'Compliance',
      'Design',
      'Disaster Recovery',
      'Management',
      'Provisioning',
      'Responsive Design',
      'Security Standards',
      'Troubleshooting',
    ],
    Technical: [
      'Access Controls',
      'Algorithms',
      'Amazon EC2',
      'AngularJS',
      'Applications',
      'Automation',
      'Big Data',
      'Cloud Computing',
      'Diagnostics',
      'Machine Learning',
      'Performance',
      'Scalability',
    ],
  };

  const filteredSkills = Object.keys(skills).reduce((acc, category) => {
    const filteredItems = skills[category].filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) acc[category] = filteredItems;
    return acc;
  }, {});

  const hasMatchingSkill = Object.values(filteredSkills).flat().length > 0;

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        if (searchQuery && hasMatchingSkill) {
          setShowMessage(true);
          setShowConfetti(true);
          Animated.sequence([
            Animated.timing(messageAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(messageAnim, {
              toValue: 0,
              duration: 500,
              delay: 4000, // Message stays longer
              useNativeDriver: true,
            }),
          ]).start(() => {
            setShowMessage(false);
            setShowConfetti(false);
          });
        }
      }, 800)
    );
  }, [searchQuery, hasMatchingSkill]);

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Skills..."
        placeholderTextColor="#888"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      {showMessage && (
        <>
          <Animated.View
            style={[
              styles.hoorayMessage,
              { opacity: messageAnim, transform: [{ scale: messageAnim }] },
            ]}
          >
            <Text style={styles.hoorayText}>🎉 Hooray! I have that skill!</Text>
          </Animated.View>
          {showConfetti && (
            <ConfettiCannon
              count={100}
              origin={{ x: 180, y: 10 }} // Adjust origin point
              fadeOut={true}
              explosionSpeed={300}
            />
          )}
        </>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(filteredSkills).map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.skillsContainer}>
              {filteredSkills[category].map((skill, index) => (
                <Text key={index} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#FFFFFF',
    fontSize: 16,
    elevation: 2,
  },
  hoorayMessage: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  hoorayText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
    elevation: 2,
  },
});
