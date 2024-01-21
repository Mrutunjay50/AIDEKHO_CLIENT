import React,{useEffect, useRef} from "react";
import styles from "../../../style";
import Sort from "../Sort";
import Categories from "../Categories";
import Searchbar from "../Searchbar";
import { useFront, useTheme } from "../../../Context";
import {useAuth} from '../../loginContext';
import HomeCard from "../cards/homeCard";
import ButtonF from "./ButtonF";
import Layout from "../../../Layout";


const Plugin = () => {
  const {userData} = useAuth();
  const [theme] = useTheme();
  const { pluginsData, categories, page, setPage, selectedSort,show, sponsorName, sponsorLink, setSelectedSort, selectedCategory, getPlugins,allPageData } = useFront();
  const resultRef = useRef();
  
  useEffect(() =>{
    setPage(1);
  },[selectedSort, selectedCategory])


  useEffect(() => {
    getPlugins();
  }, [page, selectedSort, selectedCategory]);

  return (
    <Layout title={"AIDekho- Plugins"} description={"AI Dekho is a free website to help you discover top AI tools and software, making your work and life more productive."}>
    <div id={theme}>
    <div  className="min-h-[100vh] mt-[-12vh] pt-[12vh] bgcolor" >
    <div className="navbg mt-[-12vh] pt-[12vh]">
      <section className={` ${styles.paddingY} pt-11`}>
      <div className=' justify-between items-center w-full'>
       <h1 className='flex-1 font-poppins font-semibold  text-[35px]  ss:text-[42px] xs:text-[30px] md:text-[57px] text-white text-center'>
       Explore Best Plugins
       </h1>
        </div>
        <div className=" justify-between items-center w-full mb-2 px-3 md:px-0">
          <h1 className="flex-1 font-poppins font-normal  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px] text-white text-center ">
            Discover <span className="text-[#23CD15]">{allPageData?.lastPage * 12} Plugins </span>in{" "}
            <span className="text-[#23CD15]">{categories?.length} Categories</span> - Handpicked
            and Updated Daily
          </h1>
        </div>
        <div className=' justify-between items-center w-full leading-[75px]'>
       <h1 className='flex-1 font-poppins font-normal  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px]  text-center text-[#23CD15] '>
       {show && <span className="bg-[#8a89893a] px-2 py-1 powered rounded-md">Powered by <a href={sponsorLink} className='font-semibold  border-white ms-2   text-white underline text-[17px] ss:text-[20px] decoration-[#23CD15]  md:text-[21px] '> {sponsorName} </a></span>}
       </h1>
        </div>
        <Searchbar  className={" w-full flex items-center justify-center"}  type={'pluginTool'}  resultsRef={resultRef}/>
      </section>
      <Sort setSelectedSort={setSelectedSort} selectedSort={selectedSort}/>
      <Categories />

      <div className=" md:items-center md:justify-center hidden md:flex ">
  <hr className="w-[150px] md:w-[520px] border-[#23CD15] translate-y-[60px] md:translate-y-[82px] border-t-[11px] rounded-2xl"/>
</div>
    <h1 className='font-poppins text-[32px] md:text-[50px] heading-color font-semibold text-center translate-y-[20px] '>Top OpenAI Plugins
</h1>
    </div>
    <div className=" justify-between items-center w-full mt-10">
          <h1 className="flex-1 font-poppins font-normal card-desc  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px] text-white text-center  px-3 md:px-0">
            <span className="text-[#23CD15]">Selected for Excellence! </span>Your Essential Guide to OpenAI Plugins 
          </h1>
        </div>

      <div className="py-16">
        <div  ref={resultRef}  className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 sm:grid-cols-2 gap-8 ">

            {pluginsData?.map((item, index) => (
              <HomeCard item={item} key={index} type={'pluginTool'} saved={false} userData={userData?._id}/>
            ))}

          </div>
          <div className=" absolute mt-5 card-desc font-semibold flex items-center justify-center w-full">
          <ButtonF setPage={setPage} allPageData={allPageData} />
          </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default Plugin;
