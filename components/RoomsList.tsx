import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type { GamingRoom } from '../types';
import { MapPin, Phone, Star, Crown } from 'lucide-react-native';

interface RoomsListProps {
  rooms: GamingRoom[];
  loading: boolean;
  onRoomPress?: (room: GamingRoom) => void;
}

export default function RoomsList({
  rooms,
  loading,
  onRoomPress,
}: RoomsListProps) {
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#9333ea" />
        <Text style={styles.loadingText}>Loading rooms...</Text>
      </View>
    );
  }

  if (rooms.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No gaming rooms found</Text>
      </View>
    );
  }

  const renderRoom = ({ item }: { item: GamingRoom }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => onRoomPress?.(item)}
      activeOpacity={0.7}
    >
      {item.premium && (
        <View style={styles.premiumBadge}>
          <Crown size={14} color="#fbbf24" />
          <Text style={styles.premiumText}>Premium</Text>
        </View>
      )}

      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomType}>{item.type}</Text>

      <View style={styles.infoRow}>
        <MapPin size={16} color="#9333ea" />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

      <View style={styles.infoRow}>
        <Phone size={16} color="#9333ea" />
        <Text style={styles.infoText}>{item.contact}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price} so'm</Text>
          <Text style={styles.perHour}>/hour</Text>
        </View>

        {item.rating && (
          <View style={styles.rating}>
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={rooms}
      renderItem={renderRoom}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#999',
    marginTop: 12,
    fontSize: 16,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  roomCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  premiumText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '600',
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  roomType: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  perHour: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#fbbf24',
    fontWeight: '600',
    fontSize: 12,
  },
});
