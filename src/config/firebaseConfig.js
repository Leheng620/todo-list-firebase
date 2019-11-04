import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAE92dh5rIZlpoLW1ZiaxAQYQexH9Paq8s",
    authDomain: "todo-hw3-d95a3.firebaseapp.com",
    databaseURL: "https://todo-hw3-d95a3.firebaseio.com",
    projectId: "todo-hw3-d95a3",
    storageBucket: "todo-hw3-d95a3.appspot.com",
    messagingSenderId: "942465384196",
    appId: "1:942465384196:web:da9346a794ca8f766c5a51",
    measurementId: "G-HMB7DQ6L5K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;