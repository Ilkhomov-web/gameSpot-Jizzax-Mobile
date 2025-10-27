'use client';

import { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av'; // ✅ expo-av dan import

interface AdBannerProps {
  type: 'image' | 'video';
  source: string;
  onClose?: () => void;
  duration?: number;
}

const { width } = Dimensions.get('window');

export default function AdBanner({
  type,
  source,
  onClose,
  duration = 15,
}: AdBannerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => onClose?.(), 500); // 🔹 yarim soniya kechiktirib yopish
          return 0;
        }
        if (prev === 3) setShowCloseButton(true);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <View style={styles.container}>
      {type === 'image' ? (
        <Image source={{ uri: source }} style={styles.media} />
      ) : (
        <Video
          source={{ uri: source }}
          style={styles.media}
          useNativeControls={false}
          isLooping={false}
          shouldPlay
          resizeMode="cover"
        />
      )}

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timeLeft}s</Text>
      </View>

      {showCloseButton && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 200,
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  timerContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
