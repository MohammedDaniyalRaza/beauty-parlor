import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZLzkezUQRUVWEGHPLCkOXhxnfvQ5wvy0",
  authDomain: "beauty-parlor-21404.firebaseapp.com",
  projectId: "beauty-parlor-21404",
  storageBucket: "beauty-parlor-21404.firebasestorage.app",
  messagingSenderId: "395186362876",
  appId: "1:395186362876:web:f8eb5407d152ff84db3a79",
  measurementId: "G-YJPNS7S5X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);