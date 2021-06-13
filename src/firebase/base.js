import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvj754p1_t2AV6rBgaF7NxHb9fnCHoEH0",
  authDomain: "zzz-tracker.firebaseapp.com",
  projectId: "zzz-tracker",
  storageBucket: "zzz-tracker.appspot.com",
  messagingSenderId: "1006356862639",
  appId: "1:1006356862639:web:a142a5924de3a66d7ee65a",
  measurementId: "G-DR5F3YJ2X9"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;