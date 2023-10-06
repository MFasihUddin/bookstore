import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
//...

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();
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
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const isLoggedIn = user ? true : false;

  //firestore stuff...
  const handleCreate = async (name, isbnNumber, price, coverPic) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        register,
        signIn,
        firebaseAuth,
        signinWithGoggle,
        isLoggedIn,
        handleCreate,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
