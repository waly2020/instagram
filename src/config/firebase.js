import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRtEEsxQYH9gpYmuBpBNKTqxe9qAOClWk",
  authDomain: "insta-app-b9842.firebaseapp.com",
  projectId: "insta-app-b9842",
  storageBucket: "insta-app-b9842.appspot.com",
  messagingSenderId: "447812028569",
  appId: "1:447812028569:web:338efbcf489421bbc1d008"
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
