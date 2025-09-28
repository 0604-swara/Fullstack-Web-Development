import React from "react";
import "./Charusat.css";

function Charusat() {
  return (
    <div className="charusat-container">
      <h2>Colleges under CHARUSAT</h2>
      <div className="college-grid">
        <div className="college-box">
          <h3>CSPIT</h3>
          <p>CSPIT focuses on engineering education and research, offering programs in Computer, IT, Civil, Mechanical, and more.</p>
        </div>
        <div className="college-box">
          <h3>DEPSTAR</h3>
          <p>DEPSTAR is known for its advanced engineering programs with modern labs and industry collaboration.</p>
        </div>
        <div className="college-box">
          <h3>IIIM</h3>
          <p>IIIM provides programs in management and computer applications, preparing students for the corporate world.</p>
        </div>
        <div className="college-box">
          <h3>RPCP</h3>
          <p>RPCP is a leading pharmacy college providing education in pharmaceutical sciences and research.</p>
        </div>
        <div className="college-box">
          <h3>CMPICA</h3>
          <p>CMPICA offers programs in BCA, computer applications, and data analytics with practical exposure.</p>
        </div>
        <div className="college-box">
          <h3>PDPiAS</h3>
          <p>PDPiAS focuses on physiotherapy, offering quality healthcare education and clinical practice.</p>
        </div>
      </div>
    </div>
  );
}

export default Charusat;
