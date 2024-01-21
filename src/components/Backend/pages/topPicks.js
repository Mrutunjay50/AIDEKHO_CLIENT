import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ToolListHead from "../toolStructure/ToolListHead";
import Button from "../toolStructure/Button";
import axios from "axios";
import ToolData from "../toolStructure/ToolData";
import { useHandleDelete, useFilterData } from "../../hooks/useFilter&Delete";
import usePagination from "../../hooks/usePagination";
import { API_URL } from "../../../util";


const TopPicks = () => {
  const [topPickTools, setTopPickTools] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const type = "aiTool";

  const handleDelete = useHandleDelete(topPickTools, setTopPickTools);
  const filteredData = useFilterData(topPickTools, searchQuery);
  const { currentItems, goToNextPage, goToPrevPage, currentPage, setCurrentPage } = usePagination(filteredData, itemsPerPage);


  const getTopPicks = async () => {
    try {
      const response = await axios.get(`{API_URL}/api/toppicks`);
      setTopPickTools(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getSerialNumber = (index) => {
    return (currentPage - 1) * itemsPerPage + index;
  };

  useEffect(() => {
    getTopPicks();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className=" w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative">
      <div className="">
        <div className=" text-[32px] font-medium ml-4 mt-8 mb-4">Top Picks</div>
        <div className=" w-[80%] mx-4 flex justify-between flex-wrap gap-3 font-medium">
          <Link
            to={`/admin/addtool/${type}`}
            className="w-[30%] p-3 bg-[rgb(66,188,9)] rounded-lg text-white text-center cursor-pointer"
          >
            <div>Add New AI Tools</div>
          </Link>
          <input
            type="search"
            className="w-[60%] p-3 bg-[#c5c4c4] rounded-lg text-[#4d4c4c] cursor-pointer"
            onChange={handleSearch}
            placeholder="search bar"
          />
          <div className="w-[15%] p-3 bg-[#c5c4c4] rounded-lg cursor-pointer text-[#4d4c4c] text-center">
            total {topPickTools?.length}
          </div>
          
        </div>
      </div>
      <ToolListHead type={type}/>
      {currentItems ? (
        currentItems.map((item, index) => (
          <ToolData
            key={index}
            no={getSerialNumber(index)}
            item={item}
            onDelete={handleDelete}
            type={"aiTool"}
          />
        ))
      ) : (
        <p>Loading....</p>
      )}
      {/* Pagination */}
      <Button goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} currentItems={currentItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
    </div>
  );
};

export default TopPicks;
