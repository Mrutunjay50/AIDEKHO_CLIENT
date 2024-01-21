import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { API_URL } from "../util";

const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [toolData, setToolData] = useState();
  const [filterData, setFilterData] = useState(null);
  const [plugins, setPlugins] = useState(null);
  const [gpt, setGpt] = useState(null);
  const [categories, setCategories] = useState(null);
  const [blogs, setBlogs] = useState();
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorLink, setSponsorLink] = useState('');
  const [show, setShow] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    keywords: '',
  });

  
  const getPlugins = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/plugins`);
      setPlugins(response.data.result.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getGPT = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/gpttools`);
      setGpt(response.data.result.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleExportCSV = async (toolType) => {
    try {
      const response = await axios.get(`${API_URL}/api/export-csv/${toolType}`); // Replace with your actual server URL and port
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exportedData.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data[0].names);
      setShow(response.data[0].sponsoredBy[0].show)
      setSponsorName(response.data[0].sponsoredBy[0].name)
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };


  //for fetching all data
  const fetchData = async() =>{
    try {
      const response = await axios.get(`${API_URL}/api/aitools`);
      setToolData(response.data.result.data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
    getPlugins();
    getGPT();
    getBlogs();
    getCategories();
  }, []);


  return (
    <ToolContext.Provider value={{metadata, handleExportCSV, setMetadata, sponsorLink, setSponsorLink, sponsorName, setSponsorName,show, setShow, toolData, setToolData, filterData, setFilterData, fetchData, plugins, setPlugins, getPlugins, gpt, setGpt,getGPT, categories, setCategories, blogs, setBlogs, getBlogs }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => {
  return useContext(ToolContext);
};