import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#121212', '#1DB954']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Hi, I'm Varsha Thondalapally</Text>
        <Text style={styles.tagline}>
          Discover the playlist of my work and skills.
        </Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png',
          }}
          style={styles.spotifyIcon}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  spotifyIcon: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});
