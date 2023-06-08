// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2V4vkfv3D2ETV3M_YmbmpOs7sWxpxZR4",
  authDomain: "login-c76f4.firebaseapp.com",
  projectId: "login-c76f4",
  storageBucket: "login-c76f4.appspot.com",
  messagingSenderId: "839020756839",
  appId: "1:839020756839:web:c045599d5c5768da6fb9c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider}