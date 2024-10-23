// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the Firebase Auth module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbmQnb6SRSzSU0K4ITthOPwOB7epEJTrA",
  authDomain: "planeatscapstone.firebaseapp.com",
  projectId: "planeatscapstone",
  storageBucket: "planeatscapstone.appspot.com",
  messagingSenderId: "150023729117",
  appId: "1:150023729117:web:d9452577dc5af451085034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
