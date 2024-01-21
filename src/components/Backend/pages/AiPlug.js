import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTool } from "../../../Context";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";

const AiPlug = ({ edit }) => {
  const { type, id } = useParams();
  const {tokenId} = useAuth();
  const navigate = useNavigate();
  const {categories} = useTool();
  const [imgType, setImgType] = useState("link");
  const [toolData, setToolData] = useState({
    name: "",
    category: "",
    image: "",
    savedcount: "",
    description: "",
    service: "",
    servicecost: "",
    weburl: "",
  });
  
  const getToolData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/oneaitools?type=${type}&id=${id}`
      );
      setToolData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Assuming single file upload
    setToolData((prevData) => ({
      ...prevData,
      image: file, // Store the file object
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToolData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: { "content-type": "multipart/form-data",Authorization: `Bearer ${tokenId}` },
      };
      if (edit) {
        if (imgType === "file") {
          await axios.put(
            `${API_URL}/api/aitools?type=${type}&id=${id}`,
            toolData,
            config
          );
          navigate("/admin/alltools");
        } else {
          await axios.put(`${API_URL}/api/aitools?type=${type}&id=${id}`, toolData,{
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          });
          navigate("/admin/alltools");
        }
      } else {
        if (imgType === "file") {
          await axios.post(
            `${API_URL}/api/addaitools/${type}`,
            toolData,
            config
          );
          navigate("/admin/alltools");
        } else {
          await axios.post(`${API_URL}/api/addaitools/${type}`, toolData,{
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          });
          navigate("/admin/alltools");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (edit && id) {
      getToolData();
    }
  }, []);

  return (
    <div className="fixed w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] flex justify-center items-center">
      <div className=" relative border-2 border-black rounded-xl h-[80vh] w-[70%]">
        <h1 className=" ml-4 text-[28px] font-medium mt-10 mb-6">
          {edit ? "Update AI" : "Add AI"} Tools
        </h1>
        <form action={edit ? "put" : "post"} encType="multipart/form-data">
          <div className=" mx-4 flex flex-wrap gap-3">
            <div className="flex flex-col w-[45%] gap-3 ml-4">
              <span>Name of the Tool*</span>
              <input
                type="text"
                name="name"
                id="name"
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                placeholder="enter the tool name"
                onChange={handleChange}
                value={toolData?.name}
              />
            </div>
            <div className="flex flex-col w-[45%] gap-3 ml-4">
              <span>Category</span>

              <select
                name="category"
                value={toolData?.category}
                onChange={handleChange}
                id=""
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
              >
                <option value="">
                  {toolData?.category.replaceAll(';',',') || "choose a category"}
                </option>
                {categories?.map((item, index) => (
                  <option key={index} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {type !== "gptTool" && <div className="flex flex-col w-[45%] gap-3 ml-4">
              <span className="flex flex-row items-center gap-3">
                <span>Image* : </span>
                <span
                  onClick={() => {
                    setImgType("file");
                  }}
                  className={` border-[1px] bg-white px-2 hover:bg-green-500 ${
                    imgType === "file" && "bg-green-400"
                  } transition-colors duration-150 rounded-md cursor-pointer`}
                >
                  File
                </span>
                <span
                  onClick={() => {
                    setToolData((prevData) => ({ ...prevData, image: "" }));
                    setImgType("link");
                  }}
                  className={` border-[1px] bg-white px-2 hover:bg-green-500 ${
                    imgType === "link" && "bg-green-400"
                  } transition-colors duration-150 rounded-md cursor-pointer`}
                >
                  Link
                </span>
              </span>
              {imgType === "link" && (
                <input
                  type="text"
                  name="image"
                  id="image"
                  className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                  placeholder="enter the image link"
                  onChange={handleChange}
                  value={toolData?.image}
                />
              )}
              {imgType === "file" && (
                <input
                  type="file"
                  name="image"
                  id="image"
                  className=" h-[5vh] bg-[#c5c4c4] rounded-md mb-2 px-2 pt-1"
                  onChange={handleFileChange}
                />
              )}
            </div>}
            <div className="flex flex-col w-[45%] gap-3 ml-4">
              <span>Save Count</span>
              <input
                type="number"
                name="savedcount"
                id="count"
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                placeholder="enter the no of save count"
                onChange={handleChange}
                value={toolData?.savedcount}
              />
            </div>
            <div className="flex flex-col w-[95%] gap-3 ml-4">
              <span>Description*</span>
              <input
                type="text"
                name="description"
                id="description"
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                placeholder="enter the description"
                onChange={handleChange}
                value={toolData?.description}
              />
            </div>
            <div className="flex flex-col w-[45%] gap-3 ml-4">
              <pre>Charges (if any)*</pre>
              <input
                type="text"
                name="service"
                id="service"
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                placeholder="'Free' or 'Premium' or 'Freemium'"
                onChange={handleChange}
                value={toolData?.service}
              />
              {toolData?.service === "Premium" && (
                <input
                  type="number"
                  name="servicecost"
                  id="service cost"
                  className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                  placeholder="enter the Premium plan"
                  onChange={handleChange}
                  value={toolData?.servicecost}
                />
              )}
            </div>
            <div className="flex flex-col w-[45%] gap-3 ml-4">
              <span>Website Link*</span>
              <input
                type="text"
                name="weburl"
                id="weburl"
                className=" h-[6vh] bg-[#c5c4c4] rounded-md mb-2 px-2"
                placeholder="enter link for the tool"
                onChange={handleChange}
                value={toolData?.weburl}
              />
            </div>
          </div>
          <div
            className=" cursor-pointer w-[20%] h-[6vh] bg-[#1db805] absolute right-12 bottom-2 rounded-md text-white font-semibold text-[25px] flex items-center justify-center"
            onClick={handleSubmit}
          >
            {edit ? "update" : "add/submit"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiPlug;
