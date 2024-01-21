import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../loginContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { API_URL } from "../../../util";


const BlogPlug = ({edit}) => {

  const {tokenId} = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    image: "",
    blogContent: "",
    authername : "",
    autherimage : "",
    bloglink : ""
  });

  const getBlogData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/blogs/getoneblog/${id}`
      );
      setBlogData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (value) => {
    setBlogData((prevData) => ({ ...prevData, blogContent: value }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle different input types separately
    setBlogData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  // console.log(blogData.blogCover);

  // const handleImageUpload = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);

  //     // Upload image to server
  //     const response = await axios.post('/api/uploadContentImage', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     const imageUrl = response.data;
  //     // Insert the image into the Quill editor at the current cursor position
  //     const range = quillRef.getEditor().getSelection(true);
  //     quillRef.getEditor().insertEmbed(range.index, 'image', imageUrl);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('blogTitle', blogData.blogTitle);
      formData.append('image', blogData.image);
      formData.append('blogContent', blogData.blogContent);
      formData.append('authername', blogData.authername);
      formData.append('autherimage', blogData.autherimage);
      formData.append('bloglink', blogData.bloglink);
  
      if (edit) {
        await axios.put(`${API_URL}/api/blogs/update/${id}`, formData,{
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        });
      } else {
        await axios.post(`${API_URL}/api/blogs/create`, formData,{
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        });
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (edit && id) {
      console.log("entered");
      getBlogData();
    }
  }, []);
  

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  
  return (
    <div className="w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative flex items-center justify-center">
      <span className="w-[80%] flex flex-col text-[22px]">
        <span className="text-[30px]">Add Blog</span>
        <span>
        <form method={edit ? "put" : "post"} encType="multipart/form-data">
          <div className="w-full">
            blogTitle : <br />
            <input type="text" name="blogTitle" value={blogData.blogTitle} className="mb-5 rounded-md px-3 py-2 w-[80%] bg-white" id="" onChange={handleChange} />
          </div>
          <div className="w-full">
            blogCover : <br />
            <input type="file" name="image" className="mb-5 rounded-md px-3 py-2 w-[80%] bg-white" id="" onChange={handleChange} />
          </div>
          <div className="w-full">
            blogContent : <br />
            <ReactQuill theme="snow" value={blogData.blogContent} onChange={handleTextChange}
        modules={modules}
        placeholder="Write something amazing..." />
          </div>
          <div className="w-full">
            authername : <br />
            <input type="text" name="authername" value={blogData.authername} className="mb-5 rounded-md px-3 py-2 w-[80%] bg-white" id="" onChange={handleChange} />
          </div>
          <div className="w-full">
            autherimage : <br />
            <input type="text" name="autherimage" value={blogData.autherimage} placeholder="please provide a direct image link" className="mb-5 rounded-md px-3 py-2 w-[80%] bg-white" id="" onChange={handleChange} />
          </div>
          <div className="w-full">
            bloglink : <br />
            <input type="text" name="bloglink" value={blogData.bloglink} className="mb-5 rounded-md px-3 py-2 w-[80%] bg-white" id="" onChange={handleChange} />
          </div>
          </form>
        </span>
        <div className="cursor-pointer text-white text-[20px] bg-[#23CD15] w-[80px] rounded-lg p-2 overflow-scroll-X" onClick={handleSubmit}>submit</div>
      </span>
    </div>
  );
};

export default BlogPlug;
