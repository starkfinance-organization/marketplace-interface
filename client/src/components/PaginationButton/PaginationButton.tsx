const PaginationButton: React.FC<{
  currentPage: number;
  totalPages: number;
  onClick: any;
}> = ({ currentPage, totalPages, onClick }) => {
  return (
    <div className="flex pb-9 pt-6 h-fit w-full items-center justify-center rounded-md  px-4 text-white">
      {Array(totalPages)
        .fill(null)
        .map((_, i) => {
          if (
            i + 1 != totalPages &&
            i != 0 &&
            Math.abs(currentPage - i - 1) >= 4
          ) {
            if (Math.abs(currentPage - i - 1) < 5) {
              return <p>...</p>;
            }
            return;
          }

          return (
            <button
              onClick={onClick}
              className={`h-[24px] w-[24px] text-center rounded-full ${
                i + 1 == currentPage && "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
    </div>
  );
};

export default PaginationButton;
