// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_TeiUnAzQD-KjgtVZYcl9Jpmq6h_trC8",
  authDomain: "echo-62484.firebaseapp.com",
  projectId: "echo-62484",
  storageBucket: "echo-62484.firebasestorage.app",
  messagingSenderId: "525731022285",
  appId: "1:525731022285:web:f58b637c45ac838ba2f084"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app