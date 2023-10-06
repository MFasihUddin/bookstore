import { useState } from "react";
import { useFirebase } from "../context/Firebase";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, putData, signinWithGoggle } = useFirebase();

  return (
    <div>
      <h1>Sign Up</h1>
      <label>Email :</label>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Email"
      />
      <label>Password :</label>
      <input
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        required
        placeholder="Password"
      />
      <button onClick={signinWithGoggle}>SignIn with google</button>
      <button
        onClick={() => {
          signUp(email, password);
          putData("user/" + "test", { email, password });
        }}
      >
        Create User
      </button>
    </div>
  );
}

export default SignUp;
