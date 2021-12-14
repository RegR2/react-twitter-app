import {
  collection,
  getFirestore,
  getDoc,
  setDoc,
  doc,
} from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6uxsn4pcGdhnazNVJrK9Pf6QtNpC_vuU",
  authDomain: "reginar-twitter-project.firebaseapp.com",
  projectId: "reginar-twitter-project",
  storageBucket: "reginar-twitter-project.appspot.com",
  messagingSenderId: "372927459479",
  appId: "1:372927459479:web:12a1f2b4d2c2c6c9fcb9d2",
};

//init firebase
const app = firebase.initializeApp(firebaseConfig);

//init firestore

const db = getFirestore(app);

// authenticate firebase
const auth = getAuth();

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage(app);

// Create a storage reference from our storage service

// Create user profile in Firebase Authentication (if it doesn't already exists and need to fetch)

const getUserDocument = async (user) => {
  const uid = user.uid;
  if (!uid) {
    return;
  }
  const docRef = doc(db, "users", uid);
  const docData = await getDoc(docRef);
  let person = {};
  if (docData.exists()) {
    person = docData.data();
  } else {
    console.log("No such document!");
    person = {
      uid: uid,
      email: user.email,
      userName: user.email,
    };
    await setDoc(doc(db, "users", uid), person);
    console.log("document created !");
  }
  return person;
};

export { db, auth, app, getUserDocument };
