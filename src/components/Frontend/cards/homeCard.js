import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuGlobe } from "react-icons/lu";
import axios from "axios";
import { useFront, useTheme } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";

const HomeCard = ({ item, type, userData, saved, setSaveData, className, getTopPicks, noSaveBtn }) => {
  
  const { tokenId } = useAuth();
  const { fetchTools, getGPT, getPlugins } = useFront();
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const toggleDescription = () => {
    setShowMore(!showMore);
  };
  const handleCart = async () => {
    
    if (userData && tokenId) {
      try {
         await axios.post(
          `${API_URL}/api/cart/create`,
          { userId: userData, toolId: item._id, toolType: type },
          {
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          }
        );
        if (type === "aiTool") {
          fetchTools();
          if(getTopPicks) {
            getTopPicks();
          }
        } else if (type === "gptTool") {
          getGPT();
        } else {
          getPlugins();
        }
        toast.success("Tool saved successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Error fetching items:", error);
      }
    } else {
      toast.error("Please log in to save AI tools.");
      navigate("/login");
    }
  };
  const handleDeleteTool = async () => {
    if (userData && tokenId) {
      try {
        const response = await axios.put(
          `${API_URL}/api/blogs/deletetool`,
          { userId: userData, toolId: item._id, toolType: type },
          {
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          }
        );
        setSaveData((prevData) => ({
          ...prevData,
          [type]: response.data.updatedCart[type],
        }));
      } catch (error) {
        toast.error("Error fetching items:", error);
      }
    } else {
      // If the user is not logged in, show a notification and redirect to login page
      toast.error("Please log in to delete saved AI tools.");
    }
  };

  return (
    
    <div
      className={` ${
        type === "pluginTool"
          ? "[background:linear-gradient(180deg,rgba(142.39,179.93,255,0.51)_0%,rgba(193.54,195.57,254.37,0.36)_20.31%,rgba(29.75,32.23,37.19,0)_100%)] rounded-2xl"
          : "rounded-2xl"
      } shadow-lg p-3 card ${className} relative `}
    >
      {type === "aiTool" && (
        <div className="relative overflow-hidden rounded-t-xl">
        {item.image.includes('http') ? <img className="object-cover h-auto md:h-[125px] w-[100%]" src={item.image} alt="Product" /> : <img className="object-cover" src={item.imageUrl} alt="img" />}
        </div>
      )}
      {type === "pluginTool" && (
        <div className="flex">
          <div className="relative overflow-hidden rounded-md w-10">
          {item.image?.includes('http') ? <img className="object-cover" src={item.image} alt="Product" /> : <img className="object-cover" src={item.imageUrl} alt="img" />}
        
          </div>

          <h3 className="text-xl font-bold card-title mt-2 px-2">
            {item.name}
          </h3>
        </div>
      )}
      {type === "aiTool" || type === "gptTool" ? (
        <div className="flex items-center justify-between card-title pe-3 ">
        <h3 className="text-xl font-bold card-title mt-4">{item.name}</h3>
        <p className="flex items-center  mt-4 ">
          <FaRegBookmark />
          <span className="px-1">{item.savedcount}</span>
        </p>
        </div>
      ) : (
        ""
      )}
      
        <p className=" text-sm mt-1 font-poppins card-category  ">{item.category}</p>
        
     
      <p className={`description ${showMore ? "expanded" : ""} mt-3`}>
        {item.description}
      </p>
<div className="">
      {type === "gptTool" && item.description.length > 100 && (
        <button className={`${showMore && "see-more-btn mb-2"} card-desc`} onClick={toggleDescription}>
          {showMore ? "See Less" : "See More"}
        </button>
       
      )}
      </div>
      <span className="card-price rounded-md text-sm mt-5 flex flex-1 items-center mb-12">
        <IoMdCheckmarkCircleOutline />
        <span className="px-2">
          {" "}
          {item.service} {item.servicecost}
        </span>
      </span>
      <div className="flex flex-row items-center justify-between mt-4 absolute bottom-3 w-full pr-6">
        <a target="_blank" href={item.weburl}>
          <div className=" bg-[#23CD15] text-white py-2 px-[44px] border-[2px] border-transparent hover:border-[#23CD15] rounded-md font-bold hover:bg-transparent hover:text-[#23CD15] flex items-center">
            <LuGlobe />
          </div>
        </a>

         <>{saved ? (
          <button
            onClick={handleDeleteTool}
            className="bg-transparent  border-[2px] border-[#23CD15]  card-desc py-2 px-[42px] rounded-md font-bold hover:bg-[#23CD15]"
          >
            <RiDeleteBinLine />
          </button>
        ) : (<>
          {!noSaveBtn ?<button
            onClick={handleCart}
            className="bg-transparent  border-[2px] border-[#23CD15]  card-desc py-2 px-[42px] rounded-md font-bold hover:bg-[#23CD15]"
          >
               <FaRegBookmark /> 
          </button>: <button
            className="bg-transparent  border-[2px] border-[#23CD15]  card-desc py-1 px-[22px] rounded-md hover:bg-[#23CD15]"
          >
               featured
          </button>}
          </>)}</>
      </div>
    </div>
  
  );
};

export default HomeCard;
