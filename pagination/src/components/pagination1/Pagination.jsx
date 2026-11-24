import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  const totalPages = getTotalPages(page, totalPages);

  return (
    <div className="pagination">
      <button>prev</button>

      {/* pagination pages via array */}

      <button>next</button>
    </div>
  );
}

function getTotalPages(page, totalPages) {
  let siblingEls = 1;
  let totalNumberToShow = siblingEls * 2 + 3 + 2;

  if (totalPages < totalNumberToShow) {
    return range(1, totalPages);
  }

  let leftSiblings = Math.max(page - 1, 1);
  let rightSiblings = Math.min(page + 1, totalPages);

  let showLeftElips = leftSiblings > 2;
  let showRightElips = rightSiblings < totalPages - 1;

  if (!showLeftElips && showRightElips) {
    const leftRange = siblingEls * 2 + 3;
    return range(1);
  }

  return [1, "...", ...range(leftSiblings, rightSiblings), "...", totalPages];
}

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }).map((_, idx) => idx + 1);
}
