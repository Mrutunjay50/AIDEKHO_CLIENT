import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";

const ToolData = ({ no, item, onDelete, type, added, setAdded }) => {
  const { tokenId } = useAuth();

  const [showDesc, setShowDesc] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const delTool = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/aitools/?type=${type}&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      onDelete(item._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (toolId) => {
    try {
      await axios.put(
        `${API_URL}/api/addTag`,
        { toolId },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      setAdded(!added);

      // Handle success or show a message to the user
    } catch (error) {
      console.error(error);
      // Handle error or show an error message to the user
    }
  };

  const handleClickAgain = async (toolId) => {
    try {
      await axios.put(
        `${API_URL}/api/featured`,
        { toolId },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      setAdded(!added);
      // Handle success or show a message to the user
    } catch (error) {
      console.error(error);
      // Handle error or show an error message to the user
    }
  };

  return (
    <ul className="flex flex-col md:flex-row h-auto md:h-[10vh] border-b-2 md:justify-evenly items-center gap-2 p-2 rounded-lg relative ">
      <li className="md:w-[2%] text-center">{no + 1}</li>
      <li className="md:w-[12%] text-center overflow-hidden">{item.name}</li>
      <li className="md:w-[14%] text-center overflow-hidden">
        {item.category.replaceAll(";", ",")}
      </li>
      {type === "pluginTool" ? (
        ""
      ) : type === "gptTool" ? (
        ""
      ) : (
        <li className="md:w-[12%] md:h-[6vh] overflow-hidden flex items-start justify-center ">
          {item.image}
        </li>
      )}
      <li
        className="md:w-[14%] cursor-help"
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
      >
        {item.description.substring(0, 18)} ...
      </li>

      <li
        className={`md:w-[30%] ${
          showDesc ? "opacity-1 -translate-x-7" : "opacity-0 translate-x-7"
        } transition-all duration-150 rounded-md min-h-[10vh] absolute bottom-6 bg-white right-[15%] overflow-hidden flex items-center justify-center border-2 p-4 z-50`}
      >
        {item.description.replaceAll(";", ",")}
      </li>

      <li className="md:w-[7%] text-center overflow-hidden">{item.savedcount}</li>
      {type === "pluginTool" && (
        <li className="md:w-[10%] text-center overflow-hidden">
          <a href={item.weburl} target="_blank" rel="noopener noreferrer">
            plugins.url
          </a>
        </li>
      )}
      {type === "gptTool" && (
        <li className="md:w-[10%] text-center overflow-hidden">
          <a href={item.weburl} target="_blank" rel="noopener noreferrer">
            gpt.url
          </a>
        </li>
      )}
      {type === "aiTool" && (
        <li className="md:w-[10%] text-center overflow-hidden">
          <a href={item.weburl} target="_blank" rel="noopener noreferrer">
            aitool.url
          </a>
        </li>
      )}
      {type === "pluginTool" ? (
        ""
      ) : (
        <li className="md:relative md:h-[6vh] md:w-[10%] overflow-hidden flex justify-center items-center">
          <div className="absolute top-0">{item.service}</div>{" "}
          <div className="absolute bottom-0 right-10">
            {item.servicecost}
            {item.service === "premium" && "$"}
          </div>
        </li>
      )}
      
      {type === "aiTool" && (
        <li className="md:w-[12%] text-white flex items-center justify-center z-50">
          <span
            onClick={() => handleClick(item._id)}
            className="py-2 md:w-[72%] px-3 hover:bg-[#cecccc] text-center hover:text-black  bg-[#5ebf2a] rounded-sm cursor-pointer transition-colors duration-150 "
          >
            {item?.tags[0]?.tag === "top" ? "Added" : "Add"}
          </span>
        </li>
      )}
      {type === "aiTool" && (
        <li className="md:w-[12%] text-white flex items-center justify-center">
          <span
            onClick={() => handleClickAgain(item._id)}
            className="py-2 md:w-[72%] px-3 hover:bg-[#cecccc] hover:text-black  bg-[#5ebf2a] rounded-sm cursor-pointer transition-colors duration-150 "
          >
            {item?.featured[0]?.tag === "featured" ? "featured" : "feature"}
          </span>
        </li>
      )}

      <li
        onMouseOver={() => setShowAction(true)}
        onMouseOut={() => setShowAction(false)}
        className="md:w-[6%] flex flex-row text-center justify-center items-center gap-2 cursor-pointer"
      >
        ...
        <div
          className={`${
            showAction ? "flex flex-col absolute right-0 bottom-5" : "hidden"
          }`}
        >
          <Link
            to={`/admin/edittool/${type}/${item._id}`}
            className="py-2 px-4 bg-slate-200 rounded-sm cursor-pointer hover:bg-green-300 transition-colors duration-150"
          >
            Edit
          </Link>
          <span
            className="py-2 px-3 bg-slate-200 rounded-sm cursor-pointer hover:bg-green-300 transition-colors duration-150"
            onClick={() => delTool(item._id)}
          >
            Delete
          </span>
        </div>
      </li>
    </ul>
  );
};

export default ToolData;
