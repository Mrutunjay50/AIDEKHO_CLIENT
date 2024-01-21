// Searchbar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useFront } from "../../Context";

const Searchbar = ({type, className, className1, resultsRef}) => {
  const { fetchTools, getGPT, getPlugins } = useFront();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if(type === "aiTool")
      fetchTools({ search: searchQuery });
    else if(type === "gptTool")
      getGPT({ search: searchQuery });
    else
      getPlugins({ search: searchQuery });
    setSearchQuery('');
    resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${className} gap-2 ${className1} md:mt-5 mt-2`}>
      
      <div className="relative w-1/3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
        <input
          type="text"
          id="simple-search"
          className=" text-sm rounded md:rounded-full  block w-[200px] sm:w-[110%] md:w-full p-2.5 focus:outline-none"
          placeholder=" Find AI Tools with Any Keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
      </div>
    
      <span
        onClick={handleSearch}
        className="px-3 py-2.5 md:ms-5 ms-20 flex items-center text-sm text-white bg-[#23CD15] rounded md:rounded-full cursor-pointer"
      >
        <FaSearch size={20} /><span className='px-2 font-poppins hidden md:block'>Search</span>
      </span>
    </div>
  );
};

export default Searchbar;
