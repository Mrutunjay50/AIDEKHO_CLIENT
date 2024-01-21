import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import { useAuth } from '../../loginContext'

const BackNav = () => {
  const {userData} = useAuth();
  return (
    <div className=" fixed bg-blue-500 h-[100vh] w-[20%] text-white text-center px-1">
    <ProfilePic userData={userData}/>
      <div className="text-[32px] my-10">Menu</div>
      <ul className=" flex flex-col gap-5">
      <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/">
<li>Home</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/dashboard" >
          <li>Dashboard</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/alltools" >
          <li>All AI Tools</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/toppicks" >
          <li>Top Picks</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/gpttools" >
          <li>Chat GPT</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/plugins" >
          <li>Plugins</li>
        </Link>
        <Link className="border-2 border-transparent py-2 hover:border-white rounded-md cursor-pointer" to="/admin/blogs" >
          <li>Blogs</li>
        </Link>
        
      </ul>
    </div>
  );
};

export default BackNav;
