import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fetchJSON, validateJSON } from "../../../controllers/Essentials";
import DataContext from "../../../controllers/DataContext";
import PatientForm from "../../Common/PateintForm";
const useStyles = makeStyles({
  datePicker: {
    // Customize the border radius
    height: "42px", // Customize the height
    "& .MuiFormControl-root": {
      // Customize the input padding if needed
      borderRadius: "22px",
    },
  },
});

const Date = styled(DatePicker)({
  borderRadius: "12px",
  height: "45px",
  display: "flex",
  justifyContent: "center",
  border: "1px solid #C4CBD4",
  padding: "13px",
  "& .MuiFormControl-root": {
    // Customize the input padding if needed
    border: "none",
    //  [`& Fieldset`]:{

    //    borderRadius:"22px"
    //  }
  },
  "& .MuiInputBase-root": {
    border: "none",
  },
});
function AddPatient() {
  //const classes = useStyles();
  //const date = useRef();

  return (
    <div className="container1">
      <div className="out-box2 ">
        <div className="contain1 ">
          <PatientForm />
        </div>
      </div>
    </div>
  );
}
export default AddPatient;
