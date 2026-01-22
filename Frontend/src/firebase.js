import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyASt5gNGmTfCqyIEl0uP8gU-pKETF2YFFI",
  authDomain: "human-density-identification.firebaseapp.com",
  projectId: "human-density-identification",
  storageBucket: "human-density-identification.firebasestorage.app",
  messagingSenderId: "939848064010",
  appId: "1:939848064010:web:ae617eb75c07740fa493f3",
  measurementId: "G-YDVLN7ZNTW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const analytics = getAnalytics(app);
export { auth };
