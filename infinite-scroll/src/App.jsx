import "./App.css";
import { useEffect, useRef, useState } from "react";

const Limit = 10;

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const sentinalRef = useRef(null);

  console.log(products);

  // fetch products and then re-fetch on page cahnge
  useEffect(
    function () {
      async function fetchPorducts() {
        setIsLoading(true);

        try {
          const res = await fetch(
            `https://dummyjson.com/products?limit=${Limit}&skip=${page * 10}`,
          );

          if (!res.ok) throw new Error("failed to fech data", res.message);

          const data = await res.json();
          setProducts((products) => [...products, ...data.products]);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchPorducts();
    },
    [page],
  );

  // oberver api to make infifnity scroll works
  useEffect(function () {
    const node = sentinalRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      function (entries) {
        const isIntersecting = entries[0].isIntersecting;

        if (isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contianer">
      <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>
        infinity scroll
      </h1>

      <ul className="products">
        {products?.map((product, idx) => (
          <li key={idx} className="product">
            <img src={product.thumbnail} />
            <p>{product.title}</p>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      <div style={{ height: 1, color: "red" }} ref={sentinalRef}>
        naruto
      </div>
    </div>
  );
}
