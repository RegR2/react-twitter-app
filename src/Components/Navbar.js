import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SignOut from "./SignOut";

function NavBar(props) {
  const { auth } = props;
  const color = blue[50];

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button color="inherit">
              <Link to="/" style={{ textDecoration: "none" }} className="link">
                Log In
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/home/"
                style={{ textDecoration: "none" }}
                className="link"
              >
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                to="/profile/"
                style={{ textDecoration: "none" }}
                className="link"
              >
                Profile
              </Link>
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="inherit">
              <Link
                to="/signUp"
                style={{ textDecoration: "none" }}
                className="link"
              >
                Sign Up
              </Link>
            </Button>
            <Button color="inherit">
              <SignOut />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
