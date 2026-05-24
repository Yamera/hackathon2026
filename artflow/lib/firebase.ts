import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth, type Auth } from 'firebase/auth';
// @ts-ignore — getReactNativePersistence exists at runtime in Firebase 12 but is missing from typedefs
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch {
  auth = getAuth(app);
}
export { auth };
