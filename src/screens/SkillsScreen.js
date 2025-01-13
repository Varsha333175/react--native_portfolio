
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

export default function SkillsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [messageOpacity] = useState(new Animated.Value(0));
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
  
  const handleSearch = (text) => {
    setSearchTerm(text);

    if (text.trim().length === 0) {
      setFilteredSkills([]);
      return;
    }

    const lowerCaseText = text.toLowerCase();

    const matchingSkills = skills.map((group) => ({
      category: group.category,
      skills: group.skills.filter((skill) =>
        skill.toLowerCase().includes(lowerCaseText)
      ),
    }));

    setFilteredSkills(matchingSkills);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredSkills([]);
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
                {group.skills.map((skill, idx) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const lowerCaseSkill = skill.toLowerCase();
  const matchIndex = lowerCaseSkill.indexOf(lowerCaseSearchTerm);

  if (matchIndex !== -1 && searchTerm.length > 0) {
    // Split the skill into three parts: before, match, and after
    const beforeMatch = skill.slice(0, matchIndex);
    const matchText = skill.slice(matchIndex, matchIndex + searchTerm.length);
    const afterMatch = skill.slice(matchIndex + searchTerm.length);

    return (
      <View key={idx} style={styles.skillBadge}>
        <Text style={styles.skillText}>
          {beforeMatch}
          <Text style={styles.highlightedText}>{matchText}</Text>
          {afterMatch}
        </Text>
      </View>
    );
  } else {
    // Render the skill normally if no match is found
    return (
      <View key={idx} style={styles.skillBadge}>
        <Text style={styles.skillText}>{skill}</Text>
      </View>
    );
  }
})}

                </View>
              </View>
            )
        )}
      </ScrollView>
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
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    opacity: 0.8,
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease-in-out',
  },
  highlightedSkill: {
    backgroundColor: '#1DB954',
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  skillText: {
    color: '#FFF',
    fontSize: 14,
  },
  highlightedText: {
    color: '#1DB954', // Matches the green theme used throughout
    fontWeight: 'bold',
  },
  
});
