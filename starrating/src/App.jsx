import "./App.css";
import LikeBtn from "./components/LikeBtn";
import StarRating from "./components/StarRating";
import StarRating2 from "./components/StarRating2";

export default function App() {
  return (
    <>
      <StarRating2 />
      <StarRating2 range={3} />
      <StarRating2 range={10} />
    </>
  );
}
