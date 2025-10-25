import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDjm55MSQY85rv5QWlkG39MuYzWf76fDGE',
  authDomain: 'gamespot-jizzakh.firebaseapp.com',
  projectId: 'gamespot-jizzakh',
  storageBucket: 'gamespot-jizzakh.appspot.com',
  messagingSenderId: '1043381638849',
  appId: '1:1043381638849:web:1:1043381638849:android:380c0402a54780902c6640',
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export const initializeFirebase = async () => {
  const { initializeApp } = await import('firebase/app');
  const { getAuth } = await import('firebase/auth');
  const { getFirestore } = await import('firebase/firestore');

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  return { app, auth, db };
};

export const getFirebaseAuth = () => auth;
export const getFirebaseDb = () => db;
