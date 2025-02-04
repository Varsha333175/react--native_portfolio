import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

// Importing local assets
import ShowcaseVideo from '../assets/React Native Portfolio Showcase.mp4';
import WeatherVideo from '../assets/Weather Insights Revealed.mp4';
import ShowcaseThumbnail from '../assets/portfolio thumbnail.png';
import WeatherThumbnail from '../assets/strom.png';

const projects = [
  {
    id: '1',
    title: 'React Native Portfolio Showcase',
    thumbnail: ShowcaseThumbnail,
    videoUrl: ShowcaseVideo,
  },
  {
    id: '2',
    title: 'Weather Insights Revealed',
    thumbnail: WeatherThumbnail,
    videoUrl: WeatherVideo,
  },
];

export default function ProjectsScreen() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [numColumns, setNumColumns] = useState(2);
  const [listKey, setListKey] = useState('grid-2'); // Force re-render when columns change
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const updateLayout = () => {
      const newNumColumns = screenWidth > 768 ? 2 : 1; // 2 columns for large screens, 1 for mobile
      if (newNumColumns !== numColumns) {
        setNumColumns(newNumColumns);
        setListKey(`grid-${newNumColumns}`); // Force re-render
      }
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove(); // Cleanup properly
  }, [numColumns]);

  return (
    <LinearGradient colors={['#1DB954', '#121212']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
      </View>

      {/* View Wrapper to enable scrolling */}
      <View style={{ flex: 1 }}>
        <FlatList
          key={listKey} // Force re-render when numColumns changes
          data={projects}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false} // Hide scrollbar for clean UI
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                screenWidth < 768 ? styles.mobileCard : {}, // Adjust width for mobile
              ]}
              onPress={() => setSelectedProject(item)}
            >
              <Image source={item.thumbnail} style={styles.thumbnail} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Video Modal */}
      {selectedProject && (
        <Modal transparent animationType="slide" visible={!!selectedProject}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedProject(null)}>
              <Ionicons name="close-circle" size={40} color="#1DB954" />
            </TouchableOpacity>

            <Video
              source={selectedProject.videoUrl}
              style={styles.video}
              useNativeControls={true} // Ensures playback controls on web
              resizeMode="contain"
              isLooping
            />
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
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flatListContainer: {
    paddingBottom: 20,
    justifyContent: 'center',
  },
  card: {
    flex: 1, // Expands dynamically
    maxWidth: 400, // Prevents oversized cards
    backgroundColor: '#1E1E1E', // Dark theme
    margin: 10,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  mobileCard: {
    width: '90%', // Makes cards take up most of the screen width on mobile
    alignSelf: 'center', // Ensures they are centered
  },
  thumbnail: {
    width: '100%', // Full width inside the card
    height: 180, // Maintain aspect ratio
    borderRadius: 10,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
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
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 10,
  },
});

