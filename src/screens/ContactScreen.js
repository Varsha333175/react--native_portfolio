import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function ContactScreen() {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact Me</Text>
      <Text style={styles.subText}>
        Feel free to reach out via the links below!
      </Text>
      <TouchableOpacity
        style={styles.link}
        onPress={() => openLink('https://www.linkedin.com/')}
      >
        <Text style={styles.linkText}>LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => openLink('https://github.com/')}
      >
        <Text style={styles.linkText}>GitHub</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => openLink('mailto:your-email@example.com')}
      >
        <Text style={styles.linkText}>Email Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  text: {
    color: '#1DB954',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
