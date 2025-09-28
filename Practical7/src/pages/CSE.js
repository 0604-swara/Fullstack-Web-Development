import React from "react";
//import "./CSE.css";

function CSE() {
  return (
    <div className="cse-container">
      <h1>Computer Science & Engineering (CSE)</h1>
      <p>
        The CSE department at DEPSTAR offers a strong academic curriculum, 
        modern labs, and excellent placement opportunities.
      </p>

      <div className="cse-section">
        <h3>Academic Strengths</h3>
        <ul>
          <li>Updated curriculum with industry focus</li>
          <li>Experienced faculty members</li>
          <li>Practical learning through projects</li>
        </ul>
      </div>

      <div className="cse-section">
        <h3>Placements</h3>
        <ul>
          <li>Top recruiters: Microsoft, TCS, Infosys</li>
          <li>Strong alumni network</li>
        </ul>
      </div>

      <div className="cse-section">
        <h3>Labs</h3>
        <ul>
          <li>Modern computer labs with updated software</li>
          <li>Hands-on coding and research facilities</li>
        </ul>
      </div>

  
    </div>
  );
}

export default CSE;
