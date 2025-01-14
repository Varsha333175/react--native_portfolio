import React from 'react';
import { StyleSheet } from 'react-native'; // Import StyleSheet for consistent styles
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import BottomTabNavigator from './src/components/BottomTabNavigator';
import { AudioProvider } from './src/contexts/AudioContext';
import AudioControlBar from './src/contexts/AudioControlBar';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AudioProvider>
        <BottomTabNavigator />
        <AudioControlBar />
      </AudioProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
