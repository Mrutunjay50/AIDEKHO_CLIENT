import React,{useEffect, useState} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import {
  AiPlug,
  BackNav,
  Dashboard,
  GPTTools,
  Plugins,
  ToolsList,
  TopPicks,
  UploadCSV,
} from "./components/Backend/index.js";
import { ToolProvider , FrontProvider } from "./Context";
import { AuthProvider } from "./components/loginContext";
import {ThemeProvider, useTheme } from "./Context/ThemeContext";
import Home from "./components/Frontend/pages/Home";
import Top from "./components/Frontend/pages/Top";
import Gpt from "./components/Frontend/pages/Gpt";
import Plugin from "./components/Frontend/pages/Plugin";
import Blogs from "./components/Frontend/pages/Blog";
import Nav from "./components/Frontend/Nav.js";
import AddCategory from "./components/Backend/pages/AddCategory.js";
import BlogPlug from "./components/Backend/pages/BlogPlug.js";
import Blog from "./components/Backend/pages/Blog.js";
import ScrollToTop from "react-scroll-to-top";
import Dark from "./components/Frontend/Dark";
import Newsletter from "./components/Frontend/Newsletter";
import Footer from "./components/Frontend/Footer";
import BlogView from "./components/Frontend/pages/BlogView.js";
import Savepage from "./components/Frontend/pages/Savepage.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Layout from "./Layout.js";
import {ReactComponent as ArrowSVG } from './Arrow.svg'
import { initGA, logPageView } from "./components/Analytics.js";
import { API_URL } from "./util.js";

const AdminRoutes = () => {
  // Redirect to home if user is not an admin
  if (!localStorage.getItem("isAdmin")) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <ToolProvider>
      <BackNav />
      <Routes>
        <Route path="alltools" element={<ToolsList />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="toppicks" element={<TopPicks />} />
        <Route path="gpttools" element={<GPTTools />} />
        <Route path="plugins" element={<Plugins />} />
        <Route path="blogs" element={<Blog/>} />
        <Route path="addtool/:type" element={<AiPlug edit={false} />} />
        <Route path="edittool/:type/:id" element={<AiPlug edit={true} />} />
        <Route path="addBlog" element={<BlogPlug edit={false} />} />
        <Route path="editBlog/:id" element={<BlogPlug edit={true} />} />
        <Route path="csv" element={<UploadCSV />} />
        <Route path="addCategory" element={<AddCategory/>} />
      </Routes>
      </ToolProvider>
    </>
  );
};

const FrontendRoutes = () => {
 
  const isAuth = localStorage.getItem('isAuthenticated');
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    // Log initial pageview
    logPageView();
  }, []);

  return (
    <>
     <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    <FrontProvider>
   
 <div className="w-full overflow-hidden">
    <Nav />
    <Dark/>
   <Newsletter/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top" element={<Top />} />
            <Route path="/gpts" element={<Gpt />} />
            <Route path="/plugins" element={<Plugin />} />
            
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id"  element={<BlogView/>} />
            {isAuth ? (
              <Route path="/cart" element={<Savepage />} />
            ) : (
              // Redirect to home if not authenticated
              <Route
                    path="/*"
                    element={<Navigate to="/" />}
                  />
            )}
          </Routes>
          <Footer/>
      
          </div>
     
    
    <ScrollToTop
        smooth
        color="#ffff"
        component={<ArrowSVG/>}
        style={{ backgroundColor: "#23CD15", borderRadius: "80px", display: "flex", justifyContent: "center", alignItems: "center"}}
      />
      
     </FrontProvider>
    </>
  );
};

const App = () => {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
  });
  useEffect(() => {
    // Fetch metadata from your backend API
    axios.get(`${API_URL}/api/getMetadata`) // Replace with your actual API endpoint
      .then(response => {
        const { title, description, keywords } = response.data.metadata;
        setMetaData({ title, description, keywords });
      })
      .catch(error => {
        console.error('Error fetching metadata:', error);
      });
  }, []);

  
  return (
    <>
        <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <AuthProvider>
        
        <ThemeProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route
              path="/*"
              element={
                <>
                  <FrontendRoutes />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          </ThemeProvider>
      </AuthProvider>
          </Layout>
    </>
  );
};

export default App;
