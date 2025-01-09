import React, { createContext, useContext, useState } from 'react';
import * as Speech from 'expo-speech';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [section, setSection] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (trackList, index, playlist, sectionName, emotion = 'neutral') => {
    if (isPlaying) {
      Speech.stop();
    }
    setPlaylist(trackList);
    setCurrentTrackIndex(index);
    setPlaylistName(playlist);
    setSection(sectionName);
    setIsPlaying(true);

    const currentTrack = trackList[index];
    let pitch = 1.0;
    let rate = 1.0;

    // Adjust speech parameters based on emotion
    switch (emotion) {
      case 'happy':
        pitch = 1.5;
        rate = 1.2;
        break;
      case 'sad':
        pitch = 0.8;
        rate = 0.8;
        break;
      case 'excited':
        pitch = 1.7;
        rate = 1.5;
        break;
      default:
        pitch = 1.0;
        rate = 1.0;
        break;
    }

    Speech.speak(currentTrack.text, {
      pitch,
      rate,
      language: 'en-IN',
      onDone: () => {
        setIsPlaying(false);
      },
    });
  };

  const stopTrack = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const playNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < playlist.length - 1) {
      playTrack(playlist, currentTrackIndex + 1, playlistName, section);
    }
  };

  const playPrevious = () => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      playTrack(playlist, currentTrackIndex - 1, playlistName, section);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack: playlist[currentTrackIndex] || null,
        isPlaying,
        playlistName,
        section,
        playTrack,
        stopTrack,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
