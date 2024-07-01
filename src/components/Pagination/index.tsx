import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="pagination__container">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className="pagination__btn"
          style={{
            backgroundColor: currentPage === index + 1 ? "lightblue" : "white",
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
