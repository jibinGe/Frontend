import React from "react";
import logo from "../../../Images/logo.png";

function About() {
  return (
    <div className="container1">
    <div className="about-section">
      <div className="about">
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: 10 }}>
            <img width={60} height={60} src={logo} alt="" />
          </div>
          <div>
            <div>
              <span
                style={{
                  padding: "10px",
                  fontSize: "30px",
                  textDecoration: "bold",
                  fontWeight: 700,
                  paddingRight: "10px",
                }}
              >
                Genesys
              </span>{" "}
              <span style={{ fontSize: "22px", fontWeight: 500 }}>Miracle</span>
            </div>
            <div style={{ paddingLeft: 10, fontSize: 14 }}>
              AI ENHANCED EMBRYO SELECTION
            </div>
          </div>
        </div>
        <div className="about-details">
          Genesys Miracle is an AI tool for predicting Embryo viability for a
          successful pregnancy. The tool analyses the patient Embryos using AI,
          Image Processing and Machine learning to predict the best embryos
          which might most likely lead to a successful pregnancy and live birth.
        </div>
        <div className="version">Genesys Miracle Ver:2.12</div>
      </div>
    </div>
    </div>
  );
}
export default About;
