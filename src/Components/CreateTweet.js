import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { getUserDocument } from "../Firebase/Config";
import Moment from "moment";

function CreateTweet(props) {
  const { onTweetSave } = props;
  const {user } = useContext(AppContext);
  const [tweetContent, setTweetContent] = useState("");

  useEffect(async () => {
    if (user) {
      const userDoc = await getUserDocument(user);
    }
  }, [user]);


  const handleChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleClick = async (e) => {
    const newTweet = {
      content: tweetContent,
      userName: user.displayName || user.email,
      date: Moment().toISOString(),
      uid: user.uid,
    };
    onTweetSave(newTweet);
    setTweetContent("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "2rem, 2rem, 1rem, 2rem",
        width: "100%",
      }}
    >
      <TextField
        id="filled-multiline-static"
        multiline
        fullWidth
        rows={4}
        placeholder="What You Have In Mind ... "
        value={tweetContent}
        style={{
          width: "600px",
          justifyContent: "center",
          alignSelf: "center",
          marginTop: "2rem",
        }}
        onChange={handleChange}
      ></TextField>
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={tweetContent.length > 140 ? true : false}
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          width: "60px",
          marginLeft: "34rem",
          marginTop: "0.5rem",
        }}
      >
        Tweet
      </Button>
    </div>
  );
}

export default CreateTweet;
