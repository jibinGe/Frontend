import React, { useState, useRef, useEffect } from "react";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
// ... other imports ...
import MainReport from "../Patient/MainReport";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { fetchJSON, calculate_age } from "../../controllers/Essentials";
import { saveAs } from "file-saver";
const ReportPrint = () => {
  // ... other states and functions ...
  const [loading, setLoading] = useState(false);
  const [embryoInfo, setEmbryoInfo] = useState([]);
  const [embryodata, setEmbryodata] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      let patientInfo = JSON.parse(localStorage.getItem("patient"));
      try {
        const embryoData = await fetchJSON(
          "embryo/get/" + patientInfo[1],
          "GET",
          ""
        );
        setEmbryoInfo(sliceEmbryoArray(embryoData.embryo_details));
        setEmbryodata(embryoData.embryo_details);
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (embryoInfo && embryoInfo.length > 0) {
      downloadPDF();
    }
  }, [embryoInfo]);

  const downloadPDF = () => {
    setLoading(true);
    const patientData1 = JSON.parse(localStorage.getItem("patient"));
    let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

    const patientData = {
      id: patientData1[1],
      name: patientData1[2],
      age: 0,
      DOB: patientData1[3],
      retreval: new Date(),
    };

    const clinicData = {
      clinicName: clinicinfo[1],
      drName: clinicinfo[7],
    };
    const reportData = {
      date: new Date(),
      embryos: embryodata.length,
    };
    const blob = pdf(
      <MainReport
        patientData={patientData}
        clinicData={clinicData}
        reportData={reportData}
        data={embryoInfo}
      />
    ).toBlob();

    blob.then((result) => {
      if (result) {
        const url = URL.createObjectURL(result);

        const printWindow = window.open(url);

        printWindow?.focus();
        printWindow?.print();

      //  window.close();

        setLoading(false);
      }
    });
  };

  if (loading) {
    // ... loading view ...
  }
  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};
export default ReportPrint;
