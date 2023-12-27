import { initializeApp } from 'firebase/app';
import { getAuth,connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxgouaIua7rNwLGoAaDGbt8qxg1mKXIKE",
    authDomain: "cat-carousel-reocat.firebaseapp.com",
    databaseURL: "https://cat-carousel-reocat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cat-carousel-reocat",
    storageBucket: "cat-carousel-reocat.appspot.com",
    messagingSenderId: "214645684655",
    appId: "1:214645684655:web:1b7d74c102a5031f69975a",
    measurementId: "G-Y9EYP42B9Y"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);