import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomMarker({ premium }: { premium?: boolean }) {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.marker,
          { backgroundColor: premium ? '#640D5F' : '#ef4444' },
        ]}
      >
        <Ionicons name="game-controller" size={16} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
