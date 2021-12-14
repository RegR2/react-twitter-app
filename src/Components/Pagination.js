import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../Firebase/Config";

async function Pagination(scrollState) {
  const firstTweet = query(collection(db, "tweets"), limit(10));
  const Snapshots = await getDocs(firstTweet);

  const lastTweet = Snapshots.docs[Snapshots.docs.length - 1];
  console.log("last", lastTweet);

  const next = await query(
    collection(db, "tweets"),
    startAfter(lastTweet),
    orderBy("date", "desc"),
    limit(scrollState)
  );
  const snap = await getDocs(next);
  return snap;
}

export default Pagination;
