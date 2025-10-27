'use client';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '../contexts/AuthContext';
import { RoomsProvider } from '../contexts/RoomsContext';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    const initFirebase = async () => {
      try {
        await import('../config/firebase').then(({ initializeFirebase }) => {
          initializeFirebase();
        });
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    };

    initFirebase();
  }, []);

  return (
    <AuthProvider>
      <RoomsProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </RoomsProvider>
    </AuthProvider>
  );
}
