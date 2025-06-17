// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateVisitorCount() {
  const counterRef = doc(db, 'counters', 'visitors');
  try {
    const docSnap = await getDoc(counterRef);
    let count = docSnap.exists() ? docSnap.data().count : 0;
    count += 1;
    await setDoc(counterRef, { count });
    return count;
  } catch (error) {
    console.error('Error updating visitor count:', error);
    return 'Error';
  }
}

export { db, updateVisitorCount };