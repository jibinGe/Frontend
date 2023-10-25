import React, { useRef, useState } from "react";
import "./index.css";
import UploadImageButton from "../../Images/upload-image.png";
import InfoIcon from "../../Icons/user-guideline.svg";
import Lottie from "lottie-react";
import Animation from "../../Icons/ai-screening.json";
import Guidelines from "./guidelines";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "../../controllers/Essentials";

function UploadImage(props) {
  const history = useNavigate();
  const [isScreening, setIsScreening] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const fileInputRef = useRef(null);
  const height = props.isPresent ? "auto" : "550px";
  const [isDragOver, setIsDragOver] = useState(false);
  const [outputData, setOutputData] = useState([]);

  const handleFileUploader = async (files) => {
    let patientInfo = JSON.parse(localStorage.getItem("patient"));
    let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

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
     history("/embryo", {
      state: { embryoData: embryoData, selectedImages: selectedImages},
      });

     setIsScreening(true);
    await fetch("http://13.228.104.12:5000/upload_process", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload successful:", data);

        setOutputData(data);

        localStorage.removeItem("hasRun");
        let count = 0;

        dataUploader(data);

        //    setIsScreening(false);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });

    await fetch("http://13.228.104.12:5000/upload_aws", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload successful:", data);

        setIsScreening(false);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
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
      embryo_details: embryo_details,
    };
    await fetchJSON("embryo/create_and_delete", "POST", final_data)
      .then((embryoData) => {
        setOutputData(embryoData.embryo_details);
        setIsScreening(false);
        history("/embryo", {
          state: { embryoData: embryoData, selectedImages: selectedImages},
          });
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
    handleFileUploader(droppedFiles);
    setSelectedImages(droppedFiles);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const files = event.target.files;

    const selectedImagesArray = [];

    //handleFileUploader(Array.from(files));
    const selectedFilesArray = Array.from(files);

    if (selectedFilesArray.length <= 20) {
      handleFileUploader(selectedFilesArray);
      setSelectedImages(selectedFilesArray);
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
  return (
    <div className="add-embryo" style={{ height: height }}>
      <div
        style={{
          display: "flex",
          width: "60%",
          height: "33px",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <div className="add-embryo-heading">Add day 5 Embryo Images</div>
        <div className="user-guideline">
          <button onClick={() => setIsOpen(true)}>
            <img src={InfoIcon} alt="user-guidelines" />{" "}
            <span>User guidelines</span>
          </button>
          <Modal open={isOpen}>
            <Guidelines setIsOpen={setIsOpen} />
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
  );
}
export default UploadImage;
