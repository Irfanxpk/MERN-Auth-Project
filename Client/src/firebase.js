// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-40da7.firebaseapp.com",
    projectId: "mern-auth-40da7",
    storageBucket: "mern-auth-40da7.appspot.com",
    messagingSenderId: "159951401208",
    appId: "1:159951401208:web:a4943f067a141bf98fcb0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);