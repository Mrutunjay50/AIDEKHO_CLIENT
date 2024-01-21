import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../../util";

const UploadCSV = () => {
  const [file, setCSVFile] = useState(null);

  const handleUpload = async () => {
    console.log("chalie suru karte hai");
    try {
      console.log("kya chl raha pata nahi");
      const formData = new FormData();
      formData.append('file', file);
      if (!file) {
        console.error('Please select a file');
        return;
      }
      console.log(file);
      const response = await axios.post(`${API_URL}/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      // console.log(response.data.message);
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  };

  return (
    <div className=" w-[80%] bg-slate-100 ml-[20%] p-2 min-h-[100vh] relative">
    <form method="POST" encType="multipart/form-data">
      <input
        type="file"
        name="file"
        id=""
        onChange={(e) => {
          const file1 = e.target.files[0];
          setCSVFile(file1);
        }}
      />

      <div onClick={handleUpload}>Upload</div>
      </form>
    </div>
  );
};

export default UploadCSV;