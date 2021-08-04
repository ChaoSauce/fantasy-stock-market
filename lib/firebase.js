import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-storage';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyCKh9yDUJFSEg5yH_XwuUwnZ1e6B-iQxBA",
  authDomain: "fantasy-stock-market-66c32.firebaseapp.com",
  projectId: "fantasy-stock-market-66c32",
  storageBucket: "fantasy-stock-market-66c32.appspot.com",
  messagingSenderId: "387326101646",
  appId: "1:387326101646:web:2036b875cadcbb97bca1df",
  measurementId: "G-MRZEQGX93Y"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };