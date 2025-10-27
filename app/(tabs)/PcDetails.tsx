'use client';

import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import { useRooms } from '../../contexts/RoomsContext';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import ImageSlider from '../../components/ImageSlider';

export default function PcDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { rooms } = useRooms();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    const foundRoom = rooms.find((r) => r.id === id);
    setRoom(foundRoom);
    setLoading(false);
  }, [id, rooms]);

  const handleGoToMap = async () => {
    if (!room) return;

    try {
      setGettingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to show directions'
        );
        setGettingLocation(false);
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude: userLat, longitude: userLng } = userLocation.coords;

      const roomLat = room.lat || 40.1158;
      const roomLng = room.lng || 67.8422;

      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${roomLat},${roomLng}&travelmode=driving`;

      const canOpen = await Linking.canOpenURL(mapsUrl);
      if (canOpen) {
        await Linking.openURL(mapsUrl);
      } else {
        const appleMapsUrl = `maps://maps.apple.com/?saddr=${userLat},${userLng}&daddr=${roomLat},${roomLng}`;
        await Linking.openURL(appleMapsUrl);
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Could not open maps application');
    } finally {
      setGettingLocation(false);
    }
  };

  const handleCallPhone = () => {
    if (room?.contact) {
      Linking.openURL(`tel:${room.contact}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!room) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Xona Tafsilotlari</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Xona topilmadi</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xona Tafsilotlari</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ImageSlider images={room.roomsImage || []} />
        <View style={styles.infoSection}>
          <Text style={styles.roomName}>{room.name}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#ffd700" />
              <Text style={styles.ratingText}>{room.rating || 'Yangi'}</Text>
            </View>
            {room.premium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="flame" size={16} color="#ffd700" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>

          {room.contact && (
            <TouchableOpacity
              style={styles.contactSection}
              onPress={handleCallPhone}
            >
              <Ionicons name="call" size={20} color="#4F46E5" />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Telefon</Text>
                <Text style={styles.contactValue}>{room.contact}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          )}
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Narxi</Text>
            <Text style={styles.priceValue}>
              {room.price?.toLocaleString() || '-'} so'm/soat
            </Text>
          </View>
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Ionicons name="laptop" size={24} color="#4F46E5" />
              <Text style={styles.detailCardLabel}>Kompyuterlar</Text>
              <Text style={styles.detailCardValue}>{room.pcsPiece || 0}</Text>
            </View>

            <View style={styles.detailCard}>
              <Ionicons name="people" size={24} color="#4F46E5" />
              <Text style={styles.detailCardLabel}>O'rinlar</Text>
              <Text style={styles.detailCardValue}>
                {room.pcsPiece + room.pcPiece || 0}
              </Text>
            </View>

            <View style={styles.detailCard}>
              <Ionicons name="game-controller" size={24} color="#4F46E5" />
              <Text style={styles.detailCardLabel}>Plastation</Text>
              <Text style={styles.detailCardValue}>{room.pcPiece}</Text>
            </View>

            <View style={styles.detailCard}>
              <Ionicons name="time" size={24} color="#4F46E5" />
              <Text style={styles.detailCardLabel}>Ish vaqti</Text>
              <Text style={styles.detailCardValue}>24/7</Text>
            </View>
          </View>
          {room.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>Tavsif</Text>
              <Text style={styles.descriptionText}>{room.description}</Text>
            </View>
          )}

          {room.features && room.features.length > 0 && (
            <View style={styles.amenitiesSection}>
              <Text style={styles.amenitiesTitle}>Xizmatlar</Text>
              <View style={styles.amenitiesList}>
                {room.features.map((feature, index) => (
                  <View key={index} style={styles.amenityItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#4F46E5"
                    />
                    <Text style={styles.amenityText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={handleGoToMap}
          disabled={gettingLocation}
        >
          {gettingLocation ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="map" size={20} color="#fff" />
              <Text style={styles.mapButtonText}>Xaritada ko'rish</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.bookButton} onPress={handleCallPhone}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.bookButtonText}>Bronlash</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoSection: {
    padding: 20,
  },
  roomName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 6,
  },
  ratingText: {
    color: '#ffd700',
    fontWeight: '600',
    fontSize: 14,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 6,
  },
  premiumText: {
    color: '#ffd700',
    fontWeight: '600',
    fontSize: 14,
  },
  priceSection: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  priceLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  detailCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  detailCardLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  detailCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  amenitiesSection: {
    marginBottom: 30,
  },
  amenitiesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  amenitiesList: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#ccc',
  },
  contactSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    gap: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#0f0f0f',
    flexDirection: 'row',
    gap: 12,
  },
  mapButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#999',
  },
});
