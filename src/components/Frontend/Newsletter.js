import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../loginContext";
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import { API_URL } from "../../util";

const Popup = () => {
  const {userData} = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [email, setEmail] = useState();


  const setSubscribers = async () => {
    try {
        const response = await axios.put(
          `${API_URL}/api/setsubscribers`,
            {email : email}
          );
          // Assuming the response.data contains the updated category data
          toast.info(response.data.message);
          setEmail('');
        // setEmail(response.data.existingCategories.names);
    } catch (err) {
      toast.error("Invalid error format");
      setEmail('');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPopupOpen(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
       {!userData && isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <ToastContainer hideProgressBar autoClose={'3000'}/>
          <div className="bg-white p-4 md:p-7 rounded-lg shadow-md md:w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closePopup}
            >
             <IoClose size={30} color="black" />
            </button>

            <div className="mt-2">
              <h1 className="text-2xl md:text-4xl font-bold">
                The Future of AI News
              </h1>
              <p className="mt-2 text-base md:text-xl">
                Subscribe to get the most recent AI tools directly in your email (completely free).
              </p>
            </div>

            <form className="mt-4 flex flex-col md:flex-row items-center">
              <div className="relative w-full md:w-2/3">
                <input
                  type="email"
                  id="simple-search"
                  className="text-sm rounded-lg block w-full md:w-full p-2.5 border-2  focus:outline-none"
                  placeholder="Enter Your Email...."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                onClick={setSubscribers}
                className="mt-3 md:mt-0 md:ml-3 px-3 py-2.5 text-sm text-white bg-[#23CD15] rounded-lg cursor-pointer"
              >
                <span className="px-2 font-poppins">Subscribe</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
