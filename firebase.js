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
  apiKey: "AIzaSyBb8iZnmzaQJO1FKDkd2s-5G_uZq7l8odU",
    authDomain: "fir-crud-aula.firebaseapp.com",
    projectId: "fir-crud-aula",
    storageBucket: "fir-crud-aula.appspot.com",
    messagingSenderId: "319725483199",
    appId: "1:319725483199:web:73fdb61b3ff8fdc488020a"
  // Put you credentials here
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} shape the title of the Task
 * @param {string} truck 
 * @param {string} rodas title of the Task
 * @param {string} description
 * 
 */

export const saveLongboard= (shape,truck,rodas, description) =>
  addDoc(collection(db, "longboard"), { shape,truck,rodas, description });
 


export const onGetLongboard = (callback) =>
  onSnapshot(collection(db, "longboard"), callback);

 

/**
 *
 * @param {string} id Task ID
 */
export const deleteLongboard= (id) => deleteDoc(doc(db, "longboard", id));

export const getLongboard = (id) => getDoc(doc(db, "longboard", id));

export const updateLongboard = (id, newFields) =>
  updateDoc(doc(db, "longboard", id), newFields);

export const getLongboards = () => getDocs(collection(db, "longboard"));