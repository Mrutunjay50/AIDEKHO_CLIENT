import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { API_URL } from "../util";

const FrontContext = createContext();

export const FrontProvider = ({ children }) => {
  const [toolsData, setToolsData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [pluginsData, setPlugins] = useState(null);
  const [gptData, setGpt] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [blogView, setBlogView] = useState();
  const [blogs, setBlogs] = useState();
  const [blogs4Rec, setBlogs4Rec] = useState();
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorLink, setSponsorLink] = useState("");
  const [show, setShow] = useState(false);
  const [allPageData, setAllPageData] = useState({
    currentPage: "",
    hasLastPage: "",
    hasPreviousPage: "",
    nextPage: "",
    previousPage: "",
    lastPage: "",
  });

  const handleCategoryChange = (category) => {
    if (category === null) {
      setSelectedCategory(null);
    } else {
      if (selectedCategory.includes(category)) {
        // If category is already selected, remove it
        const updatedCategories = selectedCategory.filter(
          (cat) => cat !== category
        );
        setSelectedCategory(updatedCategories);
      } else {
        // If category is not selected, add it
        setSelectedCategory([...selectedCategory, category]);
      }
    }
  };

  const categoriesToString = () => {
    if (selectedCategory !== null || selectedCategory?.length >= 0) {
      return selectedCategory?.map((item) => item?.trim());
    }
  };

  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchTools = async (options = {}) => {
    try {
      let apiUrl = `${API_URL}/api/aitools?page=${page}&limit=${limit}&sortBy=${selectedSort}`;

      if (selectedCategory.length > 0) {
        apiUrl += `&category=${categoriesToString()}`;
      }

      // Add search functionality
      if (options.search) {
        apiUrl += `&search=${options.search}`;
      }

      const response = await axios.get(apiUrl);
      setToolsData(response.data.result.data);
      setAllPageData({
        currentPage: response.data.currentPage,
        hasLastPage: response.data.hasLastPage,
        hasPreviousPage: response.data.hasPreviousPage,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const getPlugins = async (options = {}) => {
    try {
      let apiUrl = `${API_URL}/api/plugins?page=${page}&limit=${limit}&sortBy=${selectedSort}`;

      if (selectedCategory.length > 0) {
        apiUrl += `&category=${categoriesToString()}`;
      }
      // Add search functionality
      if (options.search) {
        apiUrl += `&search=${options.search}`;
      }
      const response = await axios.get(apiUrl);
      setPlugins(response.data.result.data);
      setAllPageData({
        currentPage: response.data.currentPage,
        hasLastPage: response.data.hasLastPage,
        hasPreviousPage: response.data.hasPreviousPage,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const dateCount = (dateString) => {
    const startDate = new Date(dateString);
    const currentDate = new Date();

    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - startDate) / 1000
    );

    let displayString;

    if (timeDifferenceInSeconds < 60) {
      // Less than a minute
      displayString = `${timeDifferenceInSeconds} seconds`;
    } else if (timeDifferenceInSeconds < 3600) {
      // Less than an hour
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      displayString = `${minutes} minutes`;
    } else if (timeDifferenceInSeconds < 86400) {
      // Less than a day
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      displayString = `${hours} hours`;
    } else if (timeDifferenceInSeconds < 31536000) {
      // Less than a year
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      displayString = `${days} days`;
    } else {
      // More than a year
      const years = Math.floor(timeDifferenceInSeconds / 31536000);
      displayString = `${years} years`;
    }

    return `${displayString}`;
  };

  const getSponsor = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setShow(response.data[0].sponsoredBy[0].show);
      setSponsorName(response.data[0].sponsoredBy[0].name);
      setSponsorLink(response.data[0].sponsoredBy[0].link);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getGPT = async (options = {}) => {
    try {
      let apiUrl = `${API_URL}/api/gpttools?page=${page}&limit=${limit}&sortBy=${selectedSort}`;

      if (selectedCategory.length > 0) {
        apiUrl += `&category=${categoriesToString()}`;
      }
      // Add search functionality
      if (options.search) {
        apiUrl += `&search=${options.search}`;
      }
      const response = await axios.get(apiUrl);
      setGpt(response.data.result.data);
      setAllPageData({
        currentPage: response.data.currentPage,
        hasLastPage: response.data.hasLastPage,
        hasPreviousPage: response.data.hasPreviousPage,
        nextPage: response.data.nextPage,
        previousPage: response.data.previousPage,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      // Shuffle the array
      const shuffledData = response.data.sort(() => Math.random() - 0.5);

      // Take the first 4 items
      const randomFourBlogs = shuffledData.slice(0, 4);

      setBlogs4Rec(randomFourBlogs);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data[0].names);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getSponsor();
  }, []);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <FrontContext.Provider
      value={{
        setToolsData,
        toolsData,
        fetchTools,
        setFilterData,
        filterData,
        getPlugins,
        setPlugins,
        pluginsData,
        getGPT,
        setGpt,
        gptData,
        categories,
        setSelectedCategory,
        selectedCategory,
        setSelectedSort,
        selectedSort,
        setPage,
        page,
        blogView,
        setBlogView,
        blogs,
        blogs4Rec,
        setBlogs,
        getAllBlogs,
        getBlogs,
        dateCount,
        show,
        sponsorName,
        sponsorLink,
        allPageData,
        setAllPageData,
        handleCategoryChange,
      }}
    >
      {children}
    </FrontContext.Provider>
  );
};

export const useFront = () => {
  return useContext(FrontContext);
};
