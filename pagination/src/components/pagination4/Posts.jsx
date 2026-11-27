import { useEffect } from "react";
import { useState } from "react";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

export default function Posts() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(
    function () {
      async function fetchQutoes() {
        setLoading(true);
        try {
          const res = await fetch(
            ` https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`,
          );

          const totalQuotes = +res.headers.get("X-Total-Count") || 0;
          const totalPages = totalQuotes / PAGE_SIZE;
          setTotalPages(totalPages);

          const data = await res.json();

          setQuotes(data);
        } catch (err) {
        } finally {
          setLoading(false);
        }
      }

      fetchQutoes();
    },
    [page],
  );

  return (
    <div className="container">
      <h2>pagination 4th time</h2>
      {loading && <p className="loader">Loading...</p>}
      <ul>
        {quotes.map((quote, idx) => (
          <li key={idx}>
            {" "}
            <span>{quote.id}.</span> {quote.body}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
