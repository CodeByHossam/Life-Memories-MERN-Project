import React, { useEffect } from "react";
import "../styles/inputs.css";

import { useState } from "react";

function Inputs() {
  const [file, setFile] = useState(null);

  function handleFileInput(e) {
    console.log(e.target.files[0]);
  }

  function handleTitleInput(e) {
    console.log(e.target.value);
  }
  function handleContentInput(e) {
    console.log(e.target.value);
  }

  useEffect(() => {
    console.log(file);
  }, [file]);
  return (
    <div id="inputs">
      <h1>inputs</h1>
      <input
        type="text"
        className="text-inputs"
        onChange={(e) => handleTitleInput(e)}
      />
      <input
        type="text"
        className="text-inputs"
        onChange={(e) => handleContentInput(e)}
      />

      <input
        type="file"
        className="file-inputs"
        onChange={(e) => handleFileInput(e)}
      />
    </div>
  );
}

export default Inputs;
