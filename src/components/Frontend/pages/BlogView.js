import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";
import styles from "../../../style";
import { useParams } from "react-router-dom";
import { FaXTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../loginContext";
import {useFront} from "../../../Context";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { API_URL } from "../../../util";

const BlogView = () => {
  const articleUrl = window.location.href;
  const { userData } = useAuth();
  const { id } = useParams();
  const resultRef = useRef();
  
  const { getAllBlogs, blogView, blogs4Rec, dateCount, setBlogView} = useFront();

  const getSingleBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blogs/getoneblog/${id}`
      );
      setBlogView(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  

  useEffect(() => {
    getSingleBlogs();
    getAllBlogs();
  }, [id]);

  return (
    <>
      <div
        className={` ${styles.paddingY} mt-[-12vh] pt-[12vh] md:px-[150px] px-[13px]`}
      >
        <h1 className="text-black font-semibold md:text-[60px] text-[35px] text-center" ref={resultRef}>
          {blogView?.blogTitle}
        </h1>
        <div className="justify-between py-5 ">
          <div className="flex flex-row justify-between relative ">
            {userData && userData?.profilePicture ? (
              <span style={{ listStyle: "none" }}>
                <img
                  className="w-[25px] h-[25px]"
                  src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                  alt=""
                  srcSet=""
                />
              </span>
            ) : (
              <span style={{ listStyle: "none" }}>
                <img
                  className="w-[25px] h-[25px]"
                  src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                  alt=""
                  srcSet=""
                />
              </span>
            )}
            <span className="absolute left-16 font-semibold text-[25px] -bottom-1 text-black ">
              {blogView?.authername}
            </span>

            <span className="flex justify-end items-end space-x-3  text-black">
            <FacebookShareButton url={articleUrl}>
                <FaFacebook size={20} />
              </FacebookShareButton>
              <WhatsappShareButton url={articleUrl}>
                <FaWhatsapp size={20} />
              </WhatsappShareButton>
              <TwitterShareButton url={articleUrl}>
              <FaXTwitter size={20} />
              </TwitterShareButton>
            </span>
          </div>
        </div>
        <div className=" flex justify-center items-center  ">
          <img className="w-[60%]" src={blogView?.coverUrl} alt="" />
        </div>

        <h1 className="card-title font-semibold md:text-[42px] text-[28px] pt-7 text-center">
          {blogView?.blogTitle}
        </h1>
        <div className="container md:px-[200px] ">
        <div className="text-black " >
          {blogView?.blogContent && typeof blogView.blogContent === "string"
            ? parse(blogView.blogContent)
            : null}
        </div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-20'>
      <hr className='divider w-[93%]' />
    </div>
      {/* blog cards */}
      <div className="text black font-semibold text-center w-full my-5 text-[28px] ">Explore More Blogs</div>
      <div className="grid grid-cols-1 md:grid-cols-2 ss:grid-cols-2 sm:grid-cols-2 gap-6 sm:px-16 px-6 box-border my-10 ">
            
        {blogs4Rec?.map((c, index) => (
          <Link to={`/blogs/${c._id}`} key={index}>
              <div
                
                onClick={()=>  resultRef.current.scrollIntoView({ behavior: 'smooth' })}
                className="w-lg  md:h-[30vh] h-[25vh]  mx-3 my-1 rounded-2xl blog-card relative"
              >
                <div className="flex">
                  <img
                    src={c.coverUrl}
                    alt="Card Image"
                    className="w-2/5 md:h-[30vh] h-[25vh]  object-cover rounded-l-2xl"
                  />
                  <div className="px-3 mt-1 md:mt-0 ss:p-3 md:p-9 ">
                    <h2 className=" text-md md:text-2xl font-medium card-title w-[142px] md:w-full overflow-hidden">
                      {c.blogTitle}
                    </h2>

                    {/* <p className='card-desc '>{c?.blogContent && typeof c.blogContent === 'string' ? parse(c.blogContent) : null}</p> */}
                    <p className=" card-desc font-normal w-[170px] h-[7vh] md:w-full overflow-hidden mb-3 mt-2 md:mt-0">
                      {c?.blogContent && typeof c.blogContent === "string"
                        ? parse(
                            c.blogContent.replace(/<[^>]*>/g, "").slice(0, 25)
                          )
                        : null}
                    </p>

                    <span className="font-light mt-5 blog-content justify-between w-full absolute bottom-2 md:bottom-3">
                      <div className=" text-[12px] md:text-[18px]">{c.authername}</div>{" "}
                      <span className="mt-5 font-normal text-[13px] card-desc clamp-2">
                        {dateCount(c.updatedAt)} ago
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
        ))}
      </div>
    </>
  );
};

export default BlogView;
