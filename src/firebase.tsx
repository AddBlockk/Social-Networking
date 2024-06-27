import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-rv6dJBOZg0c6fYTYo4-QMwqR28W84EI",
  authDomain: "social-chat-boltach.firebaseapp.com",
  projectId: "social-chat-boltach",
  storageBucket: "social-chat-boltach.appspot.com",
  messagingSenderId: "953501565071",
  appId: "1:953501565071:web:4287eba346f000567070fa",
  measurementId: "G-DQBLCQ518R",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export default app;
