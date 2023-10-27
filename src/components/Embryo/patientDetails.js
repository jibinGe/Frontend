import React, { useState, useContext } from "react";
import "./index.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { IconButton } from "@mui/material";
import Edit from "../../Icons/Edit.png";
import Frame from "../../Icons/Frame.png";
//import { ReactComponent as Edit } from '../../Icons/edit.png';
import AddPatient from "../Clinic/Admin/addPatient";
import Modal from "@mui/material/Modal";
import DataContext from "../../controllers/DataContext";
import { calculate_age, fetchJSON } from "../../controllers/Essentials";
import PatientForm from "../Common/PateintForm";
import PateintDetailPopup from "../Common/PateintDetailPopup";
// import { formateDate } from "../../components/Common/TableData";
import { formateDate } from "../../controllers/Essentials";
import Cookies from "js-cookie";

function PatientDetails() {
  const { data, setData } = useContext(DataContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentPatient, setCurrentPatient] = useState([]);

  React.useEffect(() => {
    setCurrentPatient(JSON.parse(localStorage.getItem("patient")));
    console.log(currentPatient);

    // fetchJSON("patient/" + patient_id, "GET", "");
    // fetchJSON("patient/get", "GET", "").then((data) => {
    //   for (let patient of data?.patients) {
    //     if (patient[1] == patient_id) {
    //       setCurrentPatient(patient);
    //     }
    //   }
    // });
  }, [isOpen]);

  function removePrefix(data) {
    const match = data.match(/\d+_(.+)/);
    return match ? match[1] : data;
  }

  return (
    currentPatient && (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 12,
            background: "#FFFFFF",
            borderRadius: "50%",
            border: "3px solid #00D2FE",
            height: "32px",
            width: "32px",
            paddingLeft: "6.8px",
            cursor: "pointer"
          }}
          onClick={() => setIsOpen1(!isOpen1)}
        >
          <img
            src={Frame}
            style={{ color: "#2279F5", height: "16px", width: "16px" }}
          />
        </div>
        <Modal open={isOpen1}>
          <PateintDetailPopup setIsOpen1={setIsOpen1} isOpen1={isOpen1} />
        </Modal>
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 48,
            background: "#FFFFFF",
            borderRadius: "50%",
            cursor: "pointer"
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={Edit} style={{ color: "#2279F5" }} />
        </div>
        <Modal open={isOpen}>
          <PatientForm setIsOpen={setIsOpen} isOpen={isOpen} />
        </Modal>
        <div className="d-container">
          <div className="details-container">
            <div className="properties">
              <span className="field">Patient ID</span>
              <span className="value">{currentPatient[1] ? removePrefix(currentPatient[1]) : ''}</span>
          </div>
            <div className="properties">
              <span className="field">First Name</span>
              <span className="value">{currentPatient[2]?.split(" ")[0]}</span>
            </div>
            <div className="properties">
              <span className="field">Last Name</span>
              <span className="value">{currentPatient[2]?.split(" ")[1]}</span>
            </div>
            <div className="properties">
              <span className="field">Date of Birth</span>
              <span className="value" style={{}}>
                {formateDate(currentPatient[3])}
              </span>
            </div>
            <div className="properties">
              <span className="field" style={{}}>
                Age
              </span>
              <span className="value" style={{}}>
                {calculate_age(new Date(currentPatient[3]))}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default PatientDetails;
