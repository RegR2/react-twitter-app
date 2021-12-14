import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase/Config";
import GoogleIcon from "@mui/icons-material/Google";
import { AppContext } from "../Context/AppContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AppContext);
  const history = useHistory();

  const googleProvider = new GoogleAuthProvider();
  const createUserGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const user = res.user;
      console.log(user);
      setUser(user);
      history.push("/home");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleClick = async () => {
    console.log(email, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      setUser(user);
      history.push("/home");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h1 style={{ marginTop: "3rem" }}>Lets Be Friends!</h1>
      <div
        className="emailPass"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "5rem 0 2rem 0",
        }}
      >
        <div className="loginContainer">
          <input
            type="text"
            className="loginTextBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            style={{ height: "2rem", width: "15rem", marginRight: "1rem" }}
          />
          <input
            type="password"
            className="loginTextBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ height: "2rem", width: "15rem", marginRight: "1rem" }}
          />
          <button
            className="loginBtn"
            onClick={() => handleClick(email, password)}
            style={{ height: "2rem", marginRight: "1rem" }}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: "2rem",
        }}
      >
        <GoogleIcon style={{ marginRight: "0.5rem", height: "2rem" }} />
        <button
          className="loginGoogle"
          onClick={createUserGoogle}
          style={{ height: "2rem", marginRight: "1rem" }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
export default SignUp;
