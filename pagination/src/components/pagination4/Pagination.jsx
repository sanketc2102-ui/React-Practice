export default function Pagination({ page, totalPages, onPageChange }) {
  const numberOfPages = getPageNumbers(page, totalPages); // [1 to 10 ]
  console.log(numberOfPages);

  function goTo(target) {
    if (target < 1 || target > totalPages) return;

    onPageChange(target);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange((page) => page - 1)}
        disabled={page <= 1}
      >
        prev
      </button>
      {numberOfPages.map((item, idx) =>
        item === "..." ? (
          <span key={`elips-${idx}`}>{item}</span>
        ) : (
          <span
            key={idx}
            className={item === page ? "active" : ""}
            onClick={() => goTo(item)}
          >
            {item}
          </span>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page > totalPages}
      >
        next
      </button>
    </div>
  );
}

function getPageNumbers(page, totalPages) {
  const siblingCount = 1;
  const totalPagesToShow = siblingCount * 2 + 5;

  if (totalPages < totalPagesToShow) {
    return range(1, totalPages);
  }

  const leftSiblings = Math.max(page - siblingCount, 1); //4
  const rightSiblings = Math.min(page + siblingCount, totalPages); //6

  console.log(leftSiblings, rightSiblings);

  const showLeftElips = leftSiblings > 2;
  const showRightElips = rightSiblings < totalPages - 1;

  if (!showLeftElips && rightSiblings) {
    const leftRange = range(1, siblingCount * 2 + 3);
    return [...leftRange, "...", totalPages];
  }

  if (showLeftElips && !showRightElips) {
    const rightRange = range(
      totalPages - (3 + siblingCount * 2) + 1,
      totalPages,
    );
    return [1, "...", ...rightRange];
  }

  // we are somewhere in between
  return [1, "...", ...range(leftSiblings, rightSiblings), "...", totalPages];
}

function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }).map((_, idx) => start + idx);
}
