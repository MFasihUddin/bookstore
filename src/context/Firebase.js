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
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    //image upload to storage
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    //data upload to firestore with image ref
    return await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      displayName: user.displayName,
      userEmail: user.email,
      photoURL: user.photoURL,
    });
  };
  const getImageUrl = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  // get docs/data from firestore
  const allList = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };
  const fetchMyBooks = async () => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
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
        allList,
        getImageUrl,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
