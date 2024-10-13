import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const DataPagination = ({
  currentPage,
  setCurrentPage,
  items_per_page,
  total_pages,
}:
any) => {
  const getPageNumbers = () => {
    // const totalGroups = Math.ceil(total_pages / 10);
    const currentGroup = Math.ceil(currentPage / 10);
    const startPage = (currentGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, total_pages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextGroup = () => {
    setCurrentPage((prev: number) => Math.min(prev + 10, total_pages));
  };

  const handlePrevGroup = () => {
    setCurrentPage((prev: number) => Math.max(prev - 10, 1));
  };

  return (
    <div className="text-white pt-3 font-medium flex flex-col justify-center items-center w-full gap-y-2 ">
      <p className="flex items-center gap-3">
        <button className="transparent-btn rounded-md py-1">
          showing {items_per_page}
        </button>{" "}
        page {currentPage} of {total_pages ? total_pages : "Many"}
      </p>

      <Pagination>
        <PaginationContent>
          {currentPage > 10 && (
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevGroup} />
            </PaginationItem>
          )}

          {getPageNumbers().map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className="w-auto h-auto px-3 py-1"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage <= total_pages - 10 && (
            <PaginationItem>
              <PaginationNext onClick={handleNextGroup} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DataPagination;
