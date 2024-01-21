import React,{useState} from 'react'
import axios from 'axios'
import TermsPopup from '../Frontend/Terms'
import PrivacyPopup from './Policy';
import { ToastContainer,toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { API_URL } from '../../util';
import { useTheme } from '../../Context';

const Footer = () => {
  const [theme] = useTheme();
  const [email, setEmail] = useState();
  const [isTermsPopupOpen, setTermsPopupOpen] = useState(false);
  const [isPrivacyPopupOpen, setPrivacyPopupOpen] = useState(false);
  const path = window.location.pathname;
  const isBlogPage = path=== '/blogs' ||  path.includes('/blogs/');

  const openTermsPopup = () => setTermsPopupOpen(true);
  const closeTermsPopup = () => setTermsPopupOpen(false);
  const openPrivacyPopup = () => setPrivacyPopupOpen(true);
  const closePrivacyPopup = () => setPrivacyPopupOpen(false);


  const setSubscribers = async () => {
    try {
        const response = await axios.put(
          `${API_URL}/api/setsubscribers`,
            {email : email}
          );
          // Assuming the response.data contains the updated category data
          // console.log(response.data);
          toast.info(response.data.message);
          setEmail('');
        // setEmail(response.data.existingCategories.names);
    } catch (err) {
      toast.error("Invalid error format");
      setEmail('');
    }
  };
  return (
    <footer className={` ${isBlogPage ? 'bg-white' : 'bgcolor'}`} id={theme} >
    <div className='footer bgcolor '>
    <ToastContainer hideProgressBar autoClose={'3000'}/>
    <div className='flex justify-center items-center pt-10'>
      <hr className='divider w-[93%] ' />
    </div>
  <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1  lg:grid-cols-3">
      <div>
        <div className="">
          <h1 className='card-desc font-bold md:text-4xl text-3xl md:px-9 pb-5'>aidekho.<span className='text-[#23CD15]'>io</span></h1>
          
        </div>
       
          </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
        <div>
          <p className="font-medium card-desc">Quick Links</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link to ="/" className="card-desc"> Home</Link>
            </li>
            <li>
              <Link to ="/top" className="card-desc"> Top Picks </Link>
            </li>
            <li>
              <Link to ="/gpts" className="card-desc"> Gpt</Link>
            </li>
            <li>
              <Link to ="/plugins" className="card-desc"> Plugins </Link>
            </li>
            <li>
              <Link to ="/blogs" className="card-desc"> Blogs </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium card-desc pt-7 md:pt-0">Our Terms</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a href="#" onClick={openTermsPopup} className="card-desc transition hover:opacity-75"> Terms & Conditions </a>
            </li>
            <TermsPopup isOpen={isTermsPopupOpen} closeModal={closeTermsPopup} />
            <li>
              <a href="#" onClick={openPrivacyPopup} className="card-desc transition hover:opacity-75"> Privacy Policy </a>
            </li>
            <PrivacyPopup isOpen={isPrivacyPopupOpen} closeModal={closePrivacyPopup} />
           </ul>

          
        </div>
     <div>
     <div className=''>
     <h2 className='font-semibold pt-6 md:pt-0'>Get In Touch </h2>
     <p className='mt-5'>contact@aidekho.io</p>
     </div>
           <h1 className='text-xl font-bold md:mt-5 mt-7'>Subscribe To Our Newsletter</h1>
         
          
           <form className="mt-4 flex flex-col md:flex-row items-center">
              <div className="relative w-full ">
                <input
                  type="text"
                  id="simple-search"
                  className="text-sm rounded-lg block w-full md:w-full p-2.5 border-2 border-black  text-black focus:outline-none"
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
    </div>

  </div>
  <p className="text-xs pb-5 -500 text-center card-desc">© 2024. AIDEKHO. All rights reserved.</p>

  </div>  
</footer>


  )
}

export default Footer