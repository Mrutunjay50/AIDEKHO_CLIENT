import React, { useEffect, useRef, useState } from "react";
import Hero from "../Hero";
import Sort from "../Sort";
import Categories from "../Categories";
import { useFront, useTheme } from "../../../Context";
import { useAuth } from "../../loginContext";
import HomeCard from "../cards/homeCard";
import ButtonF from "./ButtonF";
import Layout from "../../../Layout";
import axios from 'axios'
import { API_URL } from "../../../util";

const Home = () => {
  const [featuredTools, setFeaturedTools] = useState('');
  const { userData } = useAuth();
  const [theme] = useTheme();

  const resultRef = useRef();
  const {
    toolsData,
    page,
    setPage,
    selectedCategory,
    selectedSort,
    setSelectedSort,
    fetchTools,
    allPageData, show, sponsorName, sponsorLink
  } = useFront();

  const getFeatured = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/featuredPicks`);
      setFeaturedTools(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getFeatured();
  }, []);


  useEffect(() => {
    setPage(1);
  }, [selectedSort, selectedCategory]);

  useEffect(() => {
    fetchTools();
  }, [page, selectedCategory, selectedSort]);

  return (
    <Layout
      title={"AIDekho- Home"}
      description={
        "AI Dekho is a free website to help you discover top AI tools and software, making your work and life more productive."
      }
    >
      {" "}
      <div id={theme}>
      <div className="min-h-[100vh] mt-[-12vh] pt-[12vh] bgcolor " >
        <div className="navbg mt-[-12vh] pt-[15vh]">
          <Hero
            tools={allPageData?.lastPage * 12}
            show={show}
            sponsorName={sponsorName}
            sponsorLink={sponsorLink}
            type={"aiTool"}
            resultRef ={resultRef}
          />
          <Sort setSelectedSort={setSelectedSort} selectedSort={selectedSort} />
          <Categories />
          <div className="flex items-center justify-center">
            <hr className="w-[270px] md:w-[400px] border-[#23CD15] translate-y-[61px] md:translate-y-[82px] border-t-[8px] rounded-2xl" />
          </div>
          <h1 className="font-poppins text-[32px] md:text-[50px] heading-color font-semibold text-center translate-y-[20px] ">
            Featured Tools
          </h1>
        </div>
        {/* cards */}
        <div className="py-16 " >
          <div className="container mx-auto px-4 ">
            <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 sm:grid-cols-2 gap-8  ">
              {featuredTools ? featuredTools.map((item, index) => (
                <HomeCard
                className="shadow"
                  item={item}
                  key={index}
                  type={"aiTool"}
                  saved={false}
                  userData={userData?._id}
                  noSaveBtn={true}
                />
              )) : <div className=" text-center text-[20px] card-desc w-[500px] ">No Featured Tools Yet!!</div>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <hr className="w-[150px] md:w-[220px] border-[#23CD15] translate-y-[45px] md:translate-y-[63px] border-t-[8px] rounded-2xl" />
        </div>
        <h1 className="font-poppins text-[32px] md:text-[50px] heading-color font-semibold text-center translate-y-[5px]">
          AI Tools
        </h1>
        {/* cards */}
        <div className="py-16 relative ">
          <div ref={resultRef} className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {toolsData?.map((item, index) => (
                <HomeCard
                  item={item}
                  key={index}
                  type={"aiTool"}
                  saved={false}
                  userData={userData?._id}
                />
              ))}
            </div>
          </div>
          <div className=" absolute mt-5 card-desc font-semibold flex items-center justify-center w-full">
          <ButtonF setPage={setPage} allPageData={allPageData} />
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Home;
