import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import { AudioProvider } from './src/contexts/AudioContext';
import AudioControlBar from './src/contexts/AudioControlBar';
import ReactGA from 'react-ga4';

export default function App() {
  useEffect(() => {
    ReactGA.initialize('G-V26KPB2B4Q'); // Replace with your Measurement ID
    ReactGA.set({ debug_mode: true });  // Enables Debug Mode
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

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
