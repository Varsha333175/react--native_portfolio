import React from 'react';
import { View } from 'react-native'; // Import View from react-native
import BottomTabNavigator from './src/components/BottomTabNavigator';
import { AudioProvider } from './src/contexts/AudioContext';
import AudioControlBar from './src/contexts/AudioControlBar';

export default function App() {
  return (
    <AudioProvider>
      <View style={{ flex: 1 }}>
        <BottomTabNavigator />
        <AudioControlBar />
      </View>
    </AudioProvider>
  );
}
