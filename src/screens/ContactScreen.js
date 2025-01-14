import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const ContactItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#1DB954" style={styles.icon} />
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

export default function ContactScreen() {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  const { width } = useWindowDimensions(); // Dynamically get screen width
  const isSmallScreen = width < 600; // Threshold for small screens

  if (isSmallScreen) {
    // Swipeable Layout for Small Screens
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Swipe 1: Video */}
        <View style={[styles.swipeItem, { width }]}>
          <Video
            source={require('../assets/4.mp4')} // Replace with your video path
            style={styles.video}
            resizeMode="contain"
            isLooping
            shouldPlay
            isMuted
          />
        </View>

        {/* Swipe 2: Text and Buttons */}
        <View style={[styles.swipeItem, { width }]}>
          <Text style={styles.headerText}>Get in Touch</Text>
          <Text style={styles.subText}>
            Have questions or want to collaborate? Reach out through any of these platforms:
          </Text>
          <ContactItem
            icon="logo-linkedin"
            label="LinkedIn"
            onPress={() => openLink('https://www.linkedin.com/')}
          />
          <ContactItem
            icon="logo-github"
            label="GitHub"
            onPress={() => openLink('https://github.com/')}
          />
          <ContactItem
            icon="mail-outline"
            label="Email Me"
            onPress={() => openLink('mailto:your-email@example.com')}
          />
        </View>
      </ScrollView>
    );
  }

  // Split-Screen Layout for Larger Screens
  return (
    <View style={styles.container}>
      <View style={styles.leftHalf}>
        <Video
          source={require('../assets/4.mp4')} // Replace with your video path
          style={styles.video}
          resizeMode="contain"
          isLooping
          shouldPlay
          isMuted
        />
      </View>
      <View style={styles.rightHalf}>
        <Text style={styles.headerText}>Get in Touch</Text>
        <Text style={styles.subText}>
          Have questions or want to collaborate? Reach out through any of these platforms:
        </Text>
        <ContactItem
          icon="logo-linkedin"
          label="LinkedIn"
          onPress={() => openLink('https://www.linkedin.com/')}
        />
        <ContactItem
          icon="logo-github"
          label="GitHub"
          onPress={() => openLink('https://github.com/')}
        />
        <ContactItem
          icon="mail-outline"
          label="Email Me"
          onPress={() => openLink('mailto:your-email@example.com')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Split screen horizontally
    backgroundColor: '#121212',
  },
  leftHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  rightHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  video: {
    width: '100%',
    aspectRatio: 9 / 16, // Maintain 9:16 aspect ratio
  },
  headerText: {
    color: '#1DB954',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
  },
  icon: {
    marginRight: 10,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  swipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
