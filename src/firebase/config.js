// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/prod
// const firebaseConfig = {
//   apiKey: "AIzaSyAuXUCO1yfESCbXpLiHKLh28PLYXN8t_lo",
//   authDomain: "react-curso-d052f.firebaseapp.com",
//   projectId: "react-curso-d052f",
//   storageBucket: "react-curso-d052f.appspot.com",
//   messagingSenderId: "700274707283",
//   appId: "1:700274707283:web:06cf4f86e46b58d53bafa6"
// };

//testing (this work only one month)
const firebaseConfig = {
  apiKey: "AIzaSyDWWTWSCAYFZEeQ4s_ksNKQD-350pvSLIc",
  authDomain: "fir-fotos-ddef2.firebaseapp.com",
  projectId: "fir-fotos-ddef2",
  storageBucket: "fir-fotos-ddef2.appspot.com",
  messagingSenderId: "25566156248",
  appId: "1:25566156248:web:5e082dfb6f66ff71c70ead"
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );