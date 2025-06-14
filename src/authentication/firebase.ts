// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// Ref: https://stackoverflow.com/questions/71057826/get-component-auth-has-not-been-registered-yet-when-using-firebase-authenticat fix add @
import { getReactNativePersistence, initializeAuth } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUGl2U5vxmlxKxWDur0gfZZsAv_lD2p4s",
  authDomain: "dz-task-5b878.firebaseapp.com",
  projectId: "dz-task-5b878",
  storageBucket: "dz-task-5b878.firebasestorage.app",
  messagingSenderId: "849464347592",
  appId: "1:849464347592:web:a66ac003698b108281cefd",
  measurementId: "G-BQ8QR1E9XH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { auth };
