import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
type Props = {
  pageNumber: number;
  totalPages: number;
  goToPage: (destinationPage: number) => void;
  prefetchNextPage: () => void;
};

const TableNavigator: React.FC<Props> = ({
  pageNumber,
  totalPages,
  goToPage,
  prefetchNextPage,
}) => {
  return (
    <section className="bg-gray_primary h-20 flex items-center flex-row  justify-between px-4">
      <div
        onClick={() => pageNumber > 1 && goToPage(pageNumber - 1)}
        className={`  ${
          pageNumber <= 1 ? "opacity-50 cursor-not-allowed" : ""
        } cursor-pointer flex items-center flex-row gap-x-2 text-[#949494] border w-28 p-1 border-[#949494] rounded-md justify-center`}
      >
        <ArrowLeftIcon className="text-[#949494] " />
        <span>Previous</span>
      </div>
      <div className="flex flex-row items-center gap-x-4 text-[#949494]">
        Page {pageNumber} of {totalPages}
      </div>
      <div
        onMouseEnter={prefetchNextPage} // Prefetch on hover
        onClick={() => pageNumber < totalPages && goToPage(pageNumber + 1)}
        className={` ${
          pageNumber >= totalPages ? "opacity-50 cursor-not-allowed" : ""
        } cursor-pointer flex items-center flex-row gap-x-2 text-[#949494] border w-28 p-1 border-[#949494] rounded-md justify-center`}
      >
        <span>Next</span>
        <ArrowRightIcon className="text-[#949494] " />
      </div>
    </section>
  );
};

export default TableNavigator;
