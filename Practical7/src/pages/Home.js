import React from "react";
import logo from "../assets/logo.jpeg";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={logo} alt="CHARUSAT Logo" className="home-logo" />
        <h1>Welcome to CHARUSAT</h1>
        <p>
          Empowering education and innovation for a brighter future.
        </p>
        <p>
          Explore our colleges, programs, and cutting-edge research opportunities.
        </p>
      </div>
    </div>
  );
}

export default Home;

