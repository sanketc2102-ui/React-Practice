import { use, useState } from "react";
import { Heart, Loader2Icon } from "lucide-react";

export default function LikeBtn2() {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function fakeApi() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        // here is 20 percent failer rate
        if (Math.random() < 0.2) {
          throw new Error("falied to liked");
        } else {
          resolve({ success: true });
        }
      }, 1000);
    });
  }

  async function handleLikedBtn() {
    setIsLoading(true);
    try {
      await fakeApi();
      setLiked((prev) => !prev);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleLikedBtn}>
        {isLoading ? <Loader2Icon /> : <Heart />}
        Like
      </button>
    </div>
  );
}
