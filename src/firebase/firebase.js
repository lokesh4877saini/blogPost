
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAZpH_bKr61f8faaZPlprhJZuC06J18gco",
  authDomain: "authenticating-54cc8.firebaseapp.com",
  projectId: "authenticating-54cc8",
  storageBucket: "authenticating-54cc8.appspot.com",
  messagingSenderId: "1068286918124",
  appId: "1:1068286918124:web:c64d1209d95466e12054c9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;