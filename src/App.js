import * as React from "react";
import "./App.css";
import { AppContext } from "./Context/AppContext";
import Main from "./Components/Main";
import ProfilePage from "./Components/ProfilePage";
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, getUserDocument } from "./Firebase/Config";
import { onAuthStateChanged } from "@firebase/auth";
import { Hello } from "./Components/Hello";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(true);
  const [scrollState, setScrollState] = useState(10);
  const [name, setName] = useState("Regina");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docUser = await getUserDocument(user);
        handleUser(docUser);
      } else {
        console.log("user is not connected");
      }
    });
  }, []);

  const handleUser = (docUser) => {
    setUser(docUser);
    setUserName(user.displayName);
  };

  return (
    <div>
      <AppContext.Provider
        value={{
          userName: userName,
          setUserName: setUserName,
          user: user,
          setUser: setUser,
          load: load,
          setLoad: setLoad,
          scrollState: scrollState,
          setScrollState: setScrollState,
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/home/">
              {!user && <Redirect to="/signUp" />}
              <Main />
            </Route>
            <Route path="/profile/">
              {!user && <Redirect to="/signUp" />}
              <ProfilePage handleUser={handleUser} />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}
export default App;
