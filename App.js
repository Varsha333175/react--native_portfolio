import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Get the screen width

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>YourName</Text>
        <View style={styles.nav}>
          <Text style={styles.navLink}>Overview</Text>
          <Text style={styles.navLink}>Repositories</Text>
          <Text style={styles.navLink}>Projects</Text>
          <Text style={styles.navLink}>Contact</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>YourUsername</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Pinned Repositories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Repositories</Text>
        <View style={styles.repoGrid}>
          <View style={styles.repoCard}>
            <Text style={styles.repoName}>Repository 1</Text>
            <Text style={styles.repoDescription}>
              A tool for doing amazing things with ease.
            </Text>
            <Text style={styles.repoTechStack}>JavaScript</Text>
          </View>
          <View style={styles.repoCard}>
            <Text style={styles.repoName}>Repository 2</Text>
            <Text style={styles.repoDescription}>
              A chat application for seamless communication.
            </Text>
            <Text style={styles.repoTechStack}>Shell</Text>
          </View>
          <View style={styles.repoCard}>
            <Text style={styles.repoName}>Repository 3</Text>
            <Text style={styles.repoDescription}>
              A file-sharing app with secure transfers.
            </Text>
            <Text style={styles.repoTechStack}>JavaScript</Text>
          </View>
        </View>
      </View>

      {/* Contribution Graph Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contribution Activity</Text>
        <View style={styles.contributionGraph}>
          {[...Array(7)].map((_, rowIndex) => (
            <View key={rowIndex} style={styles.graphRow}>
              {[...Array(52)].map((_, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.graphSquare,
                    colIndex % 2 === 0 && styles.activeSquare, // Example of active squares
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117', // GitHub dark mode
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#161b22',
    padding: 10,
    paddingHorizontal: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
  },
  navLink: {
    color: '#58a6ff',
    marginLeft: 15,
    fontSize: 16,
  },
  profile: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: screenWidth > 600 ? 26 : 20, // Responsive font size
    color: '#c9d1d9',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#58a6ff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: screenWidth > 600 ? 20 : 10, // Adjust padding for larger screens
  },
  editProfileText: {
    color: '#58a6ff',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: screenWidth > 600 ? 40 : 20, // Adjust padding for larger screens
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: screenWidth > 600 ? 24 : 20, // Responsive font size
    fontWeight: 'bold',
    marginBottom: 15,
  },
  repoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: screenWidth > 600 ? 'flex-start' : 'space-between', // Adjust for larger screens
  },
  repoCard: {
    backgroundColor: '#161b22',
    width: screenWidth > 600 ? '30%' : '48%', // Wider cards on larger screens
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    marginRight: screenWidth > 600 ? '2%' : 0, // Add margin between cards on larger screens
  },
  repoName: {
    color: '#58a6ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  repoDescription: {
    color: '#c9d1d9',
    fontSize: 14,
    marginBottom: 5,
  },
  repoTechStack: {
    color: '#8b949e',
    fontSize: 12,
  },
  contributionGraph: {
    marginTop: 10,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  graphRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  graphSquare: {
    width: 10,
    height: 10,
    backgroundColor: '#161b22',
    marginRight: 2,
  },
  activeSquare: {
    backgroundColor: '#58a6ff',
  },
});
