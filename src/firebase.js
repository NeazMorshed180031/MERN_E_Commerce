// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtzKMhzZfnrKyQtPvB7nIMNKX-aoMff_o",
  authDomain: "react-udemy-5cb58.firebaseapp.com",
  projectId: "react-udemy-5cb58",
  storageBucket: "react-udemy-5cb58.appspot.com",
  messagingSenderId: "982676081847",
  appId: "1:982676081847:web:56fb5c60b9a9063d491132",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
