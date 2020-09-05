import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCPFCUuvHjcQ4yi5G59kV10QTQbGG6GWmY",
  authDomain: "todo-app-498bf.firebaseapp.com",
  databaseURL: "https://todo-app-498bf.firebaseio.com",
  projectId: "todo-app-498bf",
  storageBucket: "todo-app-498bf.appspot.com",
  messagingSenderId: "184282612746",
  appId: "1:184282612746:web:880fee247beac7f20ecbf3",
  measurementId: "G-0RXZEJSGSN"
});

const db = firebaseApp.firestore();

export { db };