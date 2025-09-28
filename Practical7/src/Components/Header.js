import React from "react";
import "./Header.css";

function Header({ toggleSidebar }) {
  return (
    <header className="main-header">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <span>CHARUSAT Portal</span>
    </header>
  );
}

export default Header;
