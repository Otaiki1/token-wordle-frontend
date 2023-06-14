// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvGzr-MhuPfblnz1GjcDR8JzwHgHtFs3c",
  authDomain: "token-wordle.firebaseapp.com",
  projectId: "token-wordle",
  storageBucket: "token-wordle.appspot.com",
  messagingSenderId: "1088912592725",
  appId: "1:1088912592725:web:d38af87c6363eaec63e9dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);