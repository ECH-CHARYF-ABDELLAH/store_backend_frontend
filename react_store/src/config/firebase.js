import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "ecommrce-",
  storageBucket: "ecommrce-72676.firebasestorage.app",
  messagingSenderId: "369673601679",
  appId: "1:369673601679:web:",
  measurementId: "G-6049BJ0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
