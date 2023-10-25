import React from "react";
import SuccessIcon from "../../Icons/success-icon.svg";
import "./helper.css";
import CloseIcon from "@mui/icons-material/Close";

function SuccessEmployeeModal({ setIsOpen, setIsEdit }) {
  const onClose = () => {
    setIsOpen(false);
    setIsEdit(false);
  };
  return (
    <div className="success-msg-box">
      <button className="close-button" onClick={onClose}>
        <CloseIcon sx={{ color: "#6C7C93" }} />
      </button>
      <img src={SuccessIcon} alt="successful" width={80} height={80}></img>
      <div className="success-msg">Success!</div>
      <div className="saved-msg">Employee details saved successfully</div>
    </div>
  );
}
export default SuccessEmployeeModal;
