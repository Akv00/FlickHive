// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4_9qQpYyAtEG8hPPIUvVdxqDTaaED-q0",
  authDomain: "stream-gpt-f21b3.firebaseapp.com",
  projectId: "stream-gpt-f21b3",
  storageBucket: "stream-gpt-f21b3.appspot.com",
  messagingSenderId: "68292086147",
  appId: "1:68292086147:web:5ef78579f8392a061c4eb6",
  measurementId: "G-JFX2E2VPJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();