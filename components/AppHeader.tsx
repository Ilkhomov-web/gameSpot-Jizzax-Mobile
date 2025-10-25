import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut, Gamepad2 } from 'lucide-react-native';

export default function AppHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setMenuVisible(false);
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Gamepad2 size={32} color="#9333ea" />
        <Text style={styles.logoText}>GameSpot</Text>
      </View>

      {user && (
        <>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setMenuVisible(true)}>
            <User size={24} color="#fff" />
          </TouchableOpacity>

          <Modal
            visible={menuVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setMenuVisible(false)}>
              <View style={styles.menu}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuEmail}>{user.email}</Text>
                </View>

                <TouchableOpacity style={styles.menuItem}>
                  <User size={20} color="#fff" />
                  <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                  <Settings size={20} color="#fff" />
                  <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <LogOut size={20} color="#ef4444" />
                  <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  menu: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  menuHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuEmail: {
    color: '#999',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutText: {
    color: '#ef4444',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#333',
  },
});
