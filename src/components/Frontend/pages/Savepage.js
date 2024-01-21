import React,{useEffect, useState} from "react";
import styles from "../../../style";
import HomeCard from "../cards/homeCard";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";
import axios from "axios";
import { useTheme } from "../../../Context";

const Savepage = () => {
  const { userData, tokenId } = useAuth();
  const [theme] = useTheme();
  const [saveData, setSaveData] = useState({
    aiTool : [],
    gptTool : [],
    pluginTool : []
  });
  const getCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/getcart/${userData?._id}`,{
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });
      setSaveData({
        aiTool : response.data.cart.aiTool,
    gptTool : response.data.cart.gptTool,
    pluginTool : response.data.cart.pluginTool
      })
      
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };


  useEffect(()=>{
    getCart();
  },[userData])


  return (
    <>
    <div id={theme}>
      <div className="min-h-[100vh] navbg -mt-[12vh] pt-[12vh] bgcolor">
        <section className={` ${styles.paddingY}`}></section>

        <div className="flex items-center justify-center">
          <hr className="w-[220px] md:w-[320px] border-[#23CD15] translate-y-[63px] md:translate-y-[82px] border-t-[8px] rounded-2xl" />
        </div>
        <h1 className="font-poppins text-[32px] md:text-[50px] heading-color font-semibold text-center translate-y-[22px]">
          Saved Tools
        </h1>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 sm:grid-cols-2 gap-8 ">

              {saveData?.aiTool?.map((item, index)=>
                <HomeCard
                item={item}
                key={index}
                type={"aiTool"}
                saved={true}
                userData={userData?._id}
                setSaveData={setSaveData}
                className={"row-span-2"}
              />
              )}
              {saveData?.pluginTool?.map((item, index)=>
                <HomeCard item={item} key={index} type={'pluginTool'} saved={true} userData={userData?._id} setSaveData={setSaveData} className={"row-span-1"}/>
              )}
              {saveData?.gptTool?.map((item, index)=>
                <HomeCard item={item} key={index} type={"gptTool"} saved={true} userData={userData?._id} setSaveData={setSaveData} className={"row-span-1"}/>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Savepage;
