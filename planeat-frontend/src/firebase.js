import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbmQnb6SRSzSU0K4ITthOPwOB7epEJTrA",
  authDomain: "planeatscapstone.firebaseapp.com",
  databaseURL: "https://planeatscapstone-default-rtdb.firebaseio.com",
  projectId: "planeatscapstone",
  storageBucket: "planeatscapstone.appspot.com",
  messagingSenderId: "150023729117",
  appId: "1:150023729117:web:d9452577dc5af451085034",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
