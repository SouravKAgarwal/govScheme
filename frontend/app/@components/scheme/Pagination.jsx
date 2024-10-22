const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`text-gray-400 ${currentPage === 1 && "cursor-not-allowed"}`}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${
              currentPage === page ? "bg-green-500 text-white" : "text-gray-400"
            } `}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`text-gray-400 ${
          currentPage === totalPages && "cursor-not-allowed"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
