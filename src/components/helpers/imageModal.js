import React from "react";
import "./helper.css";
import CloseIcon from "@mui/icons-material/Close";
import EmbryoImage from "../../Images/image-modal.png";

function ImageModal({ setimgIsOpen,Image}) {
  const onClose = () => {
    setimgIsOpen(false);
  };
  return (
    <div className="image-box">
      <button className="close-button" style={{top:20, right:20}} onClick={onClose}>
        <CloseIcon sx={{ color: "#6C7C93" }} />
      </button>
        <img   src={Image} alt=""></img>
    </div>
  );
}
export default ImageModal;
