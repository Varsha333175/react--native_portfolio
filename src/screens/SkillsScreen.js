
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SkillsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [matchedSkill, setMatchedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [messageOpacity] = useState(new Animated.Value(0));
  const [showConfetti, setShowConfetti] = useState(false);
  const glowAnim = useState(new Animated.Value(0))[0];
  const { width, height } = Dimensions.get('window');

  const skills = [
    {
      category: "Coding Languages",
      skills: [
        "Bash", "C", "C++", "JUnit", "Java", "JavaScript", "Programming",
        "Python", "Redux", "Scripting", "TypeScript"
      ],
    },
    {
      category: "General",
      skills: [
        "Collaboration", "Compliance", "Design", "Jira", "Management",
        "Project Management", "Reporting", "Responsive Design", "Scrum",
        "User Engagement", "Accessibility", "Docs", "Driving", "Onboarding",
        "Operations", "Resilience", "User Interface"
      ],
    },
    {
      category: "Technical",
      skills: [
        "Access Controls", "Active Directory", "Algorithms", "Amazon EC2",
        "Amazon S3", "Amazon Web Services", "Angular", "AngularJS",
        "Apache Cassandra", "Apache Kafka", "Apache Maven", "Applications",
        "Architecture", "Authentication", "Automation", "Backend",
        "Big Data", "Bitbucket", "Bootstrap", "Caching", "Cassandra", "Cloud",
        "Cloud Computing", "Dashboards", "Data Processing", "Data Structures",
        "Databases", "Databricks", "DevOps", "Docker", "DynamoDB",
        "File Sharing", "Git", "GitHub", "Gradle", "HTML5", "Hadoop",
        "Hibernate", "Integration", "Jenkins", "Kubernetes", "Machine Learning",
        "Mockito", "MongoDB", "MySQL", "Navigation", "Node.js", "OAuth",
        "Performance", "PostgreSQL", "PowerShell", "Redis", "Redshift",
        "Reliability", "SQL", "Security", "ServiceNow", "Shell Scripting",
        "Snowflake", "Spring", "Terraform", "Testing", "Web Development",
        "jQuery", "Analysis", "Debugging", "Deployment", "Devices",
        "Load Balancing", "Monitoring", "Rapid", "Search", "Security Standards",
        "Storage", "Teams"
      ],
    },
    {
      category: "Backend Technologies",
      skills: [
        "Node.js", "Spring Boot", "Redis", "MySQL", "RESTful APIs", "Hibernate",
        "Microservices"
      ],
    },
    {
      category: "Frontend Technologies",
      skills: [
        "React", "Angular", "HTML5", "CSS3", "Bootstrap", "Redux",
        "TypeScript", "jQuery"
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        "AWS (EC2, S3, Lambda)", "Azure", "Jenkins", "Docker", "Kubernetes",
        "Terraform", "CI/CD", "Git"
      ],
    },
    {
      category: "Security",
      skills: [
        "CyberArk", "OAuth 2.0", "SSO", "MFA", "Active Directory",
        "JWT", "RBAC", "SSL/TLS"
      ],
    },
    {
      category: "Project Management & Agile",
      skills: [
        "Agile (Scrum, Kanban)", "SDLC", "Jira", "Onboarding",
        "Operations", "Project Management"
      ],
    },
    {
      category: "Testing & Version Control",
      skills: [
        "JUnit", "Mockito", "Postman", "Maven", "Gradle"
      ],
    },
  ];

  const calculateSimilarity = (input, skill) => {
    const inputLower = input.toLowerCase();
    const skillLower = skill.toLowerCase();

    if (skillLower.includes(inputLower)) return 1;

    let matches = 0;
    for (let i = 0; i < inputLower.length; i++) {
      if (inputLower[i] === skillLower[i]) {
        matches++;
      } else {
        break;
      }
    }
    return matches / skillLower.length;
  };

  const handleSearch = (text) => {
    setSearchTerm(text);

    const cleanedInput = text.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Escape regex characters
    if (cleanedInput.length < 2) {
      setFilteredSkills([]);
      setMatchedSkill('');
      setMessage('');
      setShowConfetti(false);
      return;
    }

    const lowerCaseText = cleanedInput.toLowerCase();
    const matchingSkills = skills.map((group) => ({
      category: group.category,
      skills: group.skills.filter((skill) =>
        skill.toLowerCase().includes(lowerCaseText) || calculateSimilarity(lowerCaseText, skill) > 0.5
      ),
    }));

    const allMatchingSkills = matchingSkills.flatMap((group) => group.skills);

    if (allMatchingSkills.length > 0) {
      setFilteredSkills(matchingSkills);
      setMatchedSkill(allMatchingSkills[0]);
      setMessage('🎉 Hooray! I have that skill!');

      Animated.sequence([
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(messageOpacity, {
          toValue: 0,
          duration: 1500,
          delay: 1000,
          useNativeDriver: true,
        }),
      ]).start();

      setShowConfetti(true);

      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        Vibration.vibrate(50);
      }

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      setFilteredSkills([]);
      setMatchedSkill('');
      setShowConfetti(false);

      const similarSkills = skills.flatMap((group) =>
        group.skills.filter((skill) => calculateSimilarity(lowerCaseText, skill) > 0.3)
      );

      if (similarSkills.length > 0) {
        setMessage(
          `I may not have "${text}" yet, but I’ve worked with similar skills: ${similarSkills.join(', ')}.`
        );
      } else {
        setMessage(`Hmm... I don’t have "${text}" in my toolkit yet, but I’m always ready to learn!`);
      }

      Animated.sequence([
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(messageOpacity, {
          toValue: 0,
          duration: 1500,
          delay: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredSkills([]);
    setMatchedSkill('');
    setShowConfetti(false);
  };

  const highlightMatchedText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'i'); // Case-insensitive match
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  const skillsToRender = searchTerm ? filteredSkills : skills;

  return (
    <LinearGradient
      colors={['#1DB954', '#121212']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1DB954" />

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Skills..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Skills */}
      <ScrollView
        contentContainerStyle={styles.skillsContainer}
        showsVerticalScrollIndicator={false}
      >
        {skillsToRender.map(
          (group, index) =>
            group.skills.length > 0 && (
              <View key={index} style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>{group.category}</Text>
                <View style={styles.skillTags}>
                  {group.skills.map((skill, idx) => (
                    <Animated.View
                      key={idx}
                      style={[
                        styles.skillBadge,
                        matchedSkill &&
                          skill.toLowerCase().includes(matchedSkill.toLowerCase()) && {
                            shadowColor: '#1DB954',
                            shadowOffset: { width: 0, height: 0 },
                            shadowRadius: glowAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 10],
                            }),
                            shadowOpacity: 1,
                          },
                      ]}
                    >
                      <Text style={styles.skillText}>
                        {highlightMatchedText(skill, searchTerm)}
                      </Text>
                    </Animated.View>
                  ))}
                </View>
              </View>
            )
        )}
      </ScrollView>

      {/* Message for Matched or Unmatched Skill */}
      {message && (
        <Animated.View
          style={[
            styles.messageContainer,
            {
              opacity: messageOpacity,
              top: height / 3,
              left: width / 2 - 150,
            },
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <ConfettiCannon
          count={50}
          origin={{ x: width / 2, y: height / 3 }}
          fadeOut
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 36,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#FFF',
    fontSize: 14,
    borderColor: '#1DB954',
    borderWidth: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
  },
  skillsContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: '#1DB954',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  skillText: {
    color: '#FFF',
    fontSize: 14,
  },
  highlightedText: {
    color: '#1DB954',
    fontWeight: 'bold',
    textShadowColor: '#0D4D1A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  messageContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
