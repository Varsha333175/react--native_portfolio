import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../contexts/AudioContext';

const AudioControlBar = () => {
  const {
    currentTrack,
    isPlaying,
    playlistName,
    section,
    stopTrack,
    playNext,
    playPrevious,
  } = useAudio();

  if (!currentTrack || !isPlaying) return null; // Hide the control bar when nothing is playing

  return (
    <View style={styles.container}>
      {/* Track Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.playlistSection} numberOfLines={1}>
          {section} - {playlistName}
        </Text>
        <Text style={styles.trackTitle} numberOfLines={1}>
          {currentTrack?.title || 'No Title'}
        </Text>
        <Text style={styles.trackSubtitle} numberOfLines={1}>
          {currentTrack?.description || 'No Description'}
        </Text>
      </View>

      {/* Previous Button */}
      <TouchableOpacity onPress={playPrevious} style={styles.controlButton}>
        <Ionicons name="play-back-circle" size={40} color="#1DB954" />
      </TouchableOpacity>

      {/* Stop Button */}
      <TouchableOpacity onPress={stopTrack} style={styles.controlButton}>
        <Ionicons name="stop-circle" size={40} color="#1DB954" />
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity onPress={playNext} style={styles.controlButton}>
        <Ionicons name="play-forward-circle" size={40} color="#1DB954" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70, // Adjust height to be above BottomTabNavigator
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#1DB954',
    zIndex: 10, // Ensure it stays above other components
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  playlistSection: {
    fontSize: 14,
    color: '#1DB954',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trackSubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  controlButton: {
    marginHorizontal: 10,
  },
});

export default AudioControlBar;
