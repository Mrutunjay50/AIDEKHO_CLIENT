import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "./loginContext";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer,toast } from "react-toastify";
import { API_URL } from "../util";

const Signup = () => {
  const { setUserData, setToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.access_token;

    try {
      // signup user
     
      const response = await axios.post(`${API_URL}/signup`, {
        googleAccessToken: accessToken,
      });
      const { result: user, token } = response.data;
      setUserData(user);
      setToken(token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("isAdmin", user.admin);
      if (user?.admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSignup = async () => {
    
    const { name, email, password, confirmPassword } = data;
    try {
      // signin user
      const response = await axios.post(`${API_URL}/signup`, { name, email, password, confirmPassword });
      navigate("/login");
    } catch (err) {
      toast.error("invalid input");
      // toast.error(err);
    }
  };
  
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    
    <div className="w-full bg-primary p-2 min-h-screen flex flex-col md:flex-row justify-center items-center text-white">
    <ToastContainer hideProgressBar autoClose={'3000'}/>
 <div className="md:flex md:flex-1 md:justify-evenly">
    <div className="mt-10 md:mt-36 mb-8 md:mb-0">
      <Link to="/">
        <img
          src="/logo.png"
          alt=""
          className="md:w-[350px] w-[200px] md:h-[90px] h-[50px] cursor-pointer"
        />
      </Link>
      <span className="text-[15px] md:px-[85px] px-[20px] ">Find The Best AI Tools & Websites</span>
    </div>

    <div className="w-full md:w-3/4 lg:w-1/3 xl:w-1/4 bg-primary border-2 border-gray-500 rounded-lg p-4 flex flex-col gap-2 text-lg relative">
      <p className="text-2xl font-medium text-center">Signup</p>
      <div className="flex flex-col gap-2">
        <span>Name</span>
        <input
          className="rounded-md focus:outline-none px-3 py-2 bg-[#232930]"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Enter Your Name..."
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>Email</span>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email..."
          className="rounded-md focus:outline-none px-3 py-2 bg-[#232930]"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password..."
          id="pass"
          className="rounded-md focus:outline-none px-3 py-2 bg-[#232930]"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>Confirm Password</span>
        <input
          type="password"
          name="confirmPassword"
          id="cpass"
          placeholder="Enter Your confirm Password..."
          className="rounded-md focus:outline-none px-3 py-2 bg-[#232930]"
          onChange={handleChange}
          required
        />
      </div>

      <div
        onClick={handleSignup}
        className="border-2 h-12 rounded-md mt-2 w-full py-2 cursor-pointer bg-[#0bdf40] font-medium text-white flex justify-center items-center"
      >
        Register
      </div>
      <div className="flex justify-around items-center mt-2">
        <div
          onClick={login}
          className="border-2 h-12 rounded-md w-full py-2 cursor-pointer bg-[#ffffff] font-medium text-black flex justify-center items-center"
        >
          <FcGoogle size={35} />
          <span className="px-2 text-lg">Continue with Google</span>
        </div>
      </div>
      <Link to="/login">
        <div className="py-2 text-lg text-center">Already Registered? Click here</div>
      </Link>
    </div>
  </div>
</div>


  );
};

export default Signup;
