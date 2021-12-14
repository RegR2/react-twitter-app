import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Signout = () => {
  const history = useHistory();
  const signout = () => {
    const auth = getAuth();
    signOut(auth);
    history.push("/");
  };
  return <span onClick={signout}>Sign Out</span>;
};
export default Signout;
