import React, { useEffect,  useState } from "react";
import styles from "../../../style";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Layout from "../../../Layout";
import {useFront} from "../../../Context";

const Blogs = () => {
  const { blogs, dateCount} = useFront();

  return (
    <>
      <Layout
        title={"AIDekho- blogs"}
        description={
          "AI Dekho is a free website to help you discover top AI tools and software, making your work and life more productive."
        }
      >
        <div className={`${styles.paddingX}  mt-[-12vh] pt-[12vh] navbg`}>
          <div className="mt-7 mb-20">
            <div className="flex items-center justify-center">
              <hr className="w-[300px] md:w-[450px] border-[#23CD15] translate-y-[67px] md:translate-y-[83px] border-t-[8px] rounded-2xl" />
            </div>
            <h1 className="font-poppins text-[33px] md:text-[50px] heading-color font-semibold text-center translate-y-[25px]">
              Recent Blog Post
            </h1>
          </div>
        </div>

        {/* blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 ss:grid-cols-2 sm:grid-cols-2 gap-6 sm:px-16 px-6 box-border ">
          {blogs?.map((c, index) => (
            <Link to={`/blogs/${c._id}`} key={index}>
              <div
                
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
      </Layout>
    </>
  );
};

export default Blogs;
