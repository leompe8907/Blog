import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAJjsTsGfHBhYGF-JEEjs1OT2Tcm2oEz44",
  authDomain: "blog-5633e.firebaseapp.com",
  projectId: "blog-5633e",
  storageBucket: "blog-5633e.appspot.com",
  messagingSenderId: "713041162948",
  appId: "1:713041162948:web:f7e079b7725b5d44740f91"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};
export default db;