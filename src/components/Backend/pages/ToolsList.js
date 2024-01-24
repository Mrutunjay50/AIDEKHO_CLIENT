import React, { useState, useEffect } from "react";
import ToolData from "../toolStructure/ToolData";
import { Link } from "react-router-dom";
import { useTool } from "../../../Context";
import ToolListHead from "../toolStructure/ToolListHead";
import Button from "../toolStructure/Button";
import { useHandleDelete, useFilterData } from "../../hooks/useFilter&Delete";


const ToolsList = () => {
  const {
    toolData,
    setToolData,
    fetchData,
    handleExportCSV,
    page, setPage, allPageData
  } = useTool();
  const [added, setAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(undefined);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    if (searchQuery) {
      fetchData({ search: searchQuery });
    }
    setPage(1);
  };
  const type = "aiTool";


  const handleDelete = useHandleDelete(toolData, setToolData);

  useEffect(() => {
    fetchData({ search: searchQuery });
  }, [added, page]);
  

  return (
    <div className=" w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative">
      <div className="">
        <div className=" text-[32px] font-medium ml-4 mt-8 mb-4">AI Tools</div>
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
            total {allPageData.lastPage * 10}
          </div>
          <div onClick={() => handleExportCSV(type)} className="w-[25%] p-3 bg-[rgb(66,188,9)] rounded-lg text-white text-center cursor-pointer">
            download button
          </div>
        </div>
      </div>
      <ToolListHead type={type}/>
      {toolData ? (
        toolData.map((item, index) => (
          <ToolData
            key={index}
            no={(allPageData?.currentPage - 1) * 10 + index}
            item={item}
            onDelete={handleDelete}
            type={type}
            added={added}
            setAdded={setAdded}
          />
        ))
      ) : (
        <p>Loading....</p>
      )}
      <div className="flex justify-center items-center mt-3 mb-5">
       <Button setPage={setPage} allPageData={allPageData} />
       </div>
      </div>
  );
};

export default ToolsList;
