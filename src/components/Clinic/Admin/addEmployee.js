import React, { useContext, useState,useRef } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from 'react-router-dom';
 
import CloseIcon from "@mui/icons-material/Close";
 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@mui/styles";
import moment from 'moment';
import { fetchJSON,validateJSON } from "../../../controllers/Essentials";
import DataContext from "../../../controllers/DataContext";
import Cookies from "js-cookie";
import SuccessEmployeeModal from "../../helpers/successEmployeeModal";
import Modal from "@mui/material/Modal";

function AddEmployee({setSelectedButton }) {
  const [value, setValue] = React.useState("admin");
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const initialState = { clinicid: "", fullname: "", password:"",email:"",mobile:"",accesslevel:""};
  function onClose() {
    setIsOpen(false);
    
  }
  const date = useRef();
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const { data, setData } = useContext(DataContext);
  // const [patientInfo, setPatientInfo] = React.useState([]);

  const clinic = JSON.parse(localStorage.getItem("clinic"));
 

  const [inputs, setInputs] = useState({
    clinicid: "",
    fullname: "",
    password: "",
    email: "",
    mobile: "",
    accesslevel: "",
  });

  
  React.useEffect(() => {
    if (isOpen) {

     
      
    }
  }, []);
  

  const handleChange = (event) => {
    
   event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setValue(event.target.value);
  };

  const validate = (fieldValues = inputs) => {
    let tempErrors = {...errors};

    if ('fullname' in fieldValues)
      tempErrors.name = fieldValues.fullname ? "" : "This field is required.";

    if ('password' in fieldValues)
      tempErrors.password = fieldValues.password ? "" : "This field is required.";
   

    if ('email' in fieldValues)
      tempErrors.email = (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).test(fieldValues.email) ? "" : "Email is not valid.";

    setErrors({
      ...tempErrors
    });

    if (fieldValues === inputs)
      return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs)
    if (validate()) {
    inputs.clinicid = clinic[0];
    
      fetchJSON("user/create", "POST", inputs).then((data_response) => {
        if (data_response.success == true) {
          setData((prev) => {
            return {
              ...prev,
              PatientInfo: inputs,
            };
          });
         
          setInputs(initialState);
          setIsOpen(true)

        


        } else {
          alert("Something Went Wrong");
        }
      });
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    inputs.full_name = inputs.first_name + " " + inputs.last_name;
    if (validateJSON(inputs) === true) {
      fetchJSON("patient/update", "POST", inputs)
        .then((data_response) => {
          if (data_response.success == true) {
            localStorage.setItem(
              "patient",
              JSON.stringify([
                "id",
                inputs.clinicid,
                inputs.fullname,
                inputs.dob,
                inputs.cycle_id,
                Cookies.get("common_data").split("#")[1],
                inputs.mobile,
              ])
            );
            setIsOpen(false);
           // history("/upload-images");
          } else {
            alert("Something Went Wrong");
          }
        })
        .catch((err) => {
          alert("try again");
        });
    } else {
      alert(validateJSON(inputs));
    }
  };

  return (
    
     <div style={{display:"flex",height:"850px",width:"100%",flexDirection:"column"}}>
    <div><button onClick={()=>setSelectedButton(1)} style={{marginTop:"40px", marginLeft:"2%"}} className='back-button'>Back</button></div>
     
    <div className="container2">
     
      
      <div className="out-box2 " >
        <div className="contain1 " style={{ height: "auto" }}>
          <h2 className="txt8">Add New Employee</h2>
          <div className="in-box" >
         
            <div>
              <label style={{ display: "block" }}>Employee Name</label>
              <input
                className="inpt"
                name="fullname"
                value={inputs.fullname}
                onChange={handleChange}
                type="text"   variant="outlined" fullWidth {...(errors.name && { error: true, helperText: errors.name })}
              />
              <label style={{ display: "block", color: 'red' }}>   {   errors.name } </label>
              
            </div>
            <div>
              <label style={{ display: "block" }}>Password</label>
              <input
                className="inpt"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                type="password"
              />
                <label style={{ display: "block", color: 'red'}} >   {   errors.password } </label>
            </div>
         
            <div>
              <label style={{ display: "block" }}>Email</label>
              <input className="inpt" type="email"     name="email"   value={inputs.email}
                onChange={handleChange} />
            </div>
            <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Contact Number</label>
              <input className="inpt" type="tel"      name="mobile"   value={inputs.mobile}
                onChange={handleChange} defaultValue="" />
            </div>
            <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Account Access</label>
              <FormControl>
                <RadioGroup
                row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="accesslevel"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="Regular"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <button className="btn1" onClick={handleSubmit}>Save & Continue</button>
          </div>
        </div>
      </div>
    </div>
    <Modal open={isOpen}>
                          <SuccessEmployeeModal
                            setIsOpen={setIsOpen}
                            setIsEdit={setIsEdit}
                          />
                        </Modal>
    </div>
  );
}

export default AddEmployee;
