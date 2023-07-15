import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAxEipIyaq3AEBy-D_CK21aV55lqiVRqvM',
  authDomain: 'eventos-react-firebase.firebaseapp.com',
  projectId: 'eventos-react-firebase',
  storageBucket: 'eventos-react-firebase.appspot.com',
  messagingSenderId: '819685822325',
  appId: '1:819685822325:web:91d50863c1a3f613fd4d3c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const fireStore = getFirestore(app);
export const storage = getStorage(app);
