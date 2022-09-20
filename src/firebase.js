import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBAfWXl_odtMsvmh0yF9QDw8b8I7KQHfhU',
	authDomain: 'message-65f3e.firebaseapp.com',
	projectId: 'message-65f3e',
	storageBucket: 'message-65f3e.appspot.com',
	messagingSenderId: '373583928529',
	appId: '1:373583928529:web:0c4aaae4952c13106779f0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
