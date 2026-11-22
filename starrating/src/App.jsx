import "./App.css";
import StarRating3 from "./components/StarRating3";

export default function App() {
  return (
    <>
      <StarRating3 />
      <StarRating3 range={3} />
      <StarRating3 range={10} />
    </>
  );
}
