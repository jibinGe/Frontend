import React, { useState, useContext } from "react";
import { UserContext } from "../../controllers/UserContext";
import { Link } from "react-router-dom";
import Logo from "../../Images/logo1.png";
import Logo1 from "../../Images/Genesys Miracle Logo_White.svg";
import Profile from "../../Images/profile.png";
import WomenCare from "../../Icons/womenCare.png";
import Help from "../../Icons/help.png";
import "./header.css";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DataContext from "../../controllers/DataContext";
import {
  fetchJSON,
  formateDate,
  validateJSON,
} from "../../controllers/Essentials";
 
const Header = () => {

   
  const [problem_title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const validateForm = () => {
    let formErrors = {};
    if(!problem_title) formErrors.problem_title = "Title is required";
    if(!description) formErrors.description = "Description is required";
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData } = useContext(DataContext);
  const onClose = () => {
    setIsOpen(false);
  };
 

  const handleNavigation = () => {
    history("/welcome");
};

  
  const handleLogout = async () => {
    await fetch("https://api2.genesysailabs.com/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data_response) => {
        if (data_response.logout == true) {
          Cookies.remove("access_token");
          Cookies.remove("common_data");
          setData((prev) => {
            return {
              ...prev,
              LoginInfo: {},
            };
          });
          console.log(data);
          history("/");
        } else {
          alert("Invalid error");
        }
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validateForm()){

      
      fetchJSON("report_a_problem", "POST",{
        "problem_title": problem_title,
        "description": description
      })
        .then((data_response) => {
          if (data_response.success == true) {
            
            setIsOpen(false);
           // history("/upload-images");
          } else {
            setErrorMsg(data_response.message);
            setTitle("");
            setDescription("");
          }
        })
        .catch((err) => {
          alert("try again");
        });
   
 
    }
  };
  return ( 
    <>
      <nav className="navbar3">
        <div className="col-12 col-md-3 ">
          <div className="navbar1 ">
            <div>
              <img src={Logo1} alt="Genesys" />
            </div>
          </div>
        </div>
        {Cookies.get("common_data") && (
          <div className="col-12 col-md-9 ">
            <div className="navbar2 ">
              <div className="ml-2 dropdown">
                <a
                  to="/welcome"
                  className="btn  text-white mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleNavigation}
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={WomenCare}
                      alt="women care"
                      className="rounded-circle"
                    />
                  </figure>
                  <span>{Cookies.get("common_data")?.split("#")[0]}</span>
                </a>
              </div>
              {/* <div className="" onClick={handleLogout}>
                <a
                  // to="#"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  // id="dropDownMenuButton"
                  // data-toggle="dropdown"
                  // aria-haspopup="true"
                  // aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={Profile}
                      alt="profile"
                      className="rounded-circle"
                    />
                  </figure>
                  <span>{data.LoginInfo.username.split("@")[0]}</span>
                </a>
              </div> */}
              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <div className="ml-4 dropdown d-inline">
                  <Link
                    to="#!"
                    className="btn dropdown-toggle text-white mr-4"
                    type="button"
                    id="dropDownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <figure className="avatar avatar-nav">
                      <img
                        src={Profile}
                        alt="profile"
                        className="rounded-circle"
                      />
                    </figure>
                    <span>{Cookies.get("common_data")?.split("#")[1]}</span>
                  </Link>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropDownMenuButton"
                  >
                    {/* {data && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )} */}
                    <Link
                      className="dropdown-item text-danger"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
              <div onClick={() => setIsOpen(true)} style={{cursor: 'pointer'}}>
                <img src={Help} alt="help" />
              </div>
              <Modal open={isOpen}>
                <div
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <div
                    className="contain1 "
                    style={{ height: "auto", position: "absolute" }}
                  >
                    <button
                      className="close-button"
                      style={{ top: 20, right: 20 }}
                      onClick={onClose}
                    >
                      <CloseIcon sx={{ color: "#6C7C93" }} />
                    </button>

                    <h2 className="txt8">Report a Problem</h2>
          <div className="help-box " >
          <form onSubmit={handleSubmit}>
            <div style={{width:"100%"}}>
              <label style={{ display: "block" }}>Please describe the problem in detail we will get back to you as soon as we can</label>
            </div>
            <div style={{width:"100%"}}>
              <label style={{ display: "block" }}>Problem Title</label>
              <input
                    className="inpt"
                    type="text"
                    value={problem_title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  {errors.problem_title && <p style={{ color: 'red' }}>{errors.problem_title}</p>}
            </div>
            <div style={{ marginTop: 13, width:"100%" }}>
              <label style={{ display: "block" }}>Description</label>
              <textarea
                    rows={4}
                    cols={50}
                    className="inpt-text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
            </div>
            {errorMsg && <p className="error" style={{ color: 'red' }}>{errorMsg}</p>}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 13 }}>
    <button type="submit" className="btn-help">Submit</button>
</div>
            </form>
          </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
