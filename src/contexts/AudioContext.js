import React, { createContext, useContext, useState } from 'react';
import * as Speech from 'expo-speech';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null); // Current track index
  const [playlist, setPlaylist] = useState([]); // Current playlist
  const [playlistName, setPlaylistName] = useState(''); // Playlist name
  const [section, setSection] = useState(''); // Section name
  const [isPlaying, setIsPlaying] = useState(false); // Playback state

  const playTrack = (trackList, index, playlist, sectionName) => {
    if (isPlaying) {
      Speech.stop(); // Stop current playback before starting a new one
    }
    setPlaylist(trackList);
    setCurrentTrackIndex(index);
    setPlaylistName(playlist);
    setSection(sectionName);
    setIsPlaying(true);

    const currentTrack = trackList[index];
    Speech.speak(currentTrack.text, {
      pitch: 1.1,
      rate: 0.9,
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
