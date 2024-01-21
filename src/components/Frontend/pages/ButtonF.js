import React from "react";

const ButtonF = ({ setPage, allPageData }) => {
  return (
    <>
      {allPageData?.currentPage !== 1 && allPageData?.previousPage !== 1 && (
        <>
          <span
            className="hover:bg-[#23CD15] border-2 border-[#23CD15] px-2  rounded-md"
            onClick={() => setPage(1)}
          >
            1
          </span>
          <span className="mb-3 text-[20px]">&#8230;</span>
        </>
      )}
      {allPageData?.hasPreviousPage && (
        <span
          className="hover:bg-[#23CD15] border-2 border-[#23CD15] px-2 mr-3 rounded-md"
          onClick={() => setPage(allPageData?.previousPage)}
        >
          {allPageData?.previousPage}
        </span>
      )}
      <span
        className="text-white bg-[#23CD15] border-2 border-[#23CD15] px-2 mr-3 rounded-md"
        onClick={() => setPage(allPageData?.currentPage)}
      >
        {allPageData?.currentPage}
      </span>
      {allPageData?.hasLastPage && (
        <span
          className="hover:bg-[#23CD15] border-2 border-[#23CD15] px-2  rounded-md"
          onClick={() => setPage(allPageData?.nextPage)}
        >
          {allPageData?.nextPage}
        </span>
      )}
      {allPageData?.lastPage !== allPageData?.currentPage &&
        allPageData?.nextPage !== allPageData?.lastPage && (
          <>
          <span className="mb-3 text-[20px]">&#8230;</span>
            <span
              className="hover:bg-[#23CD15] border-2 border-[#23CD15] px-2 mr-3 rounded-md"
              onClick={() => setPage(allPageData?.lastPage)}
            >
              {allPageData?.lastPage}
            </span>
          </>
        )}
    </>
  );
};

export default ButtonF;
