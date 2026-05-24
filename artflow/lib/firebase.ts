import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCTyvJis6iLutxRZlN9HUrhEq31wrXcK58',
  authDomain: 'artconnect-2b23a.firebaseapp.com',
  projectId: 'artconnect-2b23a',
  storageBucket: 'artconnect-2b23a.firebasestorage.app',
  messagingSenderId: '158679328079',
  appId: '1:158679328079:web:fcd92540ff5cf905ca913a',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
