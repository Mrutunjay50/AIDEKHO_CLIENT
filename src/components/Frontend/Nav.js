import React, { useState } from 'react';
import styles from '../../style';
import { Link } from "react-router-dom";
import { close, menu } from "../../assets";
import { useAuth } from '../loginContext';
import { FaBookmark } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { useTheme } from '../../Context';

const Nav = () => {
  const [theme] = useTheme();
  const {userData} = useAuth();
  const path = window.location.pathname;
  const [toggle, SetToggle] = useState(false);
  const isBlogPage =  path.includes('/blogs/');
  
  return (
    <div className={`px-3 md:px-6   ${isBlogPage ? 'bg-[#135bb0]' : 'bg-transparent'} `} id={theme}>
    <nav className="w-full flex h-[12vh] justify-between items-center navbar">

    <Link to= "/"><img src="/logof.png" alt="" className= "md:w-[200px] w-[175px]" /></Link>

     <ul className="list-none md:flex hidden justify-end items-center flex-1">
      <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 alpha ${path === '/' && "alpha2"}`}>
        <Link to= "/"> Home </Link>
      </li>
      <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 alpha ${path === '/top' && "alpha2"}`}>
        <Link to= {"/top"} > Top Picks </Link>
      </li>
      <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 alpha ${path === '/gpts' && "alpha2"}`}>
        <Link to= {"/gpts"} > GPT </Link>
      </li>
      <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 alpha ${path === '/plugins' && "alpha2"}`}>
        <Link to= {"/plugins"} > Plugin </Link>
      </li>
      <li className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10 alpha ${path === '/blogs' ? "alpha2" : path.includes('/blogs') && "alpha2"}`}>
        <Link to= {"/blogs"} > Blogs </Link>
      </li>
      {userData ? (userData?.profilePicture ? <><Link to='/cart' className='cursor-pointer pe-2 absolute save-page '>
      <FaBookmark color='#23CD15' size={25} />
      </Link><li>
        <img className='w-[39px] h-[39px] rounded-3xl' src={userData?.profilePicture} alt="" />
        
      </li></> : <li>
      <span className='px-3 py-2 w-[35px] h-[35px] rounded-2xl bg-green-500 text-white font-bold text-[25px]'> {userData?.name.substring(0,1)}</span>
      </li>): <li className="font-poppins font-medium cursor-pointer text-[16px] text-white mr-10 inline-flex justify-center items-center "><FcGoogle size={20}/>
        <Link to= {"/login"} className='px-1' >  Login/Signup </Link>
      </li>}
     </ul>

{/* Mobile responsive nav bar */}
    <div className='md:hidden flex flex-1 justify-end items-center '>
    {userData ? (userData?.profilePicture ? <><span>
        <img className='w-[35px] h-[35px] rounded-3xl mr-3 md:mr-0' src={userData?.profilePicture} alt="img" />
        
      </span><Link to='/cart' className ='cursor-pointer pe-2 px-1 absolute save-page '>
      <FaBookmark  color='#23CD15' />
      </Link></> : <span>
      <span className='px-3 py-2 w-[35px] h-[35px] bg-green-500 text-white font-bold text-[25px]'> {userData?.name.substring(0,1)}</span>
      </span>): <span className="font-poppins font-normal cursor-pointer text-[14px] text-white mr-2 inline-flex justify-center items-center">
      <FcGoogle/><Link to= {"/login"} className='px-1' > Login/Signup </Link>
      </span>}
  
      <img src={toggle ? close : menu} alt="menu"
      className='w-[25px] h-[25px] object-contain' 
        onClick={() => SetToggle(!toggle)}
      />

      <div className= {`${!toggle ? "hidden" : "flex"}
      p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-50 bg-gradient-to-r from-lime-700 to-[#00cd34]`}>

        <ul className='list-none flex justify-end items-start flex-1 flex-col'>

        <li className= "font-poppins font-medium cursor-pointer text-[16px] text-white mr-4 py-2">
        <Link to= "/"> Home </Link>
      </li>
      <li className="`font-poppins font-medium cursor-pointer text-[16px] text-white mr-4 py-2">
        <Link to= {"/top"}> Top Picks </Link>
      </li>
      <li className="`font-poppins font-medium cursor-pointer text-[16px] text-white mr-4 py-2">
        <Link to= {"/gpts"}> GPT </Link>
      </li>
      <li className="`font-poppins font-medium cursor-pointer text-[16px] text-white mr-4 py-2">
        <Link to= {"/plugins"}> Plugins </Link>
      </li>
      <li className="`font-poppins font-medium cursor-pointer text-[16px] text-white mr-4 py-2">
        <Link to= {"/blogs"}> Blogs </Link>
      </li>
        </ul>
      </div>
    </div>


    </nav>
</div>

  )
}

export default Nav