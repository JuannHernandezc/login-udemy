import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaZJ34nap0jz2-HhBD8RZy_nYt--oyz0I",
  authDomain: "crud-react-a1ede.firebaseapp.com",
  projectId: "crud-react-a1ede",
  storageBucket: "crud-react-a1ede.appspot.com",
  messagingSenderId: "890134213720",
  appId: "1:890134213720:web:95b7e50f92f5e2cc04462d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Constraint that allow communication with firestore Auth and DB 
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
