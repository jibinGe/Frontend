import React from "react";
import Accounts from "../Icons/accounts.png";
import AddPatients from "../Icons/add-new-patients.png";
import ViewPatients from "../Icons/view-patients.png";
import { useNavigate } from "react-router-dom";
import Logo from "../Images/logo1.png";
import Logo1 from "../Images/Genesys Miracle Logo_White.svg";
const Welcome = () => {
  const history = useNavigate();
 
  const handleClick = (buttonid) => {
    history('/sidebar', { state: { variable: buttonid } });
  };

  return (
    
    <div className="out-box col-12 col-md-6" style={{backgroundRepeat:"no-repeat",}}>
      
      <div className="contain " >
        <div className="txt-container">
          <div className="txts">
            <h4 className="txt7">WELCOME </h4>
            <div>
            <img src={Logo1} alt="Genesys" />
          </div>
          </div>
        </div>
        <div className="box-container" >
        <div className="box" onClick={() => handleClick(3)}>
            <div className="image">
              <img src={AddPatients} alt='add patient' />
            </div>
            <p className="box-txt">Add New Patients</p>
          </div>
          <div className="box" onClick={() => handleClick(4)}>
            <div className="image">
              <img src={ViewPatients} alt="view-patient" />
            </div>
            <p className="box-txt">View Patients</p>
          </div>
          <div className="box" onClick={() => handleClick(6)}>
            <div className="image">
              <img src={Accounts} alt= "accounts" />
            </div>
            <p className="box-txt">Accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
