import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [recepies, setRecepies] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinal = useRef(null);

  useEffect(() => {
    async function fetchRecepies() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/recipes?limit=10&skip=${page * 10}`,
        );
        const data = await res.json();
        console.log(data);

        setRecepies((recepies) => [...data.recipes, ...recepies]);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecepies();
  }, [page]);

  useEffect(() => {
    const node = sentinal.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <ul>
        {recepies.map((recepie, idx) => (
          <li key={`${recepie.id}-${idx}`}>
            <img src={recepie.image} alt="" />
            <p>{recepie.name}</p>
          </li>
        ))}
      </ul>
      <div ref={sentinal} style={{ height: 1 }}></div>
    </div>
  );
}
