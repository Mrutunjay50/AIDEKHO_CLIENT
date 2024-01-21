import React from 'react'

const Button = ({goToPrevPage, goToNextPage, currentPage, currentItems, itemsPerPage}) => {
  return (
    <div className="absolute top-[20%] right-10 text-[24px]">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
        &#11164;
        </button>
        <span>{" "} {currentPage} {" "} </span>
        <button onClick={goToNextPage} disabled={currentItems?.length < itemsPerPage}>
        &#11166;
        </button>
      </div>
  )
}

export default Button