// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyBeb1i08MA22MW1vh0vPtpv3mJ1HNOdva8",
  authDomain: "chat-app-47584.firebaseapp.com",
  projectId: "chat-app-47584",
  storageBucket: "chat-app-47584.firebasestorage.app",
  messagingSenderId: "301700030701",
  appId: "1:301700030701:web:a58efb0b65333e37506ce4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ADD THIS

export { app, auth, db }; // ✅ Export db
