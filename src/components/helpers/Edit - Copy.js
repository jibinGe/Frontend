import React, { useState,useEffect } from "react";
import Save from "../../Icons/Save1.png";
//import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import EmbryoScoreBar from "./embryoViabilityScoreBar";
import { IconButton ,styled} from "@mui/material";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SuccessModal from "./successModal";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import "../../App.css";
import {
  fetchJSON,
  formateDate,
  validateJSON,
} from "../../controllers/Essentials";
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from "@mui/styles";
//const theme = createMuiTheme();
const useStyles = makeStyles({
  datePicker: {
     // Customize the border radius
    height: '45px', // Customize the height
    '& .MuiOutlinedInput-input': {
      padding: '10px', // Customize the input padding if needed
      borderRadius: '22px',
    },
  },
});

const Date = styled(DatePicker)({
  width:"100.25",
  borderRadius: "12px",
  height:"45px",
  display:"flex",
  justifyContent:"center",
  border:"1px solid #C4CBD4",
  padding:"13px",
  
});
const Edit = (props,{
  embryoNumber,
  setEmbryoNumber,
  embryoName,
  setEmbryoName,
  setIsEdit,
  setIsEdited,
  setImageStatus,
  border,
  background,
  imageStatus,
  score,
  url,
  filename,
  embryo_age,
  cycle_id,
  scan_date,
  collection_date,
  transfer_date,
  pregnancy,
  live_birth,
  clinical_notes,
  embryo_status,
  embryo_link,
  patient_id,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [embryoInfo, setEmbryoInfo] = useState([]);
  const [embryodata, setEmbryodata] = useState([]);

  //const [inputModified, setInputModified] = useState(false);
  const [select, setSelect] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [selectedDate, setSelectedDate] = useState(null);
  const classes = useStyles();
  const [dataArray, setDataArray] = useState([]);
  //const [embryoNumber, setEmbryoNumber] = useState(props.embryo_number);
 // const [embryoName, setEmbryoName] = useState(props.embryo_name);
  //const [clinicNotes, setclinicNotes] = useState(props.clinical_notes);
  const [inputValues, setInputValues] = useState({
    embryoNumber: { value: props.embryo_number, modified: false },
    embryoName: { value: props.embryo_name, modified: false },
    embryoAge: { value: props.embryo_age, modified: false },
    embryoCycleId: { value: props.cycle_id, modified: false },
 
    Pregnancy: { value:  props.pregnancy, modified: false },
    embryo_status: { value:  props.embryo_status, modified: false },
    Live: { value:  props.live_birth, modified: false },
    Clinic:{value:  props.clinical_notes,modified:false},
    patient_id:{value:  props.patient_id,modified:false},
    id:{value: props.id,modified:false}
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  //console.log(props);
  const onSave = () => {
    const updatearray =  
    {
      "id":props.inputValues.id.value,
      "embryo_name": embryoName,
      "embryo_age": props.inputValues.embryoAge.value,
      "cycle_id": props.inputValues.embryoCycleId.value,
      "scan_date": props.inputValues.embryoCollectionDate.value,
      "collection_date":props.inputValues.embryoCollectionDate.value,
      "transfer_date": props.inputValues.embryoTransferDate.value,
      "pregnancy": props.inputValues.Pregnancy.value,
      "live_birth": props.inputValues.Live.value,
      "clinical_notes": props.inputValues.Clinic.value,
      "embryo_status": props.imageStatus.text,
      "patient_id": props.inputValues.patient_id.value,
      "embryo_link":props.url
    }
    ;
      fetchJSON("embryo/update", "POST", updatearray)
        .then((data_response) => {
          if (data_response.success == true) {
            setIsOpen(true);
          } else {
            alert("Something Went Wrong");
          }
        })
        .catch((err) => {
          alert("try again");
        });
    

        let patientInfo = JSON.parse(localStorage.getItem("patient"));
        fetchJSON("embryo/get/" + patientInfo[1], "GET", "").then((embryoData) => {
          setEmbryoInfo(embryoData.embryo_details);
          setEmbryodata(embryoData.embryo_details);
          console.log(embryoData.embryo_details);
        });
      
 
   
    //props.setIsEdited(true);
  };

  const backgroundColor =
  props.embryo_status === 'Transferred'
    ? '#2279F5'
    : props.embryo_status === 'Frozen'
    ? '#00D2FE'
    : props.embryo_status === 'Discarded'
    ? '#FB3B42'
    : '';

    useEffect(() => {
  //    setEmbryoName(props.embryo_name);
    }, [props]);

    
  const handleChange1 = (e, inputName) => {
    const value = e.target.value;
    // props.setInputValues((prevState) => ({
    //   ...prevState,
    //   [inputName]: { value, modified: true },
    // }));

    if (inputName === 'embryoNumber') {
    //  setEmbryoNumber(value);
    
    }
    if (inputName === 'embryoName') {
     // setEmbryoName(value);
     
    }
    if (inputName === 'Clinic') {
     // setclinicNotes(value);
    }
     
  };
  
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };


 
  const handleBlur = (inputName) => {
  //  const input = props.inputValues[inputName];
 //   console.log(input);
   
      // props.setInputValues((prevState) => ({
      //   ...prevState,
      //   [inputName]: { value: '-', modified: false },
      // }));
    
  };
  return (
    <div>
      <div
        className="emb-box "
        style={{ border: props.border, background: props.background }}
      >
        <div className="box5">
          <div
            className="txt10"
            style={{ background: backgroundColor }}
          >
            <span className="txt12">{props.embryo_status}</span>
          </div>
          <div style={{ width: "82%" }}>
            <img
              style={{ border: isOpen ? "4px solid #010B18" : "", margin: 10 }}
              onClick={() => setIsOpen(true)}
              className="emb-img"
              src={props.url}
              alt=""
            />
            <div className="image-name" style={{ textAlign: "center" }}>
              {props.filename}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              float: "left"
            }}
          >
            <Tooltip title="Transfer">
              <IconButton
                style={{
                  border: "1px solid #2279F5",
                  borderRadius: "12px",
                  margin: "10px",
                }}
                onClick={() =>
                  props.setImageStatus({
                    text: "Transferred",
                    color: "#2279F5",
                  })
                }
              >
                <DoneOutlinedIcon
                  sx={{
                    color: "#2279F5",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Freeze">
              <IconButton
                style={{
                  border: "1px solid #00D2FE",
                  borderRadius: "12px",
                  margin: "10px",
                }}
                onClick={() =>
                  props.setImageStatus({
                    text: "Frozen",
                    color: "#00D2FE",
                  })
                }
              >
                <AcUnitOutlinedIcon
                  sx={{
                    color: "#00D2FE",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Discard">
              <IconButton
                style={{
                  border: "1px solid #FB3B42",
                  borderRadius: "12px",
                  margin: "10px",
                }}
                onClick={() =>
                  props.setImageStatus({
                    text: "Discarded",
                    color: "#FB3B42",
                  })
                }
              >
                <DeleteForeverIcon sx={{ color: "#FB3B42" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div style={{ width: "83%" }}>
          <div style={{ display: "flex", marginTop: 15 }}>
            <div className="emb-box2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                }}
              >
                <div>
                  <p className="para">Embryo Number</p>
                  <input className="inpt3" value={embryoNumber} type="text" onChange={(e) => handleChange(e, 'embryoNumber')} onBlur={() => handleBlur('embryoNumber')} />
                </div>
                <input
        type="text"
        name="embryoName"
        value={embryoName}
        onChange={(e) => setEmbryoName(e.target.value)}
      />
                <div>
                  <p className="para">Embryo Age</p>
                  <input className="inpt3" value={props.inputValues.embryoAge.value} type="text" onChange={(e) => handleChange(e, 'embryoAge')} onBlur={() => handleBlur('embryoAge')} />
                </div>
                <div>
                  <p className="para">Cycle Id</p>
                  <input className="inpt3" value={props.inputValues.embryoCycleId.value} type="text" onChange={(e) => handleChange(e, 'embryoCycleId')} onBlur={() => handleBlur('embryoCycleId')} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                }}
              >
                <div>
                  <p className="para">Collection Date</p>
                  <input
                className="inpt3"
                name="dob"
                type="date"
                value={props.inputValues.embryoCollectionDate.value} onChange={(e) => handleChange(e, 'embryoCollectionDate')} onBlur={() => handleBlur('embryoCollectionDate')}
              />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Date slotProps={{
                  textField: {
                    variant: 'standard', InputProps: {
                      disableUnderline: true,
                    }
                  }
                }}
                  sx={{width:189.25 }} onChange={(e) => handleChange(e, 'embryoCollectionDate')} onBlur={() => handleBlur('embryoCollectionDate')}/>
              </LocalizationProvider> */}
                </div>
                <div>
                  <p className="para">Transfer Date</p>
                  <input
                className="inpt3"
                name="dob"
                type="date"
                value={props.inputValues.embryoTransferDate.value} onChange={(e) => handleChange(e, 'embryoTransferDate')} onBlur={() => handleBlur('embryoTransferDate')}
              />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Date slotProps={{
                  textField: {
                    variant: 'standard', InputProps: {
                      disableUnderline: true,
                    }
                  }
                }}
                  sx={{ width:189.25 }} value={props.inputValues.embryoTransferDate.value} onChange={(e) => handleChange(e, 'embryoTransferDate')} onBlur={() => handleBlur('embryoTransferDate')} />
              </LocalizationProvider> */}
                  {/* <input className="inpt3" type="date" onChange={(e) => handleChange(e, 'embryoTransferDate')} onBlur={() => handleBlur('embryoTransferDate')} /> */}
                </div>
                <div>
                  <p className="para">Pregnancy</p>
                  <select id="cars" className="inpt3" value={props.inputValues.Pregnancy.value === "" ? "-" : props.inputValues.Pregnancy.value} name="cars" onChange={(e) => handleChange(e, 'Pregnancy')} onBlur={() => handleBlur('Pregnancy')}>
                    <option value="----">-----</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                  </select>
                </div>
                <div>
                  <p className="para">Live Birth</p>
                  <select id="cars" className="inpt3" value={props.inputValues.Live.value === "" ? "-" : props.inputValues.Live.value} name="cars" onChange={(e) => handleChange(e, 'Live')} onBlur={() => handleBlur('Live')}>
                    <option value="----">-----</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                  </select>
                </div>
              </div>
              <div style={{ paddingLeft: "20px" }}>
                <div>
                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: 0,
                      color: "#6C7C93",
                    }}
                  >
                    Clinical notes
                  </p>
                  <input
        type="text"
        name="clinical_notes"
        value={clinical_notes}
        
      />

                  {/* <input className="inpt4" type="text" value={clinicNotes} onChange={(e) => handleChange(e, 'Clinic')} onBlur={() => handleBlur('Clinic')}/> */}
                </div>
              </div>
            </div>
            <div className="score-bar1">
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",marginRight:"35px"}}>
                  <EmbryoScoreBar score={props.score} />
                
                <p style={{ color: "#6c7c93", textAlign: "center" }}>
                  Embryo viability score
                </p>
                </div>
            </div>
          </div>
          <div className="edit" style={{ marginTop: "15px" }}>
            <div style={{ margin: "12px" }}>
              <button className="btn4" onClick={onSave}>
              <img src={Save} style={{ paddingRight:"5px"}}/>
                <span className="btn-txt1">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Modal open={isOpen}>
          <SuccessModal setIsOpen={setIsOpen} setIsEdit={props.setIsEdit} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Edit;
