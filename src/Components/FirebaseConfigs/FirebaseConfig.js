// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXWL6RtOtXhVys-NOzEbUJIpVV3e521Gs",
  authDomain: "chat-app-1f0f5.firebaseapp.com",
  projectId: "chat-app-1f0f5",
  storageBucket: "chat-app-1f0f5.appspot.com",
  messagingSenderId: "762441752353",
  appId: "1:762441752353:web:33416473061206bbf06860",
  measurementId: "G-LLBGTNR141"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
const storage = getStorage(app)
export default app
export { db,firebaseAuth, storage}



