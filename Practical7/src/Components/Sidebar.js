import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/Charusat">CHARUSAT</NavLink></li>
        <li><NavLink to="/Depstar">DEPSTAR</NavLink></li>
        <li><NavLink to="/CSE">CSE</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;
