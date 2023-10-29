import React, { useState, useRef } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Save from "../../../Icons/Save1.png";
import { Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmbryoDetails from "../../helpers/embryoDetails";
import { useNavigate, useLocation } from "react-router-dom";
import PatientDetails from "../../Embryo/patientDetails";
import { fetchJSON } from "../../../controllers/Essentials";
import EmbryoScoreBar from "../../helpers/embryoViabilityScoreBar";
import Edit1 from "../../../Icons/Edit1.svg";
import Edit from "../../helpers/Edit";
import Modal from "@mui/material/Modal";
import SuccessModal from "../../helpers/successModal";
import { IconButton, styled } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageModal from "../../helpers/imageModal";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import PdfGenerator from "../../Patient/Report/Welcome";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Welcome from "../../Patient/Report/Welcome";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import ReactToPrint from "react-to-print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import MainReport from "../../Patient/MainReport";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Cookies from "js-cookie";
const useStyles = makeStyles((theme) => ({
  modal: {
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
  },
}));

const Report = ({ setSelectedButton }) => {
  const classes = useStyles();
  const [showPDF, setShowPDF] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isViewReport, setIsViewReport] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [qualityScore, setQualityScore] = useState("");
  const [embryoInfo, setEmbryoInfo] = useState([]);
  const [embryodata, setEmbryodata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const [isSort, setSort] = useState(true);
  const [editedEmbryo, setEditedEmbryo] = useState(null);
  const [embryoNumber, setEmbryoNumber] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    const checkLocalStorageKey = () => {
      if (!localStorage.getItem("clinic")) {
        Cookies.set("access_token", "", { expires: -1 });
        Cookies.set("common_data", "", { expires: -1 });
        history("/");
      }
      if (!Cookies.get("access_token")) {
        localStorage.setItem("clinic", []);
        history("/");
      }
    };

    checkLocalStorageKey();

    const fetchData = async () => {
      let patientInfo = JSON.parse(localStorage.getItem("patient"));
      let clinicinfo = JSON.parse(localStorage.getItem("clinic"));
 
      let patientid;

      
      if(patientInfo[1].includes('_'))
      {
        patientid = patientInfo[1];
      }
       else{
        patientid =clinicinfo[0] + "_" + patientInfo[1];
       }

      const embryoData = await fetchJSON(
        "embryo/get/" + patientid,
        "GET",
        ""
      );


     


    
      const sorted = [...embryoData.embryo_details].sort(
        (a, b) => a.percentage - b.percentage
      );
      setEmbryoInfo(sorted);

      setEmbryodata(sorted);

      if (isSort) {
        const sorted = [...embryoData.embryo_details].sort(
          (a, b) => b.percentage - a.percentage
        );

        setEmbryoInfo(sorted);
        console.log(sorted);
      } else {
        const sorted = [...embryoData.embryo_details].sort(
          (a, b) => a.percentage - b.percentage
        );
        setEmbryoInfo(sorted);
        console.log(sorted);

       

      }

      if (embryoData.embryo_details.length === 0) {
        history("/embryo");
      }


    };

    fetchData();

    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1000);

      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [isSort, searchTerm, isOpen]);

  const componentRef = useRef();
  const contentRef = useRef();

  const handleCreatePDF = () => {
    const contentHTML = contentRef.current.innerHTML;
    const contentForPDF = htmlToPdfmake(contentHTML);
    const pdfDocument = {
      content: contentForPDF,
    };
    pdfMake.createPdf(pdfDocument).download();
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

  const printDocument = async () => {
    const newPath = "/ReportPrint";
    const currentURL = location.pathname;
    const baseURL = window.location.href.replace(currentURL, "");
    const fullURL = `${baseURL}${newPath}`;

    window.open(fullURL, "_blank");

    //   setLoading(true);
    //   const patientData1 = JSON.parse(localStorage.getItem("patient"));
    //   let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

    //   const patientData = {
    //     id: patientData1[1],
    //     name: patientData1[2],
    //     age: 0,
    //     DOB: patientData1[3],
    //     retreval: new Date('2022-08-20'),
    //   };

    //   const clinicData = {
    //     clinicName: clinicinfo[1],
    //     drName: clinicinfo[7],
    //   };
    //   const reportData = {
    //     date: new Date(),
    //     embryos: '10',
    //   };

    // const pdfDoc = pdf(<MainReport
    //   patientData={patientData}
    //   clinicData={clinicData}
    //   reportData={reportData}
    //   data={sliceEmbryoArray(embryoInfo)}
    // />);
    // const blob = await pdfDoc.toBlob();
    // if(blob instanceof Blob) {
    //   setLoading(false);
    //     const url = URL.createObjectURL(blob);
    //     const printWindow = window.open(url , '_blank');
    //     printWindow?.focus();
    //     printWindow?.print();
    // } else {
    //     console.log('Blob generation failed', blob);
    // }
    // setLoading(false);
  };

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
    let patientInfo = JSON.parse(localStorage.getItem("patient"));
    const updatearray = {
      id: embryo.id,
      embryo_number: inputValues.embryoNumber.value,
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
      patient_id: patientInfo[0],
      embryo_link: embryo.embryo_link,
    };
    fetchJSON("embryo/update", "POST", updatearray)
      .then((data_response) => {
        if (data_response.success == true) {
          NotificationManager.success(
            "Embryo details saved successfully",
            "Embryo",
            2000
          );
          //  setIsOpen(true);
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((err) => {
        alert("try again");
      });

    setIsEdit(false);
  };

  const handleScan = () => {
    history("/embryo");
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

  const print = () => {
    const pdf = new jsPDF();
    pdf.html(componentRef, {
      callback: (pdf) => {
        pdf.save("web.pdf");
      },
    });
  };

  const handleClick = () => {
    //  history(-1);
    history("/sidebar", { state: { variable: 4 } });
  };
  console.log(embryoInfo);
  return (
    <>
      <div>
        <button onClick={() => handleClick()} className="back-button">
          Back
        </button>
      </div>
      <PatientDetails />

      <div className="emb-container col-12 col-md-12 ">
        {loading && (
          
          NotificationManager.success(
            "Download Started",
            "Embryo",
            1000
          )

          // <Backdrop
          //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          //   open={loading}
          // >
          //   <CircularProgress color="inherit" />
          // </Backdrop>
        )}
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
                <ArrowUpwardIcon
                  style={{ cursor: "pointer" }}
                  sx={{ color: "#6C7C93" }}
                />
              </div>
            ) : (
              <div className="filter__box" onClick={sortArrayDescending}>
                <ArrowDownwardIcon
                  style={{ cursor: "pointer" }}
                  sx={{ color: "#6C7C93" }}
                />
              </div>
            )}

<button
              onClick={handleScan}
              className="scanbtn"
             
            >
              Scan
            </button>

            <div
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                padding: "7px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "12px",
                border: "1px solid var(--neutral-black, #010B18)",
                background: "var(--neutral-white, #FFF)",
                marginRight: "10px",
              }}
            >
              <div
                onClick={generatePDF}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "16px",
                  height: "16px",
                  flexShrink: 0,
                }}
              >
                {" "}
                <SaveAltIcon />
              </div>
            </div>

            {/* <div
              style={{
                display: "flex",
                width: "32px",
                height: "32px",
                padding: "7px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "12px",
                border: "1px solid var(--neutral-black, #010B18)",
                background: "var(--neutral-white, #FFF)",
              }}
            >
              <div
                onClick={printDocument}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "16px",
                  height: "16px",
                  flexShrink: 0,
                }}
              >
                {" "}
                <PrintIcon />
              </div>
            </div> */}

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
                    <LazyLoadImage
                      style={{
                        border: isOpen ? "4px solid #010B18" : "",
                        margin: 10,
                      }}
                      onClick={() => {
                        setSelectedImage(d.embryo_link);
                        setimgIsOpen(true);
                      }}
                      className="emb-img"
                      alt=""
                      src={d.embryo_link}
                      effect="blur"
                    />

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
                    <div className="image-name" style={{ textAlign: "center" }}>
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
                          onClick={() => setimagestatus(d, "Frozen", "#00D2FE")}
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
                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
                          <div>
                            <p className="para">Embryo Number</p>
                            <input
                              className="inpt3"
                              value={inputValues.embryoNumber.value}
                              type="text"
                              onChange={(e) => handleChange(e, "embryoNumber")}
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

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
                          <div>
                            <p className="para">Cycle Id</p>
                            <input
                              className="inpt3"
                              value={inputValues.embryoCycleId.value}
                              type="text"
                              readOnly
                              onChange={(e) => handleChange(e, "embryoCycleId")}
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
                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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
                            <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                              {d.pregnancy}
                            </p>
                          </div>
                        )}

                        {isEdit && editedEmbryo && editedEmbryo.id === d.id ? (
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
                      Image={selectedImage}
                    ></ImageModal>
                  </Modal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Report;
