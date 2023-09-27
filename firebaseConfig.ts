import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth"; // import auth from firebase/auth

import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "furqaan-constructions.firebaseapp.com",
  projectId: "furqaan-constructions",
  storageBucket: "furqaan-constructions.appspot.com",
  messagingSenderId: "842392100198",
  appId: "1:842392100198:web:e0bb99423998ca2b3bbca7",
};

// firebase.initializeApp(firebaseConfig);

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp); // initialize and export auth module

// export default firebase;
