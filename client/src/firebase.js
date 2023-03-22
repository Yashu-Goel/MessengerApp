import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCPstOF0ieVEtUmeSGGQk6wxC9EmBt8hWI",
    authDomain: "messenger-963b3.firebaseapp.com",
    projectId: "messenger-963b3",
    storageBucket: "messenger-963b3.appspot.com",
    messagingSenderId: "1036068717973",
    appId: "1:1036068717973:web:4f1d6fce4b78cedd0a229c",
    measurementId: "G-XHG099JB9G"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
