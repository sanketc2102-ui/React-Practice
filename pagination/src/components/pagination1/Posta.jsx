import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const pageLimit = 10;

/* 

1000 quotes
10 / page

 */

export default function Posta() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(function () {
    async function fetchQuotes() {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageLimit}`,
        );

        if (!res.ok) throw new Error("failed to fetch");
        const totalQuotes = Number(res.headers.get("X-Total-Count")) || 0;
        const totalPages = totalQuotes / pageLimit;

        setTotalPages(totalPages);

        console.log(totalQuotes);

        const data = await res.json();
        console.log(data);
        setQuotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  return (
    <div>
      <h1>pagination</h1>
      {isLoading && <p className="loader">Loading...</p>}
      <ul>
        {quotes?.map((quote, idx) => (
          <li key={idx}>
            {" "}
            <span>{quote.id}. </span> {quote.title}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
