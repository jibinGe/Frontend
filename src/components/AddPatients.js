import React from "react";
import Accounts from "../Icons/accounts.png";
import AddPatient from "../Icons/add-new-patients.png";
import ViewPatient from "../Icons/view-patients.png";
import { useNavigate } from "react-router-dom";

const AddPatients = () => {
  const history = useNavigate();
  return (
    <div className="container3">
      <div className="out-box1 ">
        <div className="box1 start">
          <div className="image ">
            <img className="img-bg" alt="" src={AddPatient} />
          </div>
          <p>Add New Patients</p>
        </div>
        <div className="box1 mid">
          <div className="image">
            <img src={ViewPatient} alt="" />
          </div>
          <p className="box-txt">View Patients</p>
        </div>
        <div className="box1">
          <div className="image">
            <img src={Accounts} alt="" />
          </div>
          <p className="box-txt">Accounts</p>
        </div>
      </div>
      <div className="out-box2 ">
        <div className="contain1 ">
          <h2 className="txt8">Add New Patient</h2>
          <div className="in-box">
            <div>
              <label style={{ display: "block" }}>Patient ID</label>
              <input className="inpt" type="text"  />
            </div>
            <div className="inpt-box">
              <div style={{marginRight:"20px"}}>
                <label style={{ display: "block" }}>First Name</label>
                <input className="inpt1" type="text"  />
              </div>
              <div>
                <label style={{ display: "block" }}>Last Name</label>
                <input className="inpt1" type="text" />
              </div>
            </div>
            <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Date of Birth</label>
              <input className="inpt" type="date"  />
            </div>
            <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Cycle ID</label>
                <select  className="inpt" name="cars">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
            </div>
            <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Contact Number</label>
              <input className="inpt" type="tel" placeholder="optional" />
            </div>
            <button onClick={() => history("/embryo")} className="btn1">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatients;
