// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (انسخ الإعدادات من Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCY4GMGjst0aoVUMKGzrQPPVwZkE8Y3g78",
    authDomain: "doctorac-d750b.firebaseapp.com",
    projectId: "doctorac-d750b",
    storageBucket: "doctorac-d750b.firebasestorage.app",
    messagingSenderId: "497423109982",
    appId: "1:497423109982:web:be80de4a0dc888a95809cf",
    measurementId: "G-4GKP0DR3Q8"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;
