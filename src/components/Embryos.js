import React, { useEffect, useState, useRef } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmbryoDetails from "./helpers/embryoDetails";
import Embryo from "../components/Embryo/index";
import PatientDetails from "./Embryo/patientDetails";
import { useNavigate, useLocation } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import { EmbryoDetailScore, Search } from "./helpers/EmbryoDetailScore";
import { saveAs } from "file-saver";
import { fetchJSON } from "../controllers/Essentials";
import { ReportGenerator } from "../controllers/ReportGenerator";
import { useHistory } from "react-router-dom";

import Save from "../Icons/Save1.png";

import EmbryoScoreBar from "./helpers/embryoViabilityScoreBar";
import Edit1 from "../Icons/Edit1.svg";
import Edit from "./helpers/Edit";
import Modal from "@mui/material/Modal";
import SuccessModal from "./helpers/successModal";
import { IconButton, styled } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageModal from "./helpers/imageModal";

import Pdfviewer from "./Patient/pdfviewer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import InfoIcon from "../Icons/user-guideline.svg";
import Lottie from "lottie-react";
import Animation from "../Icons/ai-screening.json";
import Guidelines from "./Embryo/guidelines";
import UploadImageButton from "../Images/upload-image.png";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { makeStyles } from "@mui/styles";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import MainReport from "./Patient/MainReport";


const useStyles = makeStyles((theme) => ({
  modal: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
  },
}));
const Embryos = ({ setSelectedButton,setSelectedItem }) => {
  const classes = useStyles();
  const location = useLocation();
  var data = location.state;
  const [loading, setLoading] = useState(false);
  const [isViewList, setIsViewList] = useState(false);
  const [isScreening, setIsScreening] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const fileInputRef = useRef(null);
 // const height = "auto";
  const height =isViewList ? "auto" : "550px";
  const [isDragOver, setIsDragOver] = useState(false);
  const [outputData, setOutputData] = useState([]);

  const [cards, setCards] = useState(data);
  const [searchResults, setSearchResults] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isViewReport, setIsViewReport] = useState(false);

  
  const [selectedImages, setSelectedImages] = useState([]);
  // const { state, selectedImages } = location.state;

  const [isEdited, setIsEdited] = useState(true);
  const [isSort, setSort] = useState(true);
  const history = useNavigate();
  const [embryodata, setEmbryodata] = useState([]);
  const [embryodatainfo, setEmbryodatainfo] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [embryoInfo, setEmbryoInfo] = useState([]);
  const [editedEmbryo, setEditedEmbryo] = useState(
    data && data.embryo_details ? data.embryo_details : []
  );

  const [embryoNumber, setEmbryoNumber] = useState("");
  const [error, setError] = useState("");
  const [inputValues, setInputValues] = useState({
    embryoNumber: { value: "", modified: false },
    embryoName: { value: "", modified: false },
    embryoAge: { value: "Day 5", modified: false },
    embryoCycleId: { value: "", modified: false },
    embryoCollectionDate: { value: "", modified: false },
    embryoTransferDate: { value: "", modified: false },
    Pregnancy: { value: "", modified: false },
    Live: { value: "", modified: false },
    Clinic: { value: "", modified: false },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImaged, setSelectedImaged] = useState(null);

  // useEffect(() => {
  //   const hasRun = localStorage.getItem("hasRun");

  //   if (!hasRun) {

  //     if (location.state) {
  //       setEmbryoInfo(location.state.embryoData.embryo_details);
  //       setEmbryodata(location.state.embryoData.embryo_details);
  //       setEmbryodatainfo(location.state.embryoData);
  //       if (Array.isArray(location.state.selectedImages)) {
  //         setSelectedImages(location.state.selectedImages);
  //       }

  //       console.log(" sele state " +  location.state.embryoData);
  //       console.log(" sele img " + location.state.selectedImages);
  //       setIsViewList(true)
  //     }
  //     else
  //     {

  //     let patientInfo = JSON.parse(localStorage.getItem("patient"));
  //     fetchJSON("embryo/get/" + patientInfo[1], "GET", "").then((embryoData) => {
  //     setEmbryoInfo(embryoData.embryo_details);
  //     setEmbryodata(embryoData.embryo_details);
  //     setEmbryodatainfo(embryoData);
  //      setSelectedImages([])
  //     if (embryoData.embryo_details.length >0)
  //     {
  //       setIsViewList(true)
  //     }
  //     else
  //     { setIsViewList(false)

  //     }

  //     });
  //     }

  //     return () => console.log('my effect is destroying');
  //   }
  // }, [location.state]);


  React.useEffect(() => {
    
    if(isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000);

      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }

  }, [isOpen]);



  const handleFileUploader = async (files) => {
    let patientInfo = JSON.parse(localStorage.getItem("patient"));
    let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

    setSelectedImages(files);
    setEmbryoInfo([]);
    setEmbryodata([]);
    setEmbryodatainfo([]);

    const formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
      formData.append("patient_id", patientInfo[0]);
      formData.append("clinic_name", clinicinfo[1]);
    }
    //  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //  history("/upload-images");

    // await fetchJSON("embryo/delete/" + patientInfo[0], "DELETE", "").then((embryoData) => {
    // //  history("/upload-images");
    //   });
    let embryoData = [];
    setIsScreening(true);
    //  history("/embryo", { state: embryoData , selectedImages: selectedImages  });
    //  history("/embryo", {
    //   state: { embryoData: embryoData, selectedImages: selectedImages},
    //   });
    setIsButtonDisabled(true);
    setIsScreening(true);
    
    const batchSize = 3; // Number of files per batch
    const patientId = patientInfo[0]; // Assuming patientId is fetched from patientInfo
