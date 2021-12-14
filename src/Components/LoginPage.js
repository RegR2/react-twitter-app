import "./Login.css";
import { AppContext } from "../Context/AppContext";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../Firebase/Config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

function LoginPage() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(async () => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const user = res.user;
        console.log(user);
        setUser(user);
        history.push("/home");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    });
  };

  const signInWithEmAndPass = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUser(user);
          console.log(user);
        }
      );
      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.message);
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
      <h1 style={{ marginTop: "3rem" }}>How would you like to log in?</h1>
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
            onClick={() => signInWithEmAndPass(email, password)}
            style={{ height: "2rem", marginRight: "1rem" }}
          >
            Login
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
          onClick={signInWithGoogle}
          style={{ height: "2rem", marginRight: "1rem" }}
        >
          Login with Google
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "10rem",
        }}
      >
        <div>
          Don't have an account?{" "}
          <Link to="/signUp" className="loginLink">
            Sign Up{" "}
          </Link>
          now.
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
