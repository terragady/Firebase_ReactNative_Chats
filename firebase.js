import firebase from 'firebase/app' 
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeSpLQKDdmv2L5IoBuZKvLW5SdZ7m0tX0",
  authDomain: "chat-app-test-1c098.firebaseapp.com",
  projectId: "chat-app-test-1c098",
  storageBucket: "chat-app-test-1c098.appspot.com",
  messagingSenderId: "230153410067",
  appId: "1:230153410067:web:bacad6f624a86ea858d1e6"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore()
const auth = firebase.auth();

export { db, auth }