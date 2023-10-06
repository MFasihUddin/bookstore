import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const FirebaseContext = createContext();

const googleProvider = new GoogleAuthProvider();

//firebase stuff for bookify...
const firebaseConfig = {
  apiKey: "AIzaSyDmFjVUT7me5kwn6llQjTNAu2V7t-hdnCc",
  authDomain: "bookify-af1da.firebaseapp.com",
  projectId: "bookify-af1da",
  storageBucket: "bookify-af1da.appspot.com",
  messagingSenderId: "645386096467",
  appId: "1:645386096467:web:1856593d60542dd874dba6",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
//...

const FirebaseProvider = ({ children }) => {
  //authentication
  const register = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signinWithGoggle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };
  const signIn = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => console.log("logged in Successfully"))
      .catch((err) => console.log(err));
  };
  

  return (
    <FirebaseContext.Provider
      value={{ register, signIn, firebaseAuth, signinWithGoggle }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
