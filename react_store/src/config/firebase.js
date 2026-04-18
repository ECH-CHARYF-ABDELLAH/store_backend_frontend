import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhi8LKsog3K6r0UZ8fFS7VH1lqGNYz8QI",
  authDomain: "ecommrce-72676.firebaseapp.com",
  projectId: "ecommrce-72676",
  storageBucket: "ecommrce-72676.firebasestorage.app",
  messagingSenderId: "369673601679",
  appId: "1:369673601679:web:d550c3d1bbc1f94b5166fa",
  measurementId: "G-604JR59BJ0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
