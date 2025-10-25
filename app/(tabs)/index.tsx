'use client';

import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRooms } from '../../contexts/RoomsContext';
import AppHeader from '../../components/AppHeader';
import PremiumCard from '../../components/PremiumCard';
import MapSettings from '../../components/MapSettings';
import RoomsList from '../../components/RoomsList';
import AuthOverlay from '../../components/AuthOverlay';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import CustomMarker from '../../components/CustomMarker';
import AdBanner from '../../components/AdBanner';

export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const { user } = useAuth();
  const { rooms, loading } = useRooms();
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const premiumRooms = rooms.filter((room) => room.premium);

  const handleMarkerPress = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleViewDetails = () => {
    if (selectedRoom) {
      router.push({
        pathname: '/PcDetails',
        params: { id: selectedRoom.id },
      });
      setShowModal(false);
    }
  };

  const handleRoomPress = (room) => {
    router.push({
      pathname: '/PcDetails',
      params: { id: room.id },
    });
  };

  const handlePremiumCardPress = (room) => {
    router.push({
      pathname: '/PcDetails',
      params: { id: room.id },
    });
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      {showAd && (
        <AdBanner
          type="image"
          source="https://via.placeholder.com/400x200?text=Gaming+Room+Ad"
          onClose={() => setShowAd(false)}
          duration={15}
        />
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {premiumRooms.length > 0 && (
          <View style={styles.premiumSection}>
            <Text style={styles.sectionTitle}>Premium Rooms</Text>
            {premiumRooms.map((room) => (
              <PremiumCard
                key={room.id}
                room={room}
                onPress={() => handlePremiumCardPress(room)}
              />
            ))}
          </View>
        )}

        <MapSettings
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onFilterPress={() => {}}
        />

        {viewMode === 'map' ? (
          <View style={styles.mapWrapper}>
            {!user && <AuthOverlay />}

            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={noPOIStyle}
              initialRegion={{
                latitude: 40.1158,
                longitude: 67.8422,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
              }}
            >
              {rooms.map((room) => (
                <Marker
                  key={room.id}
                  coordinate={{
                    latitude: Number(room.lat) || 40.1158,
                    longitude: Number(room.lng) || 67.8422,
                  }}
                  onPress={() => handleMarkerPress(room)}
                >
                  <CustomMarker premium={room.premium} />
                </Marker>
              ))}
            </MapView>
          </View>
        ) : (
          <RoomsList
            rooms={rooms}
            loading={loading}
            onRoomPress={handleRoomPress}
          />
        )}
      </ScrollView>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedRoom && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedRoom.name}</Text>
                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>💰 Narxi:</Text>
                    <Text style={styles.detailValue}>
                      {selectedRoom.price?.toLocaleString() || '-'} so'm/soat
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>⭐ Reyting:</Text>
                    <Text style={styles.detailValue}>
                      {selectedRoom.rating || 'Yangi'}
                    </Text>
                  </View>

                  {selectedRoom.premium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>🔥 Premium</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={handleViewDetails}
                  >
                    <Text style={styles.detailsButtonText}>
                      Joylarni ko'rish
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const noPOIStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { flex: 1 },
  premiumSection: { paddingVertical: 16 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  marker: { width: 6, height: 6, backgroundColor: 'red', borderRadius: 3 },
  mapWrapper: {
    height: 500,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  map: { flex: 1 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#999',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  premiumBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  premiumText: {
    color: '#ffd700',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
