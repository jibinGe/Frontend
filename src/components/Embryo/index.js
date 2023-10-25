import React from "react";
import UploadImage from "./uploadImage";
import PatientDetails from "../Embryo/patientDetails";
import { useNavigate } from "react-router-dom";

function AddEmbryo(props) {
  const history = useNavigate();

  return (
    <div>
      <button onClick={() => history(-1)} className="back-button">
        Back
      </button>
      <PatientDetails />
      <UploadImage isPresent={props.isPresent} />
    </div>
  );
}
export default AddEmbryo;
