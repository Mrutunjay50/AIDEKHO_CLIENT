import React, { useState, useEffect } from "react";
import { useAuth } from "../../loginContext";
import { API_URL } from "../../../util";
import HomeCard from "../cards/homeCard";
import Layout from "../../../Layout";
import axios from "axios";
import { useFront, useTheme } from "../../../Context";
const Top = ({}) => {
  const { userData } = useAuth();
  const [theme] = useTheme();
  const [topPickTools, setTopPickTools] = useState(null);
  const { show, sponsorName, sponsorLink } = useFront();

  const getTopPicks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/toppicks`);
      setTopPickTools(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getTopPicks();
  }, []);

  return (
    <Layout
      title={"AIDekho- Top AItools"}
      description={
        "AI Dekho is a free website to help you discover top AI tools and software, making your work and life more productive."
      }
    >
    <div id={theme}>
      <div className="min-h-[100vh] mt-[-12vh] pt-[12vh] bgcolor" >
        <div className="navbg mt-[-12vh] pt-[15vh]">
          <div className="flex items-center justify-center px-16">
            <hr className="w-[490px] md:w-[790px] border-[#23CD15] translate-y-[60px] md:translate-y-[82px] border-t-[8px] rounded-2xl md:block hidden " />
          </div>
          <h1 className="font-poppins md:pt-0 pt-5 text-[32px] md:text-[50px] heading-color font-semibold text-center translate-y-[20px] px-2 md:px-0">
            Top Picks - Your Go-To AI Tools
          </h1>
        

        <div className=" justify-between items-center w-full mt-9 px-5 md:px-0">
          <h1 className="flex-1 font-poppins font-normal card-desc  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px] text-white text-center ">
            <span className="text-[#23CD15]">Carefully Selected </span>and{" "}
            <span className="text-[#23CD15]">Rigorously Tested!</span> Reliable
            AI Tools for Effective Results
          </h1>
        </div>
        <div className=" justify-between items-center w-full leading-[75px] mt-2">
          <h1 className="flex-1 font-poppins font-normal  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px]  text-center text-[#23CD15] ">
            {show && (
              <span className="bg-[#8a89893a] px-2 py-1 powered rounded-md">
                Powered by{" "}
                <a
                  href={sponsorLink}
                  className="font-semibold  border-white ms-2   text-white underline text-[17px] ss:text-[20px] decoration-[#23CD15]  md:text-[21px] "
                >
                  {" "}
                  {sponsorName}{" "}
                </a>
              </span>
            )}
          </h1>
        </div>
        </div>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 sm:grid-cols-2 gap-8 ">
              {topPickTools?.map((item, index) => (
                <HomeCard
                  item={item}
                  key={index}
                  type={"aiTool"}
                  userData={userData?._id}
                  getTopPicks={getTopPicks}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Top;
