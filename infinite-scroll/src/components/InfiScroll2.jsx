import { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export default function InfiScroll2() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sentinalRef = useRef(null); //sentinalRef.current = <div className="sential">
  const isLoadingRef = useRef(isLoading);

  console.log(products);

  // to update loading for observer api
  useEffect(
    function () {
      isLoadingRef.current = isLoading;
    },
    [isLoading],
  );

  // to fetch products as per
  useEffect(
    function () {
      async function fetchProducts() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * 10}`,
          );

          console.log(res.headers.get("X-Total-count"));

          const data = await res.json();
          console.log(data);
          setProducts((products) => [...products, ...data.products]);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchProducts();
    },
    [page],
  );

  useEffect(function () {
    const node = sentinalRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      function (entries) {
        const isIntersecting = entries[0].isIntersecting;

        if (isIntersecting && !isLoadingRef.current) {
          setPage((page) => page + 1);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      <h1>infinite scroll</h1>
      <ul className="products">
        {products.map((product, id) => (
          <li key={id} className="product">
            <img src={product.thumbnail} />
            <p>{product.title}</p>
          </li>
        ))}
        {isLoading && <p className="loader">loading...</p>}
      </ul>
      <div
        className="sentinal"
        style={{ height: "1px", border: "1px solid hotpink" }}
        ref={sentinalRef}
      ></div>
    </div>
  );
}
