import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getDatabase, ref, onValue } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDsYoguXr_gIT--kv_Af4n_WZSXhYpV8kQ",
  authDomain: "quizmaster-ab0ee.firebaseapp.com",
  databaseURL: "https://quizmaster-ab0ee-default-rtdb.firebaseio.com",
  projectId: "quizmaster-ab0ee",
  storageBucket: "quizmaster-ab0ee.appspot.com",
  messagingSenderId: "648414065289",
  appId: "1:648414065289:web:bbce9153e4faf1c1d1cc58",
  measurementId: "G-T5SKJQZ7Q5",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

const database = getDatabase();

type FirebaseService = {
  listenForQuestions: (callback: (data: Question[]) => void) => void;
};

export const firebaseService: FirebaseService = {
  // Function to get data from a specific node in the database
  listenForQuestions: (callback) => {
    const nodeRef = ref(database, "questions");
    onValue(nodeRef, (snapshot) => {
      const data = snapshot.val();
      console.log(Object.values(data), "Data");

      callback(Object.values(data));
    });
  },

  // Function to set up a real-time listener for changes to a specific node
};
