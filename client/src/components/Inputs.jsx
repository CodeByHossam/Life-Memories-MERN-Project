import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../slices/postSlice";
import "../styles/inputs.css";

function Inputs() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    // file: "" // Uncomment this if you plan to handle files
  });

  const dispatch = useDispatch(); // Initialize dispatch

  function handleFileInput(e) {
    // setPostData({ ...postData, file: e.target.files[0] }); // Uncomment if you plan to handle file
  }

  function handleTitleInput(e) {
    setPostData({ ...postData, title: e.target.value });
  }

  function handleContentInput(e) {
    setPostData({ ...postData, content: e.target.value });
  }

  function handleSubmit() {
    dispatch(createPost(postData)); // Fixed the typo and dispatched correctly
  }

  return (
    <div id="inputs">
      <h1>inputs</h1>
      <input
        value={postData.title}
        type="text"
        className="text-inputs"
        onChange={handleTitleInput}
        placeholder="Enter Title"
      />
      <input
        value={postData.content}
        type="text"
        className="text-inputs"
        onChange={handleContentInput}
        placeholder="Enter Content"
      />

      {/* Uncomment the file input if handling file uploads */}
      {/* <input
        type="file"
        className="file-inputs"
        onChange={handleFileInput}
      /> */}

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Inputs;
