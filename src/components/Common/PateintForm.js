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

 

const Date = styled(DatePicker)({
  borderRadius: "12px",
  height:"45px",
  display:"flex",
  justifyContent:"center",
  border:"1px solid #C4CBD4",
  padding:"13px",
  '& .MuiFormControl-root': {
    // Customize the input padding if needed
    border: "none",
    //  [`& Fieldset`]:{

    //    borderRadius:"22px"
    //  }
  },
  '& .MuiInputBase-root': {
    border: "none"
  }
});

const PatientForm = ({ isOpen, setIsOpen }) => {
  function onClose() {
    setIsOpen(false);
  }
  const date = useRef();
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const history = useNavigate();
  const { data, setData } = useContext(DataContext);
  // const [patientInfo, setPatientInfo] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const patientInfo = JSON.parse(localStorage.getItem("patient"));
 

  const [inputs, setInputs] = useState({
    patient_id: "",
    first_name: "",
    last_name: "",
    dob: "",
    mobile: "",
    cycle_id: "",
  });

  
  React.useEffect(() => {
    if (isOpen) {

      console.log(patientInfo[3]);
      setInputs({
        patient_id: patientInfo[1],
        first_name: patientInfo[2]?.split(" ")[0],
        last_name: patientInfo[2]?.split(" ")[1],
        dob: patientInfo[3] ?  moment(patientInfo[3]).format('YYYY-MM-DD')
        : "",
        mobile: patientInfo[6],
        cycle_id: patientInfo[4],
      });
      
    }
  }, []);
  

  const handleChange = (event) => {
    
   event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === "patient_id") {
      setErrors(prevErrors => ({
          ...prevErrors,
          patient_id: null
      }));
  }
  if (name === "first_name") {
    setErrors(prevErrors => ({
        ...prevErrors,
        first_name: null
    }));
}
if (name === "last_name") {
  setErrors(prevErrors => ({
      ...prevErrors,
      last_name: null
  }));
}

if (name === "cycle_id") {
  setErrors(prevErrors => ({
      ...prevErrors,
      cycle_id: null
  }));
}
if (name === "dob") {
  setErrors(prevErrors => ({
      ...prevErrors,
      dob: null
  }));
}
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleChange1 = () => {
    console.log(date.current.name)

    //date.current= date.current.value;
    setInputs((values) => ({ ...values, dob: date.current.value }));
     //setInputs((values) => ({ ...values, dob: date }));
     
  };

  const handleDateChange = (date) => {
    
      setErrors(prevErrors => ({
          ...prevErrors,
          dob: null
      }));
     

    
    const newValue = date.format("YYYY-MM-DD");
    console.log(newValue)
    setInputs((values) => ({ ...values, dob: newValue  }));
   
  };
  // const handleChange = (event) => {
  //   event.preventDefault();
  //   const name = event.target.name;
  //   const value = event.target.value;

  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const validateForm = () => {
    let formErrors = {};
  
    // Check each field for errors
    if (!inputs.patient_id) formErrors.patient_id = 'Patient ID is required';
    if (!inputs.first_name) formErrors.first_name = 'First name is required';
    if (!inputs.last_name) formErrors.last_name = 'Last name is required';
    if (!inputs.dob) formErrors.dob = 'Date of Birth is required';
    if (!inputs.cycle_id) formErrors.cycle_id = 'Cycle ID is required';
  
    // If errors were found, update the state and return false
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return false;
    }
  
    // If no errors were found, clear the state and return true
    setErrors({});
    return true;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    console.log(inputs)
    inputs.full_name = inputs.first_name + " " + inputs.last_name;
    if (validateJSON(inputs) === true) {
      fetchJSON("patient/create", "POST", inputs).then((data_response) => {
        if (data_response.success == true) {
          setData((prev) => {
            return {
              ...prev,
              PatientInfo: inputs,
            };
          });
          localStorage.setItem(
            "patient",
            JSON.stringify([
              data_response.id[0],
              inputs.patient_id,
              inputs.full_name,
              inputs.dob,
              inputs.cycle_id,
              Cookies.get("common_data").split("#")[1],
              inputs.mobile,
            ])
          );
          // [100139,"567890","35ffghgfuihojp[ fdghjlk","Tue, 12 Dec 2000 00:00:00 GMT","65","jibin@gmail.com","",null]
          // console.log("yes");
          //TODO: change to primary key
          // Cookies.set("patient", inputs.patient_id, { expires: 1 });

          history("/embryo");
        } else {
          setErrorMsg(data_response.message);
        }
      });
    } else {
      alert(validateJSON(inputs));
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
                inputs.patient_id,
                inputs.full_name,
                inputs.dob,
                inputs.cycle_id,
                Cookies.get("common_data").split("#")[1],
                inputs.mobile,
              ])
            );
            setIsOpen(false);
           // history("/upload-images");
          } else {
            setErrorMsg(data_response.message);
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
    <>
    
     
      {!isOpen ? (
        <div
          className="in-box"
          style={{ background: "#FFFFFF", width: isOpen ? "40%" : "" }}
        >
         
        
          <div>
            <label style={{ display: "block" }}>Patient ID</label>
            <input
              className="inpt"
              name="patient_id"
              value={data.patient_id}
              onChange={handleChange}
              required
            />
             {errors.patient_id && <p style={{ color: 'red' }}>{errors.patient_id}</p>}
          </div>
          <div className="inpt-box">
            <div style={{ marginRight: "20px" }}>
              <label style={{ display: "block" }}>First Name</label>
              <input
                className="inpt1"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                type="text"
              />
                {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
            </div>
            <div>
              <label style={{ display: "block" }}>Last Name</label>
              <input
                className="inpt1"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                type="text"
              />
                 {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
            </div>
          </div>

          <div style={{ marginTop: 13 }}>
              <label style={{ display: "block" }}>Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Date  closeOnSelect={true} slotProps={{
                  textField: {
                    variant: 'standard', InputProps: { 
                      disableUnderline: true,
                    }
                  }
                }}
                  sx={{ width: "100%" }} ref={date} inputFormat="dd/MM/yyyy" format="DD-MM-YYYY" name="dob" value={date} onChange={(date) => handleDateChange(date)}  />
              </LocalizationProvider> 
             

              {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
            </div>

          {/* <div style={{ marginTop: 13 }}>
            <label style={{ display: "block" }}>Date of Birth</label>
            <input
              className="inpt"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              type="date"
            />
          </div> */}

          
          <div style={{ marginTop: 13 }}>
            <label style={{ display: "block" }}>Cycle ID</label>
            <input
              className="inpt"
              name="cycle_id"
              value={data.cycle_id}
              onChange={handleChange}
              // name="cars"
            />
             {errors.cycle_id && <p style={{ color: 'red' }}>{errors.cycle_id}</p>}
          </div>
          <div style={{ marginTop: 13 }}>
            <label style={{ display: "block" }}>Contact Number</label>
            <input
              className="inpt"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              type="tel"
              placeholder="optional"
            />
          </div>
          <br></br>
          {errorMsg && <p className="error" style={{ color: 'red' }}>{errorMsg}</p>}
          <button onClick={handleSubmit} className="btn1">
            Save & Continue
          </button>
          <br></br>
            <br></br>
            <br></br>
        </div>
      ) : (
        
        <div
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <div
                    className="containpinfo"
                    style={{ height: "auto", position: "absolute" }}
                  >
                    <button
                      className="close-button"
                      style={{ top: 20, right: 20 }}
                      onClick={onClose}
                    >
                      <CloseIcon sx={{ color: "#6C7C93" }} />
                    </button>
                    
            <h2 className="txt8">Edit Patient</h2>

            <div style={{ marginLeft: isOpen ? "8%" : "" }}>
              <label style={{ display: "block" }}>Patient ID</label>
              <input
                className="inpt"
                style={{ width: isOpen ? "90%" : "100%" }}
                name="patient_id"
                value={inputs.patient_id}
                onChange={handleChange}
                disabled={true}
              />
            </div>
           
            <div className="inpt-box">
              <div style={{ marginRight: "20px" }}>
                <label style={{ display: "block" }}>First Name</label>
                <input
                  className="inpt1"
                  style={{ width: isOpen ? "200px" : "216px" }}
                  name="first_name"
                  value={inputs.first_name}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <label style={{ display: "block" }}>Last Name</label>
                <input
                  className="inpt1"
                  style={{ width: isOpen ? "206px" : "216px" }}
                  name="last_name"
                  value={inputs.last_name}
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </div>
             

            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
              <label style={{ display: "block" }}>Date of Birth</label>
           

              <input
                className="inpt"
                style={{ width: isOpen ? "90%" : "100%" }}
                name="dob"
                value={inputs.dob}
                onChange={handleChange}
                type="date"
              />
            </div>

            <div style={{ marginTop: 13, marginLeft: isOpen ? "8%" : "" }}>
              <label style={{ display: "block" }}>Cycle ID</label>
              <input
                className="inpt"
                style={{ width: isOpen ? "90%" : "100%" }}
                name="cycle_id"
                value={inputs.cycle_id}
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
            <br></br>
            <br></br>
            <br></br>
          </div>
          {errorMsg && <p className="error" style={{ color: 'red' }}>{errorMsg}</p>}
        </div>
      )}
    </>
  );
};

export default PatientForm;
