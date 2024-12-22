// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyZbwVtmti3W8z4U8aZ2sBnDjReVPGaCM",
  authDomain: "final-ac739.firebaseapp.com",
  projectId: "final-ac739",
  storageBucket: "final-ac739.firebasestorage.app",
  messagingSenderId: "638723334303",
  appId: "1:638723334303:web:08938554b8f74df3c002aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };