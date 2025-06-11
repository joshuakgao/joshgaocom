// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmmibguEyVTtV3sZKfq7hi_3K6S2UP6og",
  authDomain: "joshgaocom-42609.firebaseapp.com",
  projectId: "joshgaocom-42609",
  storageBucket: "joshgaocom-42609.firebasestorage.app",
  messagingSenderId: "739262071699",
  appId: "1:739262071699:web:72dffd4a714f6946089e66",
  measurementId: "G-GGTLK4D9K0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
