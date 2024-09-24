import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6lGfWU1pOUdwIk0OuKM1CSnfic_t97y0",
  authDomain: "instaprincipal-6f139.firebaseapp.com",
  projectId: "instaprincipal-6f139",
  storageBucket: "instaprincipal-6f139.appspot.com",
  messagingSenderId: "611417317814",
  appId: "1:611417317814:web:5fc2767b24c10005b5e117",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence is set to session-based");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { db, auth, storage };
