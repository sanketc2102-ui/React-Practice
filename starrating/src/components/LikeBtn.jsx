import { Heart, Loader2Icon } from "lucide-react";
import { useState } from "react";

function fakeApi() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < 0.2) {
        reject(new Error("operation is failed"));
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
}

export default function LikeBtn() {
  const [liked, setLiked] = useState(false);
  const [errors, setErrors] = useState("");
  const [isLaoding, setIsLoading] = useState(false);

  async function hanldeLike() {
    setIsLoading(true);

    try {
      await fakeApi();
      setLiked((prev) => !prev);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button onClick={hanldeLike} className={liked ? "liked" : ""}>
        {" "}
        {isLaoding ? <Loader2Icon /> : <Heart />}
        like
      </button>
    </div>
  );
}
