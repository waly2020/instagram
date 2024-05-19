import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADVuw2EKjip-lDkLQHJDX4JOAqcl5n0JE",
  authDomain: "instagram-app-6e29e.firebaseapp.com",
  projectId: "instagram-app-6e29e",
  storageBucket: "instagram-app-6e29e.appspot.com",
  messagingSenderId: "48979812577",
  appId: "1:48979812577:web:02312dbf386ed281e717a0",
  measurementId: "G-473VCK6S7H"
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
