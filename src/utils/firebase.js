// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6DxI9LvOg4b_luZyMJrXsIP5St6tBDgE",
  authDomain: "production-comp-quiz-1.firebaseapp.com",
  databaseURL:
    "https://production-comp-quiz-1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "production-comp-quiz-1",
  storageBucket: "production-comp-quiz-1.appspot.com",
  messagingSenderId: "447288602373",
  appId: "1:447288602373:web:a866812913350abcc5516c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
