import { Heart, Loader2Icon } from "lucide-react";
import { useState } from "react";

function fakeApi() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < 0.2) {
        throw new Error(reject({ success: false }));
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
}

export default function LikeBtn4() {
  const [liked, setLiked] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  async function liking() {
    setFetching(true);
    try {
      await fakeApi();
      setLiked((prev) => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <button onClick={liking} className={liked ? "liked" : ""}>
      {" "}
      {fetching ? <Loader2Icon /> : <Heart />}
      {liked ? "liked" : "like"}
    </button>
  );
}
