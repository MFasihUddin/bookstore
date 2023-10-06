import { useState } from "react";
import { useFirebase } from "../context/Firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useFirebase();

  return (
    <div>
      <h1>Sign In</h1>
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
      <button onClick={() => signIn(email, password)}>Sign In</button>
    </div>
  );
}

export default SignIn;
