import React, { useContext, useState } from "react";
import DataContext from "../../controllers/DataContext";
import CloseIcon from "@mui/icons-material/Close";
import { formateDate } from "../../controllers/Essentials";
import { ReportGenerator } from "../../controllers/ReportGenerator";
import { useNavigate } from "react-router-dom";
const styles = {
  display: "flex",
 
  padding: "28px 24px",
  flexDirection: "column",
   
  gap: "24px",
  borderRadius: "12px",
  background: "var(--gradient-light, linear-gradient(360deg, #CEE1FD 0%, #CCF6FF 100%))",
  boxShadow: "0px 2px 40px 0px rgba(34, 121, 245, 0.15)"
};

const PateintDetailPopup = ({ isOpen1, setIsOpen1 }) => {
  const history = useNavigate();
  // const {data,setData}=useContext(DataContext);
  function onClose() {
    setIsOpen1(false);
  }
  // console.log(data);

  let patientInfo = JSON.parse(localStorage.getItem("patient"));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", 
       
      }}
    >
      <div
        className="containpinfodisplay"
        style={{ height: "auto", position: "absolute" , background: "var(--gradient-light, linear-gradient(360deg, #CEE1FD 0%, #CCF6FF 100%))", }}
      >
        <button
          className="close-button"
          style={{ top: 20, right: 20 }}
          onClick={onClose}
        >
          <CloseIcon sx={{ color: "#6C7C93" }} />
        </button>

        <h2 className="txt8">Patient Information</h2>

     

        <div style={styles}>
        <div className="patient-box">
            <span className="patientinfo-label">Patient ID</span>
            <span className="patientinfo-value">{patientInfo[1]}</span>
        </div>

        <div className="patient-box">
            <span className="patientinfo-label">Name</span>
            <span className="patientinfo-value">{patientInfo[2]}</span>
        </div>
        
        <div className="patient-box">
            <span className="patientinfo-label">Date of Birth</span>
            <span className="patientinfo-value">{formateDate(patientInfo[3])}</span>
        </div>

        <div className="patient-box">
            <span className="patientinfo-label">Cycle ID</span>
            <span className="patientinfo-value">{patientInfo[4]}</span>
        </div>

          
        <div className="patient-box">
            <span className="patientinfo-label">Contact Number</span>
            <span className="patientinfo-value">{patientInfo[6]}</span>
        </div>


 
 

          <br></br>
        </div>
      </div>
    </div>
  );
};

export default PateintDetailPopup;
