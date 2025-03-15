import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function InputPodcast() {
  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [inputs, setInputs] = useState({title:"", description:"", category:""});

  

  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFrontImage(file);
    console.log("file:", file);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    // setDragging(false);
  };
  const handleDropImage = (e) => {
    // console.log("drop");
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  }

  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAudioFile(file);
    // console.log("file:", file);
  }

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    // console.log("name:", name);
    setInputs({ ...inputs, [name]: value });
  }
  const handleSubmitPodcast = async () => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description); 
    formData.append("category", inputs.category);
    formData.append("frontImage", frontImage);
    formData.append("audioFile", audioFile);
    // console.log("formData:", formData);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/add-podcast", formData, {withCredentials: true, 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data && error.response.data.error);
    }
    finally {
      setInputs({title:"", description:"", category:""});
      setFrontImage(null);
      setAudioFile(null);
    }
  }

  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row justify-between lg:justify-start">
        <div className="w-full lg:w-2/6 flex items-center  justify-center lg:justify-center cursor-pointer">
          <div
            style={{ border: "1px dashed black" }}
            className="custom-size flex items-center justify-center transition-all duration-300"
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDropImage}
          >
            <input
              type="file" 
              accept="image/"
              id="file"
              name="frontImage"
              className="hidden "
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="frontImage"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <label
                  htmlFor="file"
                  className={`text-xl h-full p-4 w-full flex items-center justify-center ${
                    dragging
                      ? "hover:bg-blue-200"
                      : ""
                  } hover:bg-gray-200 transition-all duration-300`}
                >
                  <div className="text-center">
                    Drag and dropt the thumbnail or Click to browse
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title" id="title" name="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-4 px-4 py-2 outline-none border-gray-800 rounded border"
              value={inputs.title}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="title" id="title" name="title">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="mt-4 px-4 py-2 outline-none border-gray-800 rounded border"
              rows={4}
              value={inputs.description}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex  mt-4">
            <div className="flex flex-col w-2/6">
              {" "}
              <label htmlFor="audioFile" id="title" name="title">
                Select Audio
              </label>
              <input
                type="file"
                accept=".mp3, .wav, .m4a, .ogg"
                id="audioFile"
                className="mt-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category">Select a Category</label>
              <select
                name="category"
                id="category"
                className="border border-gray-900 rounded outline-none px-4 py-2"
                value={inputs.category}
                onChange={onChangeInputs}
              >
                <option value="">Select a Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Buisness">Buisness</option>
                <option value="Education">Education</option>
                <option value="Hobbies"> Hobbies</option>
                <option value="Government"> Government</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button className="bg-gray-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-gray-800 transition-all duration-300" onClick={handleSubmitPodcast}>
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPodcast;
