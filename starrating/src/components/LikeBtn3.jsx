import { Heart, Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function LikeBtn3() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  function fakeApi() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          throw new Error(reject("failed to update"));
        } else {
          resolve({ success: true });
        }
      }, 1000);
    });
  }

  async function hanldeLikedBtn() {
    setIsFetching(true);
    setError("");

    try {
      await fakeApi();
      setLiked((prev) => !prev);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div>
      <button onClick={hanldeLikedBtn}>
        {isFetching ? <Loader2Icon /> : <Heart />}
        {liked ? "liked" : "like"}
      </button>
    </div>
  );
}
