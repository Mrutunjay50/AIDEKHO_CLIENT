import React from 'react'
import styles from '../../style'
import { useFront } from '../../Context';
import Searchbar from './Searchbar';

const Hero = ({tools, show, sponsorName, sponsorLink, type, resultRef}) => {

  const {categories} = useFront();

  return (
   <>
    <section className={` ${styles.paddingY, styles.paddingX } md:pt-7`}>
       <div className=' justify-between items-center w-full'>
       <h1 className='flex-1 font-poppins font-semibold  text-[35px]  ss:text-[42px] xs:text-[30px] md:text-[57px] text-white text-center'>
       Explore Best AI Tools & Websites 
       </h1>
        </div>

        <div className=' justify-between items-center w-full '>
       <h1 className='flex-1 font-poppins font-normal  text-[14px]  ss:text-[18px] xs:text-[18px] md:text-[18px] text-white text-center '>
      Discover <span className='text-[#23CD15]'>{tools} AI Tools </span>in <span className='text-[#23CD15]'>{categories?.length} Categories</span> - Handpicked and Updated Daily
       </h1>
        </div>

          <div className=' justify-between items-center w-full leading-[75px]'>
       <h1 className='flex-1 font-poppins font-normal  text-[13px]  ss:text-[18px] xs:text-[18px] md:text-[18px]  text-center text-[#23CD15] '>
       {show && <span className="bg-[#8a89893a] px-2 py-1 powered rounded-md">Powered by <a href={sponsorLink} className='font-semibold  border-white ms-2   text-white underline text-[17px] ss:text-[20px] decoration-[#23CD15]  md:text-[21px] '> {sponsorName} </a></span>}
       </h1>
        </div>
       
       <Searchbar className={" flex items-center justify-center w-[100%]"} className1={"gap-5"} type={type} resultsRef={resultRef}/>



       
    </section>
   </>
  )
}

export default Hero 

