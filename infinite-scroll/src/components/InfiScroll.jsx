import { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export default function InfiScroll() {
  const [products, setProducts] = useState([]);
  const [erros, setErrors] = useState("");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sentinal = useRef(null);
  const loadingRef = useRef(isLoading);

  console.log(products);

  useEffect(
    function () {
      loadingRef.current = isLoading;
    },
    [isLoading],
  );

  useEffect(
    function () {
      async function fetchProducts() {
        setIsLoading(true);
        setErrors("");

        try {
          const res = await fetch(
            `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * 10}`,
          );

          if (!res.ok) throw new Error("failed to fetch");

          const data = await res.json();
          // console.log(data);
          setProducts((products) => [...products, ...data.products]);
        } catch (err) {
          setErrors(err.message);
        } finally {
          isLoading(false);
        }
      }

      fetchProducts();
    },
    [page],
  );

  useEffect(function () {
    const node = sentinal.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      function (entries) {
        const isIntersecting = entries[0].isIntersecting;

        if (isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>
        infinity scrolls
      </h1>

      <ul className="products">
        {products.map((product, idx) => (
          <li key={idx}>
            <img src={product.thumbnail} />
            <p>{product.title}</p>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      <div
        className="sentinal"
        ref={sentinal}
        style={{ color: "hotpink", height: 1 }}
      >
        naruto
      </div>
    </div>
  );
}
