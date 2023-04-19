import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5lbsIyfHe1D2s66v9kls480Vwa1uDVBg",
  authDomain: "whatsapp-e1c2b.firebaseapp.com",
  projectId: "whatsapp-e1c2b",
  storageBucket: "whatsapp-e1c2b.appspot.com",
  messagingSenderId: "689879680365",
  appId: "1:689879680365:web:c6f1e530c907688fbf8664",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();