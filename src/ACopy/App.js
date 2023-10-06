import { useState, useEffect } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useFirebase } from "./context/Firebase";

function App() {
  const [user, setUser] = useState(null);
  const { firebaseAuth } = useFirebase();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        //user loged in
        setUser(user);
        console.log(user);
      } else {
        //user logged out
        setUser(null);
      }
    });
  }, []);

  if (user === null) {
    return (
      <div className="App">
        <h2>firebaseApp</h2>
        <SignUp />
        <SignIn />
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Hi {user.email}</h2>
      <button onClick={() => signOut(firebaseAuth)}>SignOut</button>
    </div>
  );
}

export default App;
