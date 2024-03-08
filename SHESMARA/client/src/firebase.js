// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shesmara-20ff2.firebaseapp.com",
  projectId: "shesmara-20ff2",
  storageBucket: "shesmara-20ff2.appspot.com",
  messagingSenderId: "761658131733",
  appId: "1:761658131733:web:79780733866c939988d51c"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);