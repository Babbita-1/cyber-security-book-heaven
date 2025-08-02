// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGABxN0Jxx-7m3pGimNfmJmcI2zke16lg",
  authDomain: "books-heaven-500e4.firebaseapp.com",
  projectId: "books-heaven-500e4",
  storageBucket: "books-heaven-500e4.firebasestorage.app",
  messagingSenderId: "824271498539",
  appId: "1:824271498539:web:2213a4cd6974b69bdf696e"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
