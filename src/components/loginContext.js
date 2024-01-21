import React, { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../util";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [tokenId, setToken] = useState();

  useEffect(() => {
    // Retrieve the token from the HTTP cookie
    const cookies = document.cookie.split(';');
    let token = null;
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("jwt=")) {
        token = cookie.substring("jwt=".length, cookie.length);
        break;
      }
    }
  
    if (token) {
      // Decode the token to get user data
      const decodedUserData = jwtDecode(token);
      const {id} = decodedUserData;

      setToken(token);

      axios
        .get(`${API_URL}/auth/getUser`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;  charset=UTF-8'
          },
          params: {
            userId: id,
          }
        })
        .then((response) => {
          const {user} = response.data;
          // console.log(user);
          setUserData(user);
        })
        .catch(function (error) {
          console.log(error);
        });

      // Check token expiration (optional)
      const expirationTimestamp = decodedUserData.exp * 1000; // Convert to milliseconds
      const currentTimestamp = Date.now();
  
      if (currentTimestamp > expirationTimestamp) {
        // Token has expired, you may want to redirect to the login page
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("isAuthenticated");
        setUserData(null);
        navigate("/login");
      }
    }
  },[]);

  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("isAuthenticated");
    setUserData(null);
  };


  return (
    <AuthContext.Provider value={{ userData, setUserData, tokenId, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};