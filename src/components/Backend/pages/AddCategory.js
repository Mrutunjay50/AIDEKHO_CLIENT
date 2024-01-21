import React, { useState } from "react";
import axios from "axios";
import { useTool } from "../../../Context";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";


const AddCategory = () => {
  const {tokenId} = useAuth();
  const [type, setType] = useState("one");
  const {metadata, setMetadata, setCategories, sponsorName, setSponsorName,show, setShow,sponsorLink, setSponsorLink } = useTool();

  const [inputValue, setInputValue] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/updateSponsorStatus`, {
        sponsorName,
        sponsorLink,
        show,
      },{
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });

      console.log("Updated Category:", response.data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const updateCategoryData = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/updateCategory`,
        { category: inputValue },{
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
      // Assuming the response.data contains the updated category data
      //   console.log(response.data.existingCategories);
      setCategories(response.data.existingCategories.names);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetadata(prevMetadata => ({ ...prevMetadata, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send metadata to the backend
    axios.post(`${API_URL}/api/updateMetadata`, metadata,{
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error updating metadata:', error);
      });
  };

  return (<>
    <div className="w-[80%] ] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative flex items-center justify-center">
      <span className="absolute top-10 text-[30px]">Add Category and Sponsor</span>
      <span className="w-[40%] h-[40vh] p-5 border-2 text-center">
        <div className="flex justify-evenly items-center w-[100%] mt-10 ">
          Category :{" "}
          <span
            onClick={() => setType("bulk")}
            className="border-2 py-1 px-3 rounded-md hover:bg-green-600 hover:text-white font-medium cursor-pointer"
          >
            bulk
          </span>
          <span
            onClick={() => setType("one")}
            className="border-2 py-1 px-3 rounded-md hover:bg-green-600 hover:text-white font-medium cursor-pointer"
          >
            one
          </span>
        </div>
        <input
          type="text"
          name="inputValue"
          id=""
          className="w-full mt-5 px-3 py-4 mb-5"
          value={inputValue}
          placeholder={`${type === "bulk" ? "deal,market" : "market"}`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="border-2 bg-blue-500 text-white px-3 py-1 rounded-md w-[20%] cursor-pointer" onClick={updateCategoryData}>
          Add
        </div>
      </span>
      <span className="w-[40%] h-[60vh] p-5 border-2 text-center ml-3">
        <div>
          <label>
            Sponsor Name:
            <br />
          </label>
          <input
            type="text"
            value={sponsorName}
            placeholder="sponsor name"
            className="w-full mt-5 px-3 py-4 mb-5"
            onChange={(e) => setSponsorName(e.target.value)}
          />
        </div>
        <div>
          <label>
            Sponsor Link:
            <br />
          </label>
          <input
            type="text"
            value={sponsorLink}
            placeholder="sponsor name"
            className="w-full mt-5 px-3 py-4 mb-5"
            onChange={(e) => setSponsorLink(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
          <label>Show:</label>
          <input
            type="checkbox"
            className="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded-md"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
          />
          </div>
        <div className="border-2 bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer" onClick={handleUpdate}>Update</div>
        </div>
      </span>
    </div>
    
    <form onSubmit={handleFormSubmit} className="w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative items-center justify-center flex flex-col border-2 border-[#23CD15] ">
    <span className=" absolute top-10 text-[30px] ">Add MetaData</span>
        <label>
          Title:
          <input type="text" name="title" className="w-full mt-5 px-9 py-4 mb-5" value={metadata.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" className="w-full mt-5 px-3 py-4 mb-5" value={metadata.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Keywords:
          <input type="text" name="keywords" className="w-full mt-5 px-4 py-4 mb-5" value={metadata.keywords} onChange={handleInputChange} />
        </label>
        <br />
        <br />
        <button className="bg-[#23CD15] px-5 py-2 rounded-2xl" type="submit" >Update Metadata</button>
      </form>
      </>
  );
};

export default AddCategory;
