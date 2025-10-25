import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRooms } from '../../contexts/RoomsContext';
import AppHeader from '../../components/AppHeader';
import RoomsList from '../../components/RoomsList';
import AuthOverlay from '../../components/AuthOverlay';

export default function ExploreScreen() {
  const { user } = useAuth();
  const { rooms, loading } = useRooms();

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        {!user && <AuthOverlay />}

        <View style={styles.header}>
          <Text style={styles.title}>All Gaming Rooms</Text>
          <Text style={styles.subtitle}>
            {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} available
          </Text>
        </View>

        <RoomsList rooms={rooms} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
});
