import React, { useEffect, useState } from 'react';
import { useTool } from "../../../Context";
import axios from 'axios';
import { API_URL } from "../../../util";
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const { toolData, plugins, categories, handleExportCSV} = useTool();
  const [noOfUsers, setNoOfUsers] = useState(0);

  const getNoOfUsers = async () =>{
    try {
      const response = await axios.get(`${API_URL}/usersno`);
      setNoOfUsers(response.data.TotalUsers);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() =>{
    getNoOfUsers();
  },[])

  return (
    <div className=' w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh]'>
    <div className='flex flex-wrap gap-10 m-10 '>
      <div className=' w-[25%] h-[18vh] border-2 rounded-lg flex justify-center items-center text-[24px] font-medium bg-slate-200 text-center'>TotalTools <br/> {toolData?.length}</div>
      <div className=' w-[25%] h-[18vh] border-2 rounded-lg flex justify-center items-center text-[24px] font-medium bg-slate-200 text-center'>Total Plugins <br/> {plugins?.length}</div>
      <div className=' w-[25%] h-[18vh] border-2 rounded-lg flex justify-center items-center text-[24px] font-medium bg-slate-200 text-center'>Total Categories <br/> {categories?.length}</div>
      <div className=' w-[25%] h-[18vh] border-2 rounded-lg flex justify-center items-center text-[24px] font-medium bg-slate-200 text-center'>TotalUsers <br/> {noOfUsers}</div>
      <Link to='/admin/addCategory' className=' w-[25%] h-[10vh] border-2 rounded-lg flex justify-center items-center absolute bottom-10 right-60 cursor-pointer text-[24px] font-medium bg-slate-200 text-center hover:bg-[#23CD15]'>< >Add Category/Powered by</></Link>
      <div onClick={() => handleExportCSV('subscribers')} className=' w-[25%] h-[10vh] border-2 rounded-lg flex justify-center items-center absolute bottom-10 left-80 cursor-pointer text-[24px] font-medium bg-slate-200 text-center hover:bg-[#23CD15]'>< >Subscribed Users Data</></div>
    </div>

    
    </div>
  )
}

export default Dashboard;