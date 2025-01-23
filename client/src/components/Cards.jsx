import React from 'react'
import "../styles/cards.css"
import flower from "../assets/flower.jpg"


function Cards() {
  return (
    <div>
    <div className="card">
    <img src={flower} alt="Card Image" />
    <div className="card-content">
            <h2 className="card-title">Card Title</h2>
            <p className="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
    </div>
    </div>
  )
}

export default Cards
