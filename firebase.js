// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBv5ptWcXtcwJCUzunjSd9rL3KOy4ECDlg",
    authDomain: "my-firebase-crud-90de9.firebaseapp.com",
    projectId: "my-firebase-crud-90de9",
    storageBucket: "my-firebase-crud-90de9.appspot.com",
    messagingSenderId: "705791231158",
    appId: "1:705791231158:web:51c5f6b7c2f2b7d0611217"
  // Put you credentials here
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * @param {string} codigo a New Task in Firestore
 * @param {string} shape the title of the Task
 * @param {string} truck 
 * @param {string} rodas title of the Task
 * @param {string} description
 * 
 */

export const saveLongboard= (codigo,shape,truck,rodas, description) =>
  addDoc(collection(db, "longboards"), { codigo,shape,truck,rodas, description });
 


export const onGetLongboards = (callback) =>
  onSnapshot(collection(db, "longboards"), callback);

 

/**
 *
 * @param {string} id Task ID
 */
export const deleteLongboard= (id) => deleteDoc(doc(db, "longboards", id));

export const getLongboard = (id) => getDoc(doc(db, "longboards", id));

export const updateLongboard = (id, newFields) =>
  updateDoc(doc(db, "longboards", id), newFields);

export const getLongboards = () => getDocs(collection(db, "longboards"));