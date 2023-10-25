import React, { useContext, useState,useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@mui/styles";
import moment from 'moment';
import {
  fetchJSON,
  formateDate,
  validateJSON,
} from "../../controllers/Essentials";
import DataContext from "../../controllers/DataContext";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  datePicker: {
    // Customize the border radius
    height: '42px', // Customize the height
    '& .MuiFormControl-root': {
      // Customize the input padding if needed
      borderRadius: '22px',
    },
  },
});

 
const EmployeeForm = ({ isOpen, setIsOpen }) => {
  function onClose() {
    setIsOpen(false);
  }
  const date = useRef();
  
  const history = useNavigate();
  const { data, setData } = useContext(DataContext);
  // const [employeeinfo, setemployeeinfo] = React.useState([]);

  const employeeinfo = JSON.parse(localStorage.getItem("employee"));
 

  const [inputs, setInputs] = useState({
    user_id: "",
    fullname: "",
    password: "",
    mobile: "",
    email: "",
  });

  
  React.useEffect(() => {
    if (isOpen) {

      console.log(employeeinfo);
      setInputs({
        user_id: employeeinfo.id,
        clinicid: employeeinfo.clinicid,
        fullname: employeeinfo.fullname,
        password: employeeinfo.password,
        email: employeeinfo.email,
        mobile: employeeinfo.mobile,
        accesslevel: employeeinfo.accesslevel,
      });
      
    }
  }, []);
  

  const handleChange = (event) => {
    
   event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChange1 = () => {
    console.log(date.current.name)
    //date.current= date.current.value;
    setInputs((values) => ({ ...values, dob: date.current.value }));
     //setInputs((values) => ({ ...values, dob: date }));
     
  };

  const handleDateChange = (date) => {
    const newValue = date.format("YYYY-MM-DD");
    console.log(newValue)
    setInputs((values) => ({ ...values, dob: newValue  }));
   
  };
  
  

  const handleEdit = async (event) => {
    event.preventDefault();
  
    
      fetchJSON("user/update", "POST", inputs)
        .then((data_response) => {
          if (data_response.success == true) {
            
            setIsOpen(false);
           // history("/upload-images");
          } else {
            alert("Something Went Wrong");
          }
        })
        .catch((err) => {
          alert("try again");
        });
   
  };

  return (
    <>
    
     
      {!isOpen ? (
         <div></div>
      ) : (
        
        <div style={{ position: "relative" }}>
             <button
        className="close-button"
        style={{ top: 10, right: 20 }}
        onClick={onClose}
      >
        <CloseIcon sx={{ color: "#6C7C93" }} />
      </button>
          <div
            className="in-box"
            style={{
              background: "#FFFFFF",
             
             
              top: "30px",
              left: "28%",
              borderRadius: "10px",
              height: "510px",
            }}
          >
            <h2 className="txt8">Edit Employee</h2>

         
            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
             
                <label style={{ display: "block" }}>Name</label>
                <input
                  className="inpt1"
                  style={{ width: isOpen ? "90%" : "100%" }}
                  name="fullname"
                  value={inputs.fullname}
                  onChange={handleChange}
                  type="text"
                />
             
               
            </div>
           
            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
             
                <label style={{ display: "block" }}>Password</label>
                <input
                  className="inpt1"
                  style={{ width: isOpen ? "90%" : "100%" }}
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  type="password"
                />
             
               
            </div>
           
            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
              <label style={{ display: "block" }}>Email</label>
              <input
                className="inpt"
                style={{ width: isOpen ? "90%" : "100%" }}
                name="email"
                value={inputs.email}
                onChange={handleChange}
                // name="cars"
              />
            </div>
            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
              <label style={{ display: "block" }}>Contact Number</label>
              <input
                className="inpt"
                style={{
                  width: isOpen ? "90%" : "100%",
                  margin: isOpen ? "0px auto" : "",
                }}
                name="mobile"
                value={inputs.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="optional"
              />
            </div>
            <button
              onClick={handleEdit}
              className="btn1"
              style={{
                width: isOpen ? "50%" : "100%",
                marginLeft: isOpen ? "25%" : "",
              }}
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeForm;
