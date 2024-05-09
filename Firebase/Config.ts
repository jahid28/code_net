// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtGmKUoypEPSsqQPZoJ-fvi1ZIfACMSVo",
  authDomain: "codenet-9a617.firebaseapp.com",
  projectId: "codenet-9a617",
  storageBucket: "codenet-9a617.appspot.com",
  messagingSenderId: "197135389081",
  appId: "1:197135389081:web:43f2c310e5e0910ed7c308"
};
// apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId:process.env.messagingSenderId,
//   appId: process.env.appId

const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app)