import React from "react";
import "./index.css";
import Embryo from "../../Images/embryo.png";
import CloseIcon from '@mui/icons-material/Close';

function Guidelines({setIsOpenGuidline}) {

  return (
    <div className="popup">
          <div className="guidelines-heading">
            <div className="guidelines-heading-text">User Guidelines</div>
            <button className="close-guidelines" onClick={()=> setIsOpenGuidline(false)}>
              <CloseIcon sx={{color:"#ffffff"}} />
            </button>{" "}
          </div>
          <div className="guidelines">
            <ul className="guidelines-points">
              <li>
              Only Day 5 Embryos can be uploaded. 
              </li>
              <li>No collapsed embyos can be uploaded.</li>
              <li>
              Embryo part on the images should not be cropped.
              </li>
              <li>
              Only single embryo images with center focused can be uploaded.
              </li>
              <li>
              Embryo images need to be clear with good resolution(min 200X200).
              </li>
            </ul>
          </div>
          <div className="image-gallery">
            <div className="row">
              <img src={Embryo} alt="embryo" />
              <img src={Embryo} alt="embryo" />
              <img src={Embryo} alt="embryo" />
            </div>
            <div className="row">
              <img src={Embryo} alt="embryo" />
              <img src={Embryo} alt="embryo" />
              <img src={Embryo} alt="embryo" />
            </div>
          </div>
    </div>
  );
}
export default Guidelines;
