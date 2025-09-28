import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Home from "./pages/Home";
import Charusat from "./pages/Charusat";
import Depstar from "./pages/Depstar";
import CSE from "./pages/CSE";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* Pass toggle function to Header */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="app-container">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main content */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Charusat" element={<Charusat />} />
            <Route path="/Depstar" element={<Depstar />} />
            <Route path="/CSE" element={<CSE />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
