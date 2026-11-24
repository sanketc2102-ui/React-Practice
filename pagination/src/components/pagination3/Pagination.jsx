import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  const totalNumbers = getNosOfPages(page, totalPages);
  console.log(totalNumbers);

  function goTo(target) {
    if (target < 1 || target > totalPages) return;

    onPageChange(target);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange((page) => page - 1)}>prev</button>
      {totalNumbers.map((item, idx) =>
        item === "..." ? (
          <span key={`elipces-${idx}`}>{item}</span>
        ) : (
          <span
            key={idx}
            style={page === item ? { backgroundColor: "dodgerblue" } : {}}
            onClick={() => goTo(item)}
          >
            {item}
            {console.log(idx)}
          </span>
        ),
      )}

      <button onClick={() => onPageChange((page) => page + 1)}>next</button>
    </div>
  );
}

function getNosOfPages(page, totalPages) {
  let siblingEl = 1;
  let totalPagesToShow = siblingEl * 1 + 5;

  if (totalPages < totalPagesToShow) {
    return range(1, totalPages);
  }

  let leftSibling = Math.max(page - siblingEl, 1); // 4
  let rightSibling = Math.min(page + siblingEl, totalPages); //6

  let showLeftElipces = leftSibling > 2;
  let showRightElipces = rightSibling < totalPages - 1;

  if (!showLeftElipces && showRightElipces) {
    const leftRange = range(1, 2 * siblingEl + 3);
    return [...leftRange, "...", totalPages];
  }

  if (showLeftElipces && !showLeftElipces) {
    const rightRange = range();
    return [1, "...", ...rightRange];
  }

  // when we are somewhere between pages
  return [1, "...", ...range(leftSibling, rightSibling), "...", totalPages];
}

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }).map((_, idx) => start + idx);
}
