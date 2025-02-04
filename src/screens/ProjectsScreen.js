import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const projects = [
  {
    id: '1',
    title: 'React Native Portfolio Showcase',
    thumbnail: require('../assets/portfolio-thumbnail.png'),
    videoUrl: require('../assets/React-Native-Portfolio-Showcase.mp4'),
  },
  {
    id: '2',
    title: 'Weather Insights Revealed',
    thumbnail: require('../assets/storm.png'),
    videoUrl: require('../assets/Weather-Insights-Revealed.mp4'),
  },
];

export default function ProjectsScreen() {
  const [selectedProject, setSelectedProject] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle Play/Pause
  const togglePlayback = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to seek forward/backward
  const seek = async (direction) => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status?.positionMillis) {
        let newPosition = status.positionMillis + direction * 10000; // Move by 10 seconds
        await videoRef.current.setPositionAsync(newPosition);
      }
    }
  };

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      <Text style={styles.title}>My Projects</Text>

      <Swiper loop={false} showsPagination={true} activeDotColor="#1DB954" containerStyle={styles.swiperContainer}>
        {projects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <TouchableOpacity onPress={() => setSelectedProject(project)}>
              <Image source={project.thumbnail} style={styles.thumbnail} />
              <Text style={styles.projectTitle}>{project.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>

      {/* Modal for Video */}
      {selectedProject && (
        <Modal transparent animationType="slide" visible={!!selectedProject}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProject(null)}>
              <Ionicons name="close-circle" size={40} color="#1DB954" />
            </TouchableOpacity>

            {/* Video Component */}
            <Video
              ref={videoRef}
              source={selectedProject.videoUrl}
              style={styles.video}
              useNativeControls={Platform.OS !== 'web'} // Use Native Controls on Mobile Only
              resizeMode="contain"
              shouldPlay={false} // Prevents autoplay
              isLooping
            />

            {/* Custom Controls for Web */}
            {Platform.OS === 'web' && (
              <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={() => seek(-1)}>
                  <Ionicons name="play-back" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback}>
                  <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={50} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => seek(1)}>
                  <Ionicons name="play-forward" size={40} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.modalTitle}>{selectedProject.title}</Text>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  swiperContainer: {
    height: height * 0.7,
  },
  projectCard: {
    width: width * 0.85,
    maxWidth: 450,
    alignSelf: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
  },
  thumbnail: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  projectTitle: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  video: {
    width: '90%',
    maxHeight: 500,
    aspectRatio: 16 / 9,
    borderRadius: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20, // Adjusts spacing between controls
  },
});


