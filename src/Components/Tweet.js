import * as React from "react";
import { Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { getUserDocument } from "../Firebase/Config";

function Tweet(props) {
  const { content, date, userName } = props;
  const { user, setUserName } = useContext(AppContext);

  useEffect(async () => {
    if (user) {
      const userDoc = await getUserDocument(user);
      setUserName(user.displayName);
    }
  }, []);

  return (
    <>
      <Paper
        elevation={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem",
          width: "600px",
          height: "100px",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ margin: "1rem", display: "flex", fontSize: "11px" }}>
            {userName}
          </span>
          <span style={{ margin: "1rem", display: "flex", fontSize: "11px" }}>
            {date}
          </span>
        </header>
        <span style={{ fontSize: "13px", overflowY: "auto" }}>{content}</span>
      </Paper>
    </>
  );
}

export default Tweet;
