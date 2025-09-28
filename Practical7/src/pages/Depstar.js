import React from "react";
import "./Depstar.css";

function Depstar() {
  return (
    <div className="depstar-container">
      <h1>DEPSTAR - Charotar University of Science and Technology</h1>
      <p className="intro">
        Devang Patel Institute of Advance Technology and Research (DEPSTAR) 
        is a premier engineering institute at CHARUSAT, focusing on 
        cutting-edge education, research, and industry collaboration.
      </p>

      <h2>Programs Offered</h2>
      <div className="program-grid">
        <div className="program-card">B.Tech in Computer Engineering</div>
        <div className="program-card">B.Tech in Information Technology</div>
        <div className="program-card">B.Tech in Artificial Intelligence & ML</div>
        <div className="program-card">B.Tech in Data Science</div>
        <div className="program-card">M.Tech (CS / AI / Data Science)</div>
        <div className="program-card">Ph.D. in Computer/IT</div>
      </div>

      <h2>Facilities</h2>
      <ul className="facilities-list">
        <li>Modern computer labs with high-end systems</li>
        <li>Research centers for AI, ML, and Data Science</li>
        <li>Wi-Fi enabled smart classrooms</li>
        <li>Collaborations with leading IT companies</li>
        <li>Dedicated incubation center for startups</li>
      </ul>

    
    </div>
  );
}

export default Depstar;
