import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "./loginContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../util";

const Login = () => {
  const { setUserData, setToken } = useAuth();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse.access_token;

    try {
      // signin user
      const response = await axios.post(`${API_URL}/signin`, {
        googleAccessToken: accessToken,
      });
      const { existingUser: user, token } = response.data;
      setUserData(user);
      setToken(token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("isAdmin", user.admin);
      document.cookie = `jwt=` + token;
      if (user.admin) {
        navigate("/admin/alltools");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleLogin = async () => {
    const { email, password } = Data;
    try {
      // signin user
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      const { existingUser: user, token } = response.data;
      setUserData(user);
      setToken(token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("isAdmin", user.admin);
      document.cookie = `jwt=` + token;
      if (user?.admin === true) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      // console.log(err);
      toast.error("invalid credentials");
    }
  };

  return (
   
    <div className="w-full bg-primary md:p-2 min-h-[100vh] flex justify-center gap-10 items-center text-white ">
      <ToastContainer hideProgressBar autoClose={"3000"} />
      <div className="md:flex md:flex-1 md:justify-evenly w-full mr-10 ">
        <div className="mt-10 md:mt-28 mb-8 md:mb-0">
          <Link to="/">
            <img
              src="/logo.png"
              alt=""
              className="md:w-[350px] w-[200px] md:h-[90px] h-[50px] cursor-pointer"
            />
          </Link>
          <span className="md:text-[20px] text-[15px] md:px-[85px] px-[20px] ">
            Find The Best AI Tools & Websites
          </span>
        </div>

        <div className="sm:w-[50%] md:w-[35%] bg-primary border-2 border-gray-500 rounded-lg p-5 flex flex-col gap-5 text-[20px] relative">
          <p className="text-[32px] md:text-[24px] font-medium text-center">
            Login
          </p>

          <div className="flex flex-col gap-3">
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email..."
              onChange={handleChange}
              required
              className="rounded-md focus:outline-none px-3 py-1 bg-[#232930] h-[7vh]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <span>Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password..."
              onChange={handleChange}
              required
              className="rounded-md focus:outline-none px-3 py-1 bg-[#232930] h-[7vh]"
            />
          </div>

          <div
            onClick={handleLogin}
            className="border-2 h-[7vh] rounded-md w-full md:w-[100%] mt-5 py-1 cursor-pointer bg-[#0bdf40] font-medium text-white flex justify-center items-center"
          >
            Log In
          </div>

          <div className="flex justify-around items-center -mt-2">
          <div
          onClick={login}
          className="border-2 h-12 rounded-md w-full py-2 cursor-pointer bg-[#ffffff] font-medium text-black flex justify-center items-center"
        >
          <FcGoogle size={35} />
          <span className="px-2 text-lg">Continue with Google</span>
        </div>
      </div>

          <Link to="/signup">
            <div className="text-center mt-2">
              Haven't Registered? Click here
            </div>
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
