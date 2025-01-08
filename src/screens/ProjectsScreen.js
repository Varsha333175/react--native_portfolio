import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const projects = [
  {
    id: '1',
    title: 'Portfolio Website',
    techStack: 'React, CSS, JavaScript',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'E-commerce App',
    techStack: 'React Native, Redux',
    image: 'https://via.placeholder.com/150',
  },
];

export default function ProjectsScreen() {
  const renderProject = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.techStack}>{item.techStack}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Project</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Projects</Text>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  heading: {
    color: '#1DB954',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  techStack: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
