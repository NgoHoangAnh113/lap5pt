import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzMuurWjGel386DlMNTVs3rWMa82Bwquo',
  authDomain: 'lap4-4bca8.firebaseapp.com',
  projectId: 'lap4-4bca8',
  storageBucket: 'lap4-4bca8.appspot.com',
  messagingSenderId: '1044586855815',
  appId: '1:1044586855815:web:26907997dea4dec535a722',
  measurementId: 'G-EWB9QZFQSN',
};

// Initialize Firebase


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore Database
const db = getFirestore(app);

export { auth, db };