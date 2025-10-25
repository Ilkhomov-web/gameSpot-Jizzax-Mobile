export type RoomType = 'PC' | 'PlayStation';

export interface GamingRoom {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: RoomType;
  pricePerHour: number;
  phone: string;
  isPremium: boolean;
  rating?: number;
  image?: string;
  description?: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}
