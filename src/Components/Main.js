import * as React from "react";
import { useState, useEffect, useContext } from "react";
import CreateTweet from "./CreateTweet";
import TweetList from "./TweetList";
import { AppContext } from "../Context/AppContext";
import { CircularProgress } from "@mui/material";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../Firebase/Config";

function Main() {
  const [tweetMessage, setTweetMessage] = useState([]);
  const { load, setLoad, scrollState } = useContext(AppContext);

  const handleTweetSave = async (newTweet) => {
    await postToServer(newTweet);
    setTweetMessage((prevTweetMessage) => {
      return [newTweet, ...prevTweetMessage];
    });
  };

  useEffect(() => {
    try {
      const fetchServerTweet = (Snapshot) => {
        setLoad(false);
        const tweets = [];
        Snapshot.forEach((tweet) => tweets.push(tweet.data()));
        setTweetMessage(tweets);
      };
      const queryFetch = query(
        collection(db, "tweets"),
        orderBy("date", "desc"),
        limit(scrollState)
      );
      const unsub = onSnapshot(queryFetch, (querySnapshot) =>
        fetchServerTweet(querySnapshot)
      );
      return () => {
        unsub();
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function postToServer(data) {
    console.log("post console:", data);
    try {
      const sendDoc = await addDoc(collection(db, "tweets"), data);
      console.log(sendDoc);
    } catch (err) {
      console.log("err post:", err);
    }
  }

  return (
    <>
      <CreateTweet
        style={{ justifyContent: "center", alignContent: "center" }}
        onTweetSave={handleTweetSave}
      />
      {load ? (
        <div
          className="spinner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <TweetList
          tweetMessage={tweetMessage}
          setTweetMessage={setTweetMessage}
        />
      )}
    </>
  );
}

export default Main;
