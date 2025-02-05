import "../styles/cards.css";
import flower from "../assets/flower.jpg";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, createPost } from "../slices/postSlice";

const Cards = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.post);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  return (
    <div style={{ textAlign: "center" }}>
      {/* Display async data */}
      <section style={{ marginTop: "20px" }}>
        <h3>Fetched Data:</h3>
        {status === "loading" && <p>Loading data...</p>}
        {status === "failed" && <p>Failed to load data</p>}

        {status === "succeeded" && data && data.length > 0 && (
          <div className="card-collection">
            {data.map((item, index) => (
              <div className="card" key={index}>
                <img src={flower} alt="Card Image" />
                <div className="card-content">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-description">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Cards;
