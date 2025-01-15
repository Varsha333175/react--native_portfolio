import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  ScrollView,
  Animated,
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

  const { width, height } = useWindowDimensions(); // Dynamically get screen width
  const isSmallScreen = width < 600; // Threshold for small screens
  const isExtraSmallScreen = width < 300; // Threshold for very small windows
  const [scrollX] = useState(new Animated.Value(0)); // Track scrolling for animations

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    Animated.timing(scrollX, {
      toValue: offsetX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  if (isExtraSmallScreen) {
    // Invisible Scroll Layout for Extra-Small Screens
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.extraSmallContainer}
      >
        <View style={styles.swipeItem}>
          <Video
            source={require('../assets/4.mp4')} // Replace with your video path
            style={styles.video}
            resizeMode="contain"
            isLooping
            shouldPlay
            isMuted
          />
        </View>
        <View style={styles.swipeItem}>
          <Text style={styles.headerText}>Get in Touch</Text>
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

  if (isSmallScreen) {
    // Swipeable Layout for Small Screens
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
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
        {/* Floating "Swipe" Text */}
        <Animated.View
          style={[
            styles.swipeTextContainer,
            { opacity: scrollX.interpolate({ inputRange: [0, width], outputRange: [1, 0] }) },
          ]}
        >
          <Text style={styles.swipeText}>Swipe to see more →</Text>
        </Animated.View>
      </View>
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
    flexDirection: 'row',
    backgroundColor: '#1DB954',
    
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
    aspectRatio: 9 / 16,
  },
  swipeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: '#1DB954', // Bright green for better visibility
    fontSize: 32, // Slightly larger font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000000', // Add a shadow to enhance contrast
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subText: {
    color: '#DDDDDD', // Lighter gray for better contrast
    fontSize: 18, // Slightly larger for readability
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24, // Add spacing between lines for better readability
  },
  card: {
    width: '90%',
    backgroundColor: '#262626', // A lighter background for contrast
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded corners
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5, // Stronger shadow for depth
    shadowRadius: 6.68,
    elevation: 10,
    borderWidth: 1, // Add a subtle border
    borderColor: '#333333',
    transform: [{ scale: 1 }], // Default scale for animation
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#FFFFFF', // Pure white for text
    fontSize: 20, // Larger font for visibility
    fontWeight: '600', // Semi-bold for emphasis
  },
  icon: {
    marginRight: 10,
    color: '#1DB954', // Match the green theme
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  extraSmallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  swipeTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  swipeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
