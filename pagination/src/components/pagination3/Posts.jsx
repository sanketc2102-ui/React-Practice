import { useEffect } from "react";
import { useState } from "react";
import Pagination from "./Pagination";

const PAGE_LIMIT = 10;

export default function Posts() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(
    function () {
      async function fetchQuotes() {
        setLoading(true);
        setError("");

        try {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
          );

          if (!res.ok) throw new Error("failed to fetch");
          const totalQuotes = +res.headers.get("X-Total-Count") || 0;

          setTotalPages(totalQuotes / PAGE_LIMIT);

          const data = await res.json();
          console.log(data);
          setQuotes(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchQuotes();
    },
    [page],
  );

  return (
    <div className="container">
      <h1 style={{ textTransform: "capitalize" }}>posts</h1>

      <ul className="quotes">
        {loading && <p className="loader">loading...</p>}
        {quotes?.map((quote, idx) => (
          <li key={idx}>
            {" "}
            <span>{quote.id}. </span> {quote.body}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
