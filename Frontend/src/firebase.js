// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASt5gNGmTfCqyIEl0uP8gU-pKETF2YFFI",
  authDomain: "human-density-identification.firebaseapp.com",
  projectId: "human-density-identification",
  storageBucket: "human-density-identification.firebasestorage.app",
  messagingSenderId: "939848064010",
  appId: "1:939848064010:web:ae617eb75c07740fa493f3",
  measurementId: "G-YDVLN7ZNTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
