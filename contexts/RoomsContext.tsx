import React, { createContext, useContext, useState, useEffect } from 'react';
import { GamingRoom } from '../types';

interface RoomsContextType {
  rooms: GamingRoom[];
  loading: boolean;
  fetchRooms: () => Promise<void>;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export const RoomsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<GamingRoom[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const { initializeFirebase, getFirebaseDb } = await import(
        '../config/firebase'
      );
      await initializeFirebase();

      const { collection, getDocs } = await import('firebase/firestore');
      const db = getFirebaseDb();

      const roomsCollection = collection(db, 'rooms');
      const roomsSnapshot = await getDocs(roomsCollection);

      const roomsData: GamingRoom[] = roomsSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as GamingRoom)
      );

      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, loading, fetchRooms }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (context === undefined) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return context;
};