const clinicName = clinicinfo[1]; // Assuming clinicName is fetched from clinicInfo
let count = 0;
const embryo_details = [];
    

async function uploadBatch(startIndex) {
  const batch = files.slice(startIndex, startIndex + batchSize);
  
  const formData = new FormData();

  for (let i = 0; i < batch.length; i++) {
    formData.append("file", batch[i]);
    formData.append("patient_id", patientId);
    formData.append("clinic_name", clinicName);
  }

  try {
    const response = await fetch("http://13.228.104.12:5000/upload_process", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Upload successful:", data);
  

  
    for (let embryo of data) {
      count++;
      let embryostate;
      if (embryo.percentage > 75) {
        embryostate = "good";
      } else if (embryo.percentage > 50 && embryo.percentage <= 75) {
        embryostate = "fair";
      } else {
        embryostate = "poor";
      }

      let embryo_detail = {
        embryo_number: "",
        embryo_name: "",
        embryo_age: "5 Days",
        cycle_id: JSON.parse(localStorage.getItem("patient"))[4],
        scan_date: null,
        collection_date: null,
        transfer_date: null,
        pregnancy: "----",
        live_birth: "----",
        clinical_notes: "",
        embryo_status: "",
        patient_id: JSON.parse(localStorage.getItem("patient"))[0],
        percentage: embryo.percentage,
        embryo_state: embryostate,
        embryo_link: embryo.img,
        filename: embryo.filename,
        slno: count,
      };
      embryo_details.push(embryo_detail);
     
    }
    if (embryo_details.length > 0) {
      setIsViewList(true);
    } else {
      setIsViewList(false);
    }

    console.log("Upload successful1:", embryo_details);


    let embryo_details1 = [];
    for (let embryo of embryo_details) {
      count++;
      let embryostate;
      if (embryo.percentage > 75) {
        embryostate = "good";
      } else if (embryo.percentage > 50 && embryo.percentage <= 75) {
        embryostate = "fair";
      } else {
        embryostate = "poor";
      }

      let embryo_detail = {
        embryo_number: "",
        embryo_name: "",
        embryo_age: "5 Days",
        cycle_id: JSON.parse(localStorage.getItem("patient"))[4],
        scan_date: null,
        collection_date: null,
        transfer_date: null,
        pregnancy: "----",
        live_birth: "----",
        clinical_notes: "",
        embryo_status: "",
        patient_id: JSON.parse(localStorage.getItem("patient"))[0],
        percentage: embryo.percentage,
        embryo_state: embryostate,
        embryo_link: embryo.img,
        filename: embryo.filename,
        slno: count,
      };
      embryo_details1.push(embryo_detail);
    }


    setEmbryoInfo(embryo_details1);
   
    // Handle the uploaded data as needed

    // Set a delay of 2 seconds before the next batch
    if (startIndex + batchSize < files.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      uploadBatch(startIndex + batchSize);
    } else {
      console.log("All files uploaded successfully");
      executeSecondFetch(); 
     dataUploader(embryo_details);
      // Perform actions after all files are uploaded
    }
  } catch (error) {
    console.error("Error uploading files:", error);
  }
}

// Start uploading batches
uploadBatch(0); // Start with the first batch

    // await fetch("http://13.228.104.12:5000/upload_process", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Upload successful:", data);

    //     setOutputData(data);

    //     localStorage.removeItem("hasRun");
    //     let count = 0;

    //     dataUploader(data);

    //     //    setIsScreening(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading files:", error);
    //   });

    function executeSecondFetch() {
      // Your code for the second fetch request
      // Example:
      const secondFormData = new FormData();
      // Add data to the secondFormData if needed
      // ...
    
      fetch("https://api.genesysailabs.com/upload_aws", {
        method: "POST",
        body: secondFormData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Second upload successful:", data);
          // Perform actions after the second upload completes
        })
        .catch((error) => {
          console.error("Error in the second upload:", error);
        });
    }

    
    // await fetch("https://api.genesysailabs.com/upload_aws", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Upload successful:", data);

    //     setIsScreening(false);
    //     setIsButtonDisabled(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading files:", error);
    //   });


  };

  const dataUploader = async (data) => {
    let count = 0;

    console.log("outputData:", data);
    let embryo_details = [];
    for (let embryo of data) {
      count++;
      let embryostate;
      if (embryo.percentage > 75) {
        embryostate = "good";
      } else if (embryo.percentage > 50 && embryo.percentage <= 75) {
        embryostate = "fair";
      } else {
        embryostate = "poor";
      }

      let embryo_detail = {
        embryo_number: "",
        embryo_name: "",
        embryo_age: "5 Days",
        cycle_id: JSON.parse(localStorage.getItem("patient"))[4],
        scan_date: null,
        collection_date: null,
        transfer_date: null,
        pregnancy: "----",
        live_birth: "----",
        clinical_notes: "",
        embryo_status: "",
        patient_id: JSON.parse(localStorage.getItem("patient"))[0],
        percentage: embryo.percentage,
        embryo_state: embryostate,
        embryo_link: embryo.img,
        filename: embryo.filename,
        slno: count,
      };
      embryo_details.push(embryo_detail);
    }
    let final_data = {
      embryo_details: data,
    };
    await fetchJSON("embryo/create_embryo", "POST", final_data)
      .then((embryoData) => {
        setOutputData(embryoData.embryo_details);
        setIsScreening(false);

        const sorted = [...embryoData.embryo_details].sort(
          (a, b) => b.percentage - a.percentage
        );
        setEmbryoInfo(sorted);

 
        setEmbryodata(sorted);
        setEmbryodatainfo(embryoData);

        if (embryoData.embryo_details.length > 0) {
          setIsViewList(true);
        } else {
          setIsViewList(false);
        }

        // history("/embryo", {
        //   state: { embryoData: embryoData, selectedImages: selectedImages},
        //   });
      })
      .catch((err) => {
        console.log(err);
      });

    //setIsScreening(false);
    // let patientInfo = JSON.parse(localStorage.getItem("patient"));
    // await fetchJSON("embryo/get/" + patientInfo[1], "GET", "").then((embryoData) => {
    //   setOutputData(embryoData.embryo_details);
    //     history("/embryo", { state: embryoData  });
    // });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);

    //TODO: check why used this
    setSelectedImages((prevFiles) => [...prevFiles, ...droppedFiles]);
    //TODO: check why used this

    setIsScreening(true);
    setSelectedImages(droppedFiles);
    handleFileUploader(droppedFiles);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const files = event.target.files;

    const selectedImagesArray = [];

    //handleFileUploader(Array.from(files));
    const selectedFilesArray = Array.from(files);

    if (selectedFilesArray.length <= 20) {
      handleFileUploader(selectedFilesArray);

      setIsCheck(true);
      setIsScreening(true);
    } else {
      alert("Maximum 20 files can be uploaded");
      setIsCheck(false);
    }

    //TODO: check why used this
    if (isCheck) {
      for (let i = 0; i < files.length; i++) {
        selectedImagesArray.push(URL.createObjectURL(files[i]));
      }
    }

    //TODO: check why used this
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  function download() {
    fetch(
      "https://drive.google.com/file/d/1A73jzHmjffnsUqxw5ioS4mlAbjJcRjZC/view?usp=sharing"
    )
      .then((response) => response.blob())
      .then((pdfBlob) => {
        saveAs(pdfBlob, "downloaded.pdf");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const onEdit = (embryo) => {
    setInputValues((prevState) => ({
      ...prevState,
      embryoNumber: { value: embryo.embryo_number, modified: false },
      embryoName: { value: embryo.embryo_name, modified: false },
      embryoAge: { value: embryo.embryo_age, modified: false },
      embryoCycleId: { value: embryo.cycle_id, modified: false },
      embryoCollectionDate: {
        value: embryo.collection_date
          ? new Date(embryo.collection_date).toISOString().substr(0, 10)
          : "",
        modified: false,
      },
      embryoTransferDate: {
        value: embryo.transfer_date
          ? new Date(embryo.transfer_date).toISOString().substr(0, 10)
          : "",
        modified: false,
      },
      Pregnancy: { value: embryo.pregnancy, modified: false },
      Live: { value: embryo.live_birth, modified: false },
      Clinic: { value: embryo.clinical_notes, modified: false },
    }));

    setImageStatus({
      text: embryo.embryo_status,
      color: "#FB3B42",
    });

    setIsEdit(true);
    setEditedEmbryo(embryo);
  };

  const onSave = (embryo) => {
    // if (!inputValues.embryoName.value) {
    //   setError("Embryo Name is required");
    //   return;
    // }

    // if (!inputValues.embryoCollectionDate.value) {
    //   setError("Collection Date is required");
    //   return;
    // }
    // if (!inputValues.embryoTransferDate.value) {
    //   setError("Transfer Date is required");
    //   return;
    // }

    embryo.embryo_number = inputValues.embryoNumber.value;
    embryo.embryo_name = inputValues.embryoName.value;
    embryo.embryo_age = inputValues.embryoAge.value;
    embryo.cycle_id = inputValues.embryoCycleId.value;
    embryo.collection_date = inputValues.embryoCollectionDate.value;
    embryo.transfer_date = inputValues.embryoTransferDate.value;
    embryo.pregnancy = inputValues.Pregnancy.value;
    embryo.live_birth = inputValues.Live.value;
    embryo.clinical_notes = inputValues.Clinic.value;

    setEditedEmbryo(embryo);

    const updatearray = {
      id: embryo.id,
      embryo_name: inputValues.embryoName.value,
      embryo_age: inputValues.embryoAge.value,
      cycle_id: inputValues.embryoCycleId.value,
      scan_date: new Date().toISOString().slice(0, 10),
      collection_date: inputValues.embryoCollectionDate.value
        ? inputValues.embryoCollectionDate.value
        : null,
      transfer_date: inputValues.embryoTransferDate.value
        ? inputValues.embryoTransferDate.value
        : null,
      pregnancy: inputValues.Pregnancy.value,
      live_birth: inputValues.Live.value,
      clinical_notes: inputValues.Clinic.value,
      embryo_status: imageStatus.text,
      patient_id: embryo.patient_id,
      embryo_link: embryo.embryo_link,
      embryo_number: inputValues.embryoNumber.value,
    };
    fetchJSON("embryo/update", "POST", updatearray)
      .then((data_response) => {
        if (data_response.success == true) {
          NotificationManager.success('Embryo details saved successfully', 'Embryo',2000);
          // setIsOpen(true);
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        alert("try again");
      });

    setIsEdit(false);
  };

  const handleEdit = (embryo) => {
    setIsEdit(true);
    setEditedEmbryo(embryo);
  };

  const setimagestatus = (embryo, text, color) => {
    setImageStatus({
      text: text,
      color: color,
    });
    embryo.embryo_status = text;
  };

  const handleChange = (e, inputName) => {
    const value = e.target.value;
    setInputValues((prevState) => ({
      ...prevState,
      [inputName]: { value, modified: true },
    }));
  };

  const handleSearch = (e) => {
    var result = [];
    if (e.target.value === "") {
      console.log("e.target.value");
      result = embryodata;
      console.log(result);
      setSearchQuery(e.target.value);
      setEmbryoInfo(result);
    }
    if (e.target.value != "") {
      if (e && e.target) {
        setSearchQuery(e.target.value);
        console.log(e.target.value);

        result = embryodata.filter(
          (obj) => obj.cycle_id === parseInt(e.target.value, 10)
        );
        setEmbryoInfo(result);
      }
    }
  };


  const handleOpenInNewTab = () => {
    if(!isButtonDisabled) {

      let patientInfo = JSON.parse(localStorage.getItem("patient"));

      const patientData = {
        patient_id: patientInfo[1],
        
      };

      generatePDF();
      NotificationManager.success(
        "Download Started",
        "Embryo",
        1000
      )
    //   fetchJSON("patient/viewreport", "POST", patientData)
    //   .then((data_response) => {
    //     if (data_response.success == true) {
          
    //     } else {
          
    //     }
    //   })
    //   .catch((err) => {
         
    //   });

 
    //   const newPath = "/MainReport";
    //   const currentURL = location.pathname;
    //   const baseURL = window.location.href.replace(currentURL, '');
    //   const fullURL = `${baseURL}${newPath}`;
  
    //   window.open(fullURL, "_blank");
     history("/report");
    }
  

  
    // If you also need to send state to the new tab, you'll have to use other mechanisms, like local storage or session storage.
};
const sliceEmbryoArray = (data) => {
  const sorted = [...data].sort((a, b) => b.percentage - a.percentage);

  let newArrayNumber = Math.ceil(sorted.length / 4);
  let result = [];
  for (let i = 0; i < newArrayNumber; i++) {
    result.push(sorted.slice(i * 4, (i + 1) * 4));
  }

  console.log(result);
  return result;
};
const generatePDF = async () => {
  const newPath = "/ReportDownload";
  const currentURL = location.pathname;
  const baseURL = window.location.href.replace(currentURL, "");
  const fullURL = `${baseURL}${newPath}`;

  // window.open(fullURL, "_blank");

    setLoading(true);
    const patientData1 = JSON.parse(localStorage.getItem("patient"));
    let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

    const patientData = {
      id: patientData1[1],
      name: patientData1[2],
      age: 0,
      DOB:patientData1[3],
      retreval: new Date(),
    };

    const clinicData = {
      clinicName: clinicinfo[1],
      drName: clinicinfo[7],
    };
    const reportData = {
      date: new Date(),
      embryos: embryoInfo.length,
    };
    const blob = pdf(<MainReport
    patientData={patientData}
    clinicData={clinicData}
    reportData={reportData}
    data={sliceEmbryoArray(embryoInfo)}
  />).toBlob();

    blob.then(result => {
     // saveAs(result, 'document.pdf');
    //  setLoading(false);
//    const blobURL = URL.createObjectURL(result);
 //   const newWindow = window.open(blobURL, '_blank');

   // newWindow.location.href = blobURL;

      saveAs(result, patientData1[2] + '.pdf');

    // newWindow.onbeforeunload = () => {
    //   setTimeout(() => {
    //     newWindow.close();
    //   }, 1000); // Close after 1 second. Adjust the time if needed.
    // };

    setLoading(false);

    });
};

  const [isOpenGuidline, setIsOpenGuidline] = useState(false);
  const [isimgOpen, setimgIsOpen] = useState(false);
  const [imageStatus, setImageStatus] = useState({ text: "", color: "" });
  const sortArrayAscending = () => {
    // let patientInfo = JSON.parse(localStorage.getItem("patient"));
    // fetchJSON("embryo/get/" + patientInfo[1], "GET", "").then((embryoData) => {
    //   setEmbryoInfo(embryoData.embryo_details);
    //   setEmbryodata(embryoData.embryo_details);
    //   console.log(embryoData.embryo_details);
    // });
    const sorted = [...embryoInfo].sort((a, b) => a.percentage - b.percentage);
    setEmbryoInfo(sorted);
    setSort(false);
  };

  const sortArrayDescending = () => {
    const sorted = [...embryoInfo].sort((a, b) => b.percentage - a.percentage);
    setEmbryoInfo(sorted);
    setSort(true);
    console.log(sorted);
  };
  const handleClick = () => {
   
  //  setSelectedButton(7);
  history("/sidebar", { state: { variable: 4 } }); 
  
  }
  return (
    <div>
        {isViewReport ? (
        <>
          <button onClick={() =>   handleClick()} className="back-button">
            Back
          </button>{" "}
          <PatientDetails />
   
        </>
      ) : (
       
        <div>
        <button onClick={() =>   handleClick()} className="back-button">
          Back
        </button>
        <PatientDetails />
        
      </div>
      )}
      {isViewReport ? (
        <>
          <button onClick={() =>   handleClick()} className="back-button">
            Back
          </button>{" "}
          <PatientDetails />
        </>
      ) : (
        
        
        <div className="add-embryo" style={{ height: height }}>
          
          <div
            style={{
              display: "flex",
              width: "60%",
              height: "33px",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2px",
            }}
          >
            <div className="add-embryo-heading">Add day 5 Embryo Images</div>
           
          </div>

          <div
            style={{
              display: "flex",
              width: "60%",
            
              justifyContent: "flex-end",
              marginBottom: "2px",
            }}
          >
              <div className="user-guideline">
              <button onClick={() => setIsOpenGuidline(true)}>
                <img src={InfoIcon} alt="user-guidelines" />{" "}
                <span>User guidelines</span>
              </button>
              <Modal open={isOpenGuidline}>
                <Guidelines setIsOpenGuidline={setIsOpenGuidline} />
              </Modal>
            </div>
           
          </div>


       
          <div className="upload-box">
            {isScreening ? (
              <div className="ai-screening-box">
                <p className="ai-screening-text">AI screening your Embryos</p>
                <div className="animation-box">
                  <Lottie
                    animationData={Animation}
                    style={{ width: 150, height: 150 }}
                    speed={1.5}
                    loop
                    autoplay
                  />
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  multiple={true}
                />
                <label
                  htmlFor="file-upload"
                  className="upload-button"
                  onClick={handleButtonClick}
                >
                  <img src={UploadImageButton} alt="Upload Icon" />
                </label>
                <div>
                  Drag & drop your images here or
                  <button onClick={handleButtonClick} className="browse-images">
                    Browse Images
                  </button>
                </div>
                <div className="file-format">File format: JPG or PNG</div>
              </div>
            )}
          </div>
        </div>
      )}
      {isViewList && (
        <div className="emb-container col-12 col-md-12 ">
          <div className="flex-box">
            <div className="embryo-heading">Embryos</div>
            <div className="filter">
              <div className="filter__widget widget">
                <span>Search By</span>
                <input
                  className="search-cycle-id"
                  placeholder="Cycle Id"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    height: "32px",
                    width: "152px",
                  }}
                  type="text"
                ></input>
              </div>
              <div className="filter__widget flex-mid">
                <span style={{ marginRight: 0 }}>Sort By</span>
              </div>
              {isSort ? (
                <div className="filter__box" onClick={sortArrayAscending}>
                  <ArrowUpwardIcon style={{cursor: 'pointer'}} sx={{ color: "#6C7C93" }} />
                </div>
              ) : (
                <div className="filter__box" onClick={sortArrayDescending}>
                  <ArrowDownwardIcon style={{cursor: 'pointer'}} sx={{ color: "#6C7C93" }} />
                </div>
              )}
{!isButtonDisabled && (
              <button
              onClick={handleOpenInNewTab}
                
                className="btn2"
                 
              >
                View Report
              </button>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {embryoInfo?.map((d, i) => {
              let score = parseFloat(d.percentage).toFixed(2);
              let scoreColor =
                score >= 75
                  ? "8px solid #47D273"
                  : score >= 50
                  ? "8px solid #FAC20A"
                  : "8px solid #FB3B42";

              const backgroundColor =
                d.embryo_status === "Transferred"
                  ? "#2279F5"
                  : d.embryo_status === "Frozen"
                  ? "#00D2FE"
                  : d.embryo_status === "Discarded"
                  ? "#FB3B42"
                  : "";

              return (
                <div
                  className="emb-box "
                  style={{ border: scoreColor, background: scoreColor }}
                >
                 
                  <div className="box5">
                    <div
                      className="txt10"
                      style={{ background: backgroundColor }}
                    >
                      <span className="txt12">{d.embryo_status}</span>
                    </div>
                    <div style={{ width: "82%" }}>

                    {Array.isArray(selectedImages) && selectedImages.map((image, index) => {
    if (d.filename === image.name) {
      return <img key={index} src={URL.createObjectURL(image)}  style={{
        border: isOpen ? "4px solid #010B18" : "",
        margin: 10,
      }}
      onClick={() =>  {
        setSelectedImaged(URL.createObjectURL(image));
        setimgIsOpen(true);
    }}
      className="emb-img"
      alt="" />
    } else {
      return null;
    }
  })}

                      {/* <LazyLoadImage
                        style={{
                          border: isOpen ? "4px solid #010B18" : "",
                          margin: 10,
                        }}
                        onClick={() => setimgIsOpen(true)}
                        className="emb-img"
                        alt=""
                        src={d.embryo_link}
                        effect="blur"
                      /> */}
                      {/* <img
                      style={{
                        border: isOpen ? "4px solid #010B18" : "",
                        margin: 10,
                      }}
                      onClick={() => setimgIsOpen(true)}
                      className="emb-img"
                      src={d.embryo_link}
                      alt=""
                    /> */}
                      <div
                        className="image-name"
                        style={{ textAlign: "center" }}
                      >
                        {d.filename}
                      </div>
                    </div>

                    {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          float: "left",
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
                              setimagestatus(d, "Transferred", "#2279F5")
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
                              setimagestatus(d, "Frozen", "#00D2FE")
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
                              setimagestatus(d, "Discarded", "#FB3B42")
                            }
                          >
                            <DeleteForeverIcon sx={{ color: "#FB3B42" }} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div style={{ width: "83%", height: "20%" }}>
                    <div
                      style={{ display: "flex", marginTop: 35, width: "100%" }}
                    >
                      <div className="emb-box2">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingBottom: "15px",
                            marginTop: "20px",
                          }}
                        >
                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Embryo Number</p>
                              <input
                                className="inpt3"
                                value={inputValues.embryoNumber.value}
                                type="text"
                                onChange={(e) =>
                                  handleChange(e, "embryoNumber")
                                }
                              />
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Embryo Number
                              </p>
                              <p>{d.embryo_number}</p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Embryo Name</p>
                              <input
                                className="inpt3"
                                value={inputValues.embryoName.value}
                                type="text"
                                onChange={(e) => handleChange(e, "embryoName")}
                                required
                              />
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Embryo Name
                              </p>
                              <p>{d.embryo_name}</p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para"> Embryo Age</p>
                              <input
                                className="inpt3"
                                value={inputValues.embryoAge.value}
                                type="text"
                                readOnly
                                onChange={(e) => handleChange(e, "embryoAge")}
                              />
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Embryo Age
                              </p>
                              <p>{d.embryo_age}</p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Cycle Id</p>
                              <input
                                className="inpt3"
                                value={inputValues.embryoCycleId.value}
                                type="text"
                                readOnly
                                onChange={(e) =>
                                  handleChange(e, "embryoCycleId")
                                }
                              />
                            </div>
                          ) : (
                            <div>
                              <p
                                style={{
                                  marginBottom: 0,
                                  marginRight: 11,
                                  color: "#6C7C93",
                                }}
                              >
                                Cycel Id
                              </p>
                              <p>{d.cycle_id}</p>
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                          }}
                        >
                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Collection Date</p>
                              <input
                                className="inpt3"
                                name="dob"
                                type="date"
                                value={inputValues.embryoCollectionDate.value}
                                onChange={(e) =>
                                  handleChange(e, "embryoCollectionDate")
                                }
                              />
                              {error && <p>{error}</p>}
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Collection Date
                              </p>
                              <p>
                                {d.collection_date
                                  ? new Date(d.collection_date)
                                      .toISOString()
                                      .substr(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  : ""}
                              </p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Transfer Date</p>
                              <input
                                className="inpt3"
                                name="dob"
                                type="date"
                                value={inputValues.embryoTransferDate.value}
                                onChange={(e) =>
                                  handleChange(e, "embryoTransferDate")
                                }
                              />
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Transfer Date
                              </p>
                              <p>
                                {d.transfer_date
                                  ? new Date(d.transfer_date)
                                      .toISOString()
                                      .substr(0, 10)
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  : ""}
                              </p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Pregnancy</p>
                              <select
                                id="cars"
                                className="inpt3"
                                value={
                                  inputValues.Pregnancy.value === ""
                                    ? "-"
                                    : inputValues.Pregnancy.value
                                }
                                name="cars"
                                onChange={(e) => handleChange(e, "Pregnancy")}
                              >
                                <option value="----">-----</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Pregnancy
                              </p>
                              <p
                                style={{
                                  fontFamily: "Roboto",
                                  fontWeight: 500,
                                  fontSize: "16px",
                                  lineHeight: "18.75px",
                                }}
                              >
                                {d.pregnancy}
                              </p>
                            </div>
                          )}

                          {isEdit &&
                          editedEmbryo &&
                          editedEmbryo.id === d.id ? (
                            <div>
                              <p className="para">Live Birth</p>
                              <select
                                id="cars"
                                className="inpt3"
                                value={
                                  inputValues.Live.value === ""
                                    ? "-"
                                    : inputValues.Live.value
                                }
                                name="cars"
                                onChange={(e) => handleChange(e, "Live")}
                              >
                                <option value="----">-----</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          ) : (
                            <div>
                              <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                                Live Birth
                              </p>
                              <p>{d.live_birth}</p>
                            </div>
                          )}
                        </div>

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
                          <div>
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
                                className="inpt4"
                                type="text"
                                value={inputValues.Clinic.value}
                                onChange={(e) => handleChange(e, "Clinic")}
                              />
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        {isOpen ? (
                          <Modal open={isOpen} className={classes.modal}>
                            <SuccessModal
                              setIsOpen={setIsOpen}
                              setIsEdit={setIsEdit}
                            />
                          </Modal>
                        ) : null}
                      </div>
                      <div className="score-bar">
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginRight: "35px",
                          }}
                        >
                          <EmbryoScoreBar score={score} />

                          <p style={{ color: "#6c7c93", textAlign: "center" }}>
                            Embryo viability score
                          </p>
                        </div>
                      </div>
                    </div>
                    {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
                      <div className="edit" style={{ marginTop: "15px" }}>
                        <div style={{ margin: "12px" }}>
                          <button className="btn4" onClick={() => onSave(d)}>
                            <img src={Save} style={{ paddingRight: "5px" }} />
                            <span className="btn-txt1">Save</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="edit">
                        <div style={{ margin: "6px 0" }}>
                          <button className="btn3" onClick={() => onEdit(d)}>
                            <img src={Edit1} style={{ paddingRight: "5px" }} />
                            <span className="btn-txt">Edit</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <Modal open={isimgOpen}>
                      <ImageModal
                        setimgIsOpen={setimgIsOpen}
                        Image={selectedImaged}
                      ></ImageModal>
                    </Modal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Embryos;
