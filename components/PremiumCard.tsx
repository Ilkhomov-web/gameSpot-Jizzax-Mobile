import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GamingRoom } from '../types';
import { MapPin, Phone, Star, Crown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSlider from './ImageSlider';

interface PremiumCardProps {
  room: GamingRoom;
  onPress?: () => void;
}

export default function PremiumCard({ room, onPress }: PremiumCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#7c3aed', '#9333ea', '#6b21a8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.premiumBadge}>
          <Crown size={16} color="#fbbf24" />
          <Text style={styles.premiumText}>Premium</Text>
        </View>

        {room.imageLogo && <ImageSlider images={room.roomsImage || []} />}

        <View style={styles.content}>
          <Text style={styles.name}>{room.name}</Text>
          <Text style={styles.type}>{room.type}</Text>

          <View style={styles.infoRow}>
            <MapPin size={16} color="#a78bfa" />
            <Text style={styles.infoText}>{room.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Phone size={16} color="#a78bfa" />
            <Text style={styles.infoText}>{room.contact}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{room.price} so'm</Text>
              <Text style={styles.perHour}>/hour</Text>
            </View>

            {room.rating && (
              <View style={styles.rating}>
                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                <Text style={styles.ratingText}>{room.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  premiumText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    gap: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  type: {
    fontSize: 14,
    color: '#e9d5ff',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#e9d5ff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  perHour: {
    fontSize: 14,
    color: '#e9d5ff',
    marginLeft: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fbbf24',
    fontWeight: '600',
  },
});
