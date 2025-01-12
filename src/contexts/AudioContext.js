import React, { createContext, useContext, useState } from 'react';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [section, setSection] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = async (trackList, index, playlist, sectionName, emotion = 'neutral') => {
    if (isPlaying) {
      stopTrack();
    }

    setPlaylist(trackList);
    setCurrentTrackIndex(index);
    setPlaylistName(playlist);
    setSection(sectionName);
    setIsPlaying(true);

    const currentTrack = trackList[index];
    const maxLength = Platform.OS === 'web' ? 300 : 200; // Adjust chunk size per platform
    const textChunks = splitTextIntoChunks(currentTrack.text, maxLength);

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

    if (Platform.OS === 'web') {
      await playTrackOnWeb(textChunks, pitch, rate);
    } else {
      playTrackOnNative(textChunks, pitch, rate);
    }
  };

  const playTrackOnWeb = async (textChunks, pitch, rate) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any ongoing speech

    const voices = await new Promise((resolve) => {
      const availableVoices = synth.getVoices();
      if (availableVoices.length) {
        resolve(availableVoices);
      } else {
        synth.onvoiceschanged = () => resolve(synth.getVoices());
      }
    });

    const selectedVoice = voices.find((voice) =>
      voice.name.includes('Google US English Female')
    ) || voices.find((voice) =>
      voice.name.toLowerCase().includes('female')
    ) || voices[0]; // Fallback to the first available voice

    if (!selectedVoice) {
      console.warn('No suitable female voice found. Using default voice.');
    }

    let i = 0;

    const speakNextChunk = () => {
      if (i < textChunks.length) {
        const utterance = new SpeechSynthesisUtterance(textChunks[i]);
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.lang = 'en-US';
        utterance.voice = selectedVoice; // Use the selected female voice
        utterance.onend = () => {
          i++;
          speakNextChunk(); // Speak the next chunk
        };
        synth.speak(utterance);
      } else {
        setIsPlaying(false); // Playback completed
      }
    };

    speakNextChunk(); // Start speaking the first chunk
  };

  const playTrackOnNative = (textChunks, pitch, rate) => {
    let i = 0;
    const speakNextChunk = () => {
      if (i < textChunks.length) {
        const isLastChunk = i === textChunks.length - 1;

        Speech.speak(textChunks[i], {
          pitch,
          rate,
          language: 'en-US',
          onDone: () => {
            i++;
            if (!isLastChunk) {
              speakNextChunk(); // Speak the next chunk
            } else {
              setIsPlaying(false); // Playback completed
            }
          },
        });
      }
    };

    speakNextChunk(); // Start speaking the first chunk
  };

  const stopTrack = () => {
    if (Platform.OS === 'web') {
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop ongoing speech
    } else {
      Speech.stop();
    }
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

  // Helper function to split text into smaller chunks
  const splitTextIntoChunks = (text, maxLength) => {
    const sentences = text.split('. '); // Split by sentences
    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length + 1 <= maxLength) {
        currentChunk += sentence + '. ';
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = sentence + '. ';
      }
    }

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
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
