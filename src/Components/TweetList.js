import Tweet from "./Tweet";
import Pagination from "./Pagination";
import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { v4 as uuidv4 } from "uuid";

const TweetList = (props) => {
  const { tweetMessage, setTweetMessage } = props;
  const [scrollState, setScrollState] = useState(10);
  const [fetch, setFetch] = useState(false);

  function scrollHandler(e) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log("string", bottom);
    if (bottom) {
      setScrollState((prevscrollState) => prevscrollState + 10);
      setFetch(true);
      console.log("i am at the bottom");
    }
  }

  const infiniteScroll = async () => {
    if (fetch) {
      const tweetsArray = [];
      let data = await Pagination(scrollState);
      data.forEach((tweetData) => tweetsArray.push(tweetData.data()));
      setTweetMessage(tweetsArray);
    }
    setFetch(false);
  };

  useEffect(() => {
    infiniteScroll();
  }, [fetch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
        maxHeight: "100vh",
      }}
      onScroll={scrollHandler}
    >
      {tweetMessage.map((tweetItem) => (
        <div key={uuidv4()}>
          <Tweet
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            content={tweetItem.content}
            userName={tweetItem.userName}
            date={tweetItem.date}
            uid={tweetItem.uid}
          />
        </div>
      ))}
    </div>
  );
};

export default TweetList;
