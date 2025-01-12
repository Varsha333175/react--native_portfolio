import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

import { useAudio } from '../contexts/AudioContext';

const { width } = Dimensions.get('window');

export default function WorkExperienceImmersive() {
  const [readMoreIndex, setReadMoreIndex] = useState(null); // Tracks the slide index for "Read More"
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Tracks section within the modal

  const workExperiences = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'PwC US',
      duration: 'Sep 2021 - Jan 2023',
      summary:
        'Crafted scalable full-stack solutions, handling 5M+ daily transactions while implementing robust IAM systems with cutting-edge security protocols.',
        keyAchievements: [
          { icon: 'code-outline', text: 'Full Stack Development: Built microservices with Java, Spring Boot, and Angular.' },
          { icon: 'shield-checkmark-outline', text: 'IAM Expertise: Deployed CyberArk PAM for 100+ privileged accounts with MFA and RBAC.' },
          { icon: 'speedometer-outline', text: 'Performance Optimization: Boosted API response by 40% with Redis caching.' },
          { icon: 'cloud-upload-outline', text: 'Cloud Integration: Designed scalable systems on AWS (EC2, RDS, Lambda).' },
          { icon: 'hammer-outline', text: 'Tech Stack: Java, Spring Boot, Angular, AWS, Redis, CyberArk, Jenkins, Docker.' },
        ],
        
      detailedDescription: [
        {
          title: 'Backend Architecture and Microservices',
          content: [
            { text: "At PwC, I built and optimized microservices using ", highlight: false },
            { text: "Java", highlight: true },
            { text: " and ", highlight: false },
            { text: "Spring Boot", highlight: true },
            { text: ", which handled over 5 million daily transactions with high reliability. I designed RESTful APIs following ", highlight: false },
            { text: "best practices", highlight: true },
            { text: " like modularization and loose coupling, ensuring scalability and easy integration across systems. To improve performance, I integrated ", highlight: false },
            { text: "Redis caching", highlight: true },
            { text: ", which reduced API response times by ", highlight: false },
            { text: "40%", highlight: true },
            { text: ". I also worked on optimizing ", highlight: false },
            { text: "MySQL databases", highlight: true },
            { text: ", refining queries and adding indexes to reduce data retrieval times, resulting in a ", highlight: false },
            { text: "25% improvement", highlight: true },
            { text: " in efficiency during high traffic periods.", highlight: false },
          ],
        },
        {
          title: 'Frontend Development',
          content: [
            { text: "In the front-end space, I developed dynamic user interfaces using ", highlight: false },
            { text: "Angular", highlight: true },
            { text: " and ", highlight: false },
            { text: "TypeScript", highlight: true },
            { text: ", with a strong emphasis on reusability and scalability. I implemented a component-based design, which allowed the development team to reuse key elements across the platform, reducing development time. By using ", highlight: false },
            { text: "HTML5", highlight: true },
            { text: " and ", highlight: false },
            { text: "CSS3", highlight: true },
            { text: " for responsiveness, I enhanced user engagement and accessibility, contributing to a ", highlight: false },
            { text: "25% increase", highlight: true },
            { text: " in customer satisfaction. Additionally, I introduced lazy loading techniques to optimize loading times for large-scale single-page applications.", highlight: false },
          ],
        },
        {
          title: 'Cloud Architecture and Scalability',
          content: [
            { text: "I deployed scalable backend services on ", highlight: false },
            { text: "AWS EC2", highlight: true },
            { text: " and ", highlight: false },
            { text: "RDS", highlight: true },
            { text: ", leveraging auto-scaling groups and multi-AZ setups for fault tolerance and high availability. To handle asynchronous workflows, I designed serverless functions with ", highlight: false },
            { text: "AWS Lambda", highlight: true },
            { text: ", which improved processing efficiency while reducing infrastructure costs. Using ", highlight: false },
            { text: "Amazon CloudWatch", highlight: true },
            { text: ", I monitored system performance, set up alarms, and troubleshot bottlenecks, ensuring uptime and proactive issue resolution.", highlight: false },
          ],
        },
        {
          title: 'Identity and Access Management (IAM)',
          content: [
            { text: "In my role as an IAM Analyst, I implemented ", highlight: false },
            { text: "CyberArk PAM", highlight: true },
            { text: " to manage privileged accounts for 100+ critical users. This included configuring multi-factor authentication (", highlight: false },
            { text: "MFA", highlight: true },
            { text: ") and enforcing ", highlight: false },
            { text: "Role-Based Access Control (RBAC)", highlight: true },
            { text: " policies to ensure secure access. I worked on designing and integrating ", highlight: false },
            { text: "OAuth 2.0", highlight: true },
            { text: " workflows for seamless authentication, enabling single sign-on (SSO) capabilities across enterprise applications.", highlight: false },
          ],
        },
        {
          title: 'DevOps and CI/CD',
          content: [
            { text: "To streamline the development lifecycle, I built CI/CD pipelines using ", highlight: false },
            { text: "Jenkins", highlight: true },
            { text: " for automated testing and deployment. I containerized microservices with ", highlight: false },
            { text: "Docker", highlight: true },
            { text: ", ensuring consistent environments across development and production stages. I also deployed and managed ", highlight: false },
            { text: "Kubernetes", highlight: true },
            { text: " clusters, implementing rolling updates to minimize downtime and improve deployment efficiency.", highlight: false },
          ],
        },
      ],
      bgColor: ['#1DB954', '#121212'],
      audioText: `During my time as a Software Engineer at PwC US, I had the opportunity to design and build systems that powered seamless, fault-tolerant workflows for millions of daily transactions. On the backend, I developed robust microservices using Java and Spring Boot, creating RESTful APIs that ensured reliability and scalability. On the frontend, I crafted dynamic user interfaces with React, focusing on reusable components to deliver consistent, responsive experiences across devices.

To handle the massive scale of operations, I architected AWS cloud-native systems using EC2, Lambda, and RDS to process terabytes of data. I optimized storage and retrieval strategies on AWS S3 and DynamoDB, enhancing real-time data access and improving efficiency. My work extended to automating the development lifecycle through CI/CD pipelines built with Jenkins, Docker, and Kubernetes, which streamlined build, test, and deployment processes, cutting down development time significantly.

As a problem-solver, I routinely diagnosed and resolved production issues through root cause analysis and debugging, ensuring system stability and reliability. I also took pride in fostering team collaboration by authoring API documentation and system designs. This effort not only expedited onboarding for new developers but also improved project delivery timelines.

At its core, my work at PwC was about creating scalable, reliable, and user-centric solutions—turning complex challenges into streamlined systems that delivered results.`,
    },

    {
      id: '2',
      title: 'Junior Developer',
      company: 'Tech Solutions Inc.',
      duration: 'Jun 2019 - Aug 2021',
      summary: 'Developed front-end features...',
      keyAchievements: [
        { icon: 'rocket', text: 'Improved app performance by 30%.' },
        { icon: 'cloud', text: 'Integrated AWS services for scalability.' },
      ],
      bgColor: ['#FF5722', '#263238'],
      audioText: `Audio for Tech Solutions Inc...`,
      detailedDescription: [
        { title: 'Responsive Design', content: [{ text: 'Improved accessibility...', highlight: true }] },
        { title: 'Cloud Solutions', content: [{ text: 'Deployed scalable systems...', highlight: false }] },
      ],
    },
  ];

  const { isPlaying, playTrack, stopTrack, currentTrack } = useAudio();

  const handleShowReadMore = (index) => {
    setReadMoreIndex(index);
    setCurrentSectionIndex(0);
  };

  const handleHideReadMore = () => {
    setReadMoreIndex(null);
  };

  const handleNextSection = () => {
    if (readMoreIndex !== null) {
      const sections = workExperiences[readMoreIndex].detailedDescription;
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  return (
    <Swiper loop={false} showsPagination={true} activeDotColor="#1DB954">
      {workExperiences.map((experience, index) => (
        <LinearGradient
          key={experience.id}
          colors={experience.bgColor}
          style={styles.container}
        >
          <View style={styles.slide}>
  <Text style={styles.title}>{experience.title}</Text>
  <Text style={styles.company}>{experience.company}</Text>
  <Text style={styles.duration}>{experience.duration}</Text>
  <Text style={styles.summary}>{experience.summary}</Text>

  {experience.keyAchievements.map((achievement, idx) => (
  <View key={idx} style={styles.achievementItem}>
    <Ionicons
      name={achievement.icon}
      size={20}
      color="#1DB954"
      style={styles.icon}
    />
    <Text style={styles.achievementText}>
      <Text style={styles.achievementCategory}>
        {achievement.text.split(':')[0]}: {/* Category (x) */}
      </Text>
      <Text style={styles.achievementDetail}>
        {achievement.text.split(':')[1]} {/* Details (y) */}
      </Text>
    </Text>
  </View>
))}


  <TouchableOpacity
    style={styles.readMoreButton}
    onPress={() => handleShowReadMore(index)}
  >
    <Text style={styles.readMoreText}>Read More</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() =>
      currentTrack?.title === experience.title && isPlaying
        ? stopTrack()
        : playTrack(
            workExperiences.map(exp => ({
              title: exp.title,
              text: exp.audioText,
            })),
            index,
            'Work Experience',
            'Professional Journey'
          )
    }
  >
    <Ionicons
      name={
        currentTrack?.title === experience.title && isPlaying
          ? 'pause-circle'
          : 'play-circle'
      }
      size={50}
      color="#FFFFFF"
    />
  </TouchableOpacity>
</View>


          {/* Read More Modal */}
          {readMoreIndex === index && (
            <View style={styles.modalContainer}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {
                    experience.detailedDescription[currentSectionIndex].title
                  }
                </Text>
                <Text style={styles.sectionText}>
                  {experience.detailedDescription[currentSectionIndex].content.map(
                    (part, idx) => (
                      <Text
                        key={idx}
                        style={
                          part.highlight
                            ? [styles.sectionText, styles.highlight]
                            : styles.sectionText
                        }
                      >
                        {part.text}
                      </Text>
                    )
                  )}
                </Text>
              </View>

              <View style={styles.sectionNavigation}>
                <TouchableOpacity
                  onPress={handlePreviousSection}
                  disabled={currentSectionIndex === 0}
                >
                  <Ionicons
                    name="chevron-back-circle"
                    size={40}
                    color={currentSectionIndex === 0 ? '#666' : '#1DB954'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextSection}
                  disabled={
                    currentSectionIndex ===
                    experience.detailedDescription.length - 1
                  }
                >
                  <Ionicons
                    name="chevron-forward-circle"
                    size={40}
                    color={
                      currentSectionIndex ===
                      experience.detailedDescription.length - 1
                        ? '#666'
                        : '#1DB954'
                    }
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleHideReadMore}
              >
                <Ionicons name="close-circle" size={40} color="#1DB954" />
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', padding: 20 },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' },
  company: { fontSize: 18, color: '#CCCCCC', marginTop: 5 },
  duration: { fontSize: 16, color: '#1DB954', marginVertical: 10 },
  summary: { fontSize: 16, color: '#DDDDDD', marginVertical: 20, textAlign: 'center' },
  achievementsContainer: { marginVertical: 20 },
  achievementItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  achievementText: { marginLeft: 10, color: '#FFFFFF', fontSize: 16 },
  readMoreButton: { marginTop: 20, padding: 10, backgroundColor: '#1DB954', borderRadius: 5 },
  readMoreText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  achievementText: { 
    marginLeft: 10, 
    fontSize: 16, 
    flexWrap: 'wrap', 
    color: '#FFFFFF' 
  },
  achievementCategory: { 
    fontWeight: 'bold', 
    color: '#1DB954', 
  },
  achievementDetail: { 
    color: '#DDDDDD', 
    fontWeight: 'normal',
  },
  
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#DDDDDD',
    lineHeight: 24,
  },
  highlight: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  sectionNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
