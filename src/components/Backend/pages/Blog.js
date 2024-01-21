import React, { useState, useEffect } from "react";
import { useHandleDelete } from "../../hooks/useFilter&Delete";
import usePagination from "../../hooks/usePagination";
import { useTool } from "../../../Context";
import { useAuth } from "../../loginContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../toolStructure/Button";
import { API_URL } from "../../../util";

const BodyComp = ({item, index, delTool, no}) =>{

  const [showDesc, setShowDesc] = useState(false);
  const [showAction, setShowAction] = useState(false);
  return (
    <ul className="   flex h-[6vh] border-b-2 flex-row justify-evenly items-center gap-2 p-2 rounded-lg relative">
        <li className="w-[2%]">{no + 1}</li>
        <li className="w-[12%] h-[6vh] overflow-hidden flex items-start justify-center text-center">{item.image}</li>
        <li className="w-[12%] h-[6vh] overflow-hidden flex items-center justify-center text-center">{item.blogTitle}</li>
        <li className="w-[13%] text-center cursor-help overflow-hidden"  onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)}>{item.blogContent.substring(0, 18)}</li>
        <li className={`w-[30%] ${showDesc ? 'opacity-1 -translate-x-7' : 'opacity-0 translate-x-7'} transition-all duration-150 rounded-md min-h-[10vh] absolute bottom-6 bg-white right-[15%] flex items-center justify-center border-2 p-4 z-50`}>{item.blogContent}</li>

        <li className="w-[7%] text-center">{item.authername}</li>
        <li className="w-[10%] text-center">{item.updatedAt || item.createdAt}</li>
        <li
    onMouseOver={() => setShowAction(true)}
    onMouseOut={() => setShowAction(false)}
    className="w-[6%] flex flex-row text-center justify-center items-center gap-2 cursor-pointer"
  >
    ...
    <div className={`${showAction ? "flex flex-col absolute right-4 -bottom-3" : "hidden"}`}>
    <Link to={`/admin/editBlog/${item._id}`} className="py-2 px-4 bg-slate-200 rounded-sm cursor-pointer hover:bg-green-300 transition-colors duration-150">
      Edit
    </Link>
    <span className="py-2 px-3 bg-slate-200 rounded-sm cursor-pointer hover:bg-green-300 transition-colors duration-150" onClick={() => delTool(item._id)}>
      Delete
    </span>
  </div>
  </li>
      </ul>
  )
}


const Blog = () => {
  const {tokenId} = useAuth();
  const { blogs, setBlogs,getBlogs } = useTool();
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  

  const delTool = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/blogs/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      console.log("succesfully deleted");
      handleDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = useHandleDelete(blogs, setBlogs);
  const filteredBlogs = blogs?.filter((item) => {
    // Normalize search query and item properties for case-insensitive comparison
    const normalizedQuery = searchQuery?.toLowerCase();
    const normalizedName = item.blogTitle?.toLowerCase();
    const normalizedContent = item.blogContent?.toLowerCase();
    const normalizedAuthorName = item.authername?.toLowerCase();

    // Check if any of the fields includes the search query
    return normalizedName?.includes(normalizedQuery) || normalizedContent?.includes(normalizedQuery) || normalizedAuthorName?.includes(normalizedQuery);
  });

  const { currentItems, goToNextPage, goToPrevPage, currentPage, setCurrentPage } = usePagination(filteredBlogs, itemsPerPage);

  const getSerialNumber = (index) => {
    return (currentPage - 1) * itemsPerPage + index;
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative overflow-x-hidden">
      <div className="">
        <div className=" text-[32px] font-medium ml-4 mt-8 mb-4">Blogs</div>
        <div className=" w-[80%] mx-4 flex justify-between flex-wrap gap-3 font-medium">
          <Link
            to={`/admin/addBlog`}
            className="w-[30%] p-3 bg-[rgb(66,188,9)] rounded-lg text-white text-center cursor-pointer"
          >
            <div>Add New Blog</div>
          </Link>
          <input
            type="search"
            className="w-[60%] p-3 bg-[#c5c4c4] rounded-lg text-[#4d4c4c] cursor-pointer"
            onChange={handleSearch}
            placeholder="search bar"
          />

          <div className="w-[15%] p-3 bg-[#c5c4c4] rounded-lg cursor-pointer text-[#4d4c4c] text-center">
            total {blogs?.length}
          </div>
        </div>
      </div>
      <ul className=" bg-slate-400 flex flex-row justify-evenly items-center gap-2 p-2 rounded-lg mt-8 h-[6vh] text-white font-medium">
        <li className="w-[2%]">S.No</li>
        <li className="w-[12%] text-center">Image</li>
        <li className="w-[12%] text-center">Title</li>
        <li className="w-[13%] text-center">Content</li>
        <li className="w-[7%] text-center">Author Name</li>
        <li className="w-[10%] text-center">Date&Time</li>
        <li className="w-[6%] text-center">Actions</li>
      </ul>
      {currentItems?.map((item, index) => <BodyComp item={item} index={index} key={index} delTool={delTool} no={getSerialNumber(index)}/>)}
      <Button goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} currentItems={currentItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
      
    </div>
  );
};

export default Blog;
