// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAlb2ejioN_dIJpghdO3acf8XkrGs_mzY",
  authDomain: "ai-trip-planner-72f15.firebaseapp.com",
  projectId: "ai-trip-planner-72f15",
  storageBucket: "ai-trip-planner-72f15.firebasestorage.app",
  messagingSenderId: "501048849143",
  appId: "1:501048849143:web:41c2d05b3dff9c384b59f2",
  measurementId: "G-CTP3XFWQMQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);