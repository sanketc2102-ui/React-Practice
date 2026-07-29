import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      setError("");
      setIsLoading(false);
      try {
        const req = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`,
        );

        if (!req.ok)
          throw new Error("something went wrong while fetching posts");

        const totalContentSum =
          (await req.headers.get("x-total-count")) / PAGE_SIZE;
        const data = await req.json();

        setPosts(data);
        setTotalPages(+totalContentSum);

        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  return (
    <div className="container">
      <h2>Pagination</h2>

      <ul className="post-list">
        {posts.map((post, idx) => (
          <li className="post-item" key={idx}>
            <strong>{post.id}</strong>
            {post.title}
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={setPage}
      />
    </div>
  );
}
