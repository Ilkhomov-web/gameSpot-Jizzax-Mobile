import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Map, List, SlidersHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface MapSettingsProps {
  viewMode: 'map' | 'list';
  onViewModeChange: (mode: 'map' | 'list') => void;
  onFilterPress?: () => void;
}

export default function MapSettings({
  viewMode,
  onViewModeChange,
  onFilterPress,
}: MapSettingsProps) {
  return (
    <LinearGradient
      colors={['#1a1a1a', '#262626']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}>
      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => onViewModeChange('map')}>
            <Map
              size={20}
              color={viewMode === 'map' ? '#fff' : '#999'}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === 'map' && styles.toggleTextActive,
              ]}>
              Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => onViewModeChange('list')}>
            <List
              size={20}
              color={viewMode === 'list' ? '#fff' : '#999'}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === 'list' && styles.toggleTextActive,
              ]}>
              List
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <SlidersHorizontal size={20} color="#9333ea" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#0f0f0f',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#9333ea',
  },
  toggleText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
});
