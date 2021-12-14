import React from "react";
import { useState, useContext, useEffect } from "react";

function Hello(props) {
  const { name } = props;
  const [hello, setHello] = useState("Hello");
  useEffect(() => {
    setHello("Ted");
  });
  return <h1>Hello, {name}</h1>;
}

export default Hello;
