import React from "react";

export default function Pagination({ page, totalPages, handlePageChange }) {
  const pageToPginate = pagesToDisplay(page, totalPages);

  console.log(pageToPginate);

  function goTo(goToPage) {
    if (goToPage < 1 || goToPage >= totalPages || goToPage === totalPages)
      return;
    handlePageChange(goToPage);
  }

  return (
    <div className="pagination">
      <button onClick={() => goTo(page - 1)}>prev</button>
      {pageToPginate.map((item, idx) =>
        item === "..." ? (
          <span key={`elips-${idx}`}>...</span>
        ) : (
          <button
            key={idx}
            className={item === page ? "page-btn active" : "page-btn"}
            onClick={() => goTo(item)}
          >
            {item}
          </button>
        ),
      )}

      <button onClick={() => goTo(page + 1)}>next</button>
    </div>
  );
}

function pagesToDisplay(page, totalPages) {
  const siblingElement = 1;
  const totalPagesToDisplay = siblingElement * 2 + 5;

  if (totalPages < totalPagesToDisplay) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingElement, 1);
  const rightSibling = Math.min(page + siblingElement, totalPages);

  const showLeftElips = leftSibling > 2;
  const showRightElips = rightSibling < totalPages - 1;

  if (!showLeftElips && showRightElips) {
    const leftRange = range(1, 3 + siblingElement * 2);
    return [...leftRange, "...", totalPages];
  }

  if (showLeftElips && !showRightElips) {
    const rightRange = range(
      totalPages - (3 + siblingElement * 2) + 1,
      totalPages,
    );
    return [1, "...", ...rightRange];
  }

  return [1, "...", ...range(leftSibling, rightSibling), "...", totalPages];
}

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}
