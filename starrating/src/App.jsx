import StarRating from "./components/StarRating";

export default function App() {
  return (
    <>
      <StarRating />
      <StarRating range={10} />
      <StarRating range={3} />
    </>
  );
}
