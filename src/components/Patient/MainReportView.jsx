import React, { useEffect, useState } from "react";
import { StyleSheet, Document, PDFViewer } from "@react-pdf/renderer";
import OnePage from "./PdfReport/onePage";
import TowPage from "./PdfReport/TowPage";
import ThreePage from "./PdfReport/ThreePage";
import LastPage from "./PdfReport/LastPage";
import { useLocation } from "react-router-dom";
import { fetchJSON, calculate_age } from "../../controllers/Essentials";
import EmbroData from "./data.json";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const MainReport = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [embryoinfo, setEmbryoInfo] = useState([]);
  const [embryoinfodata, setEmbryoInfodata] = useState([]);
  const sliceEmbryoArray = (data) => {
    const sorted = [...data].sort((a, b) => b.percentage - a.percentage);

    let newArrayNumber = Math.ceil(sorted.length / 4);
  //  newArrayNumber = Math.max(newArrayNumber, 1);

    let result = [];
    for (let i = 0; i < newArrayNumber; i++) {
      result.push(sorted.slice(i * 4, (i + 1) * 4));
    }
    return result;
  };
  const handlePDFLoadSuccess = () => {
  //  setPDFLoaded(true);
    console.log("PDF has been loaded!");
    // You can perform any other actions or set states here as needed.
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
        setEmbryoInfodata(embryoData.embryo_details);
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      }
    };

    fetchData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // set the timeout as per your requirement

    return () => clearTimeout(timer);
    return () => console.log("my effect is destroying");
  }, []);

  // let data= sliceEmbryoArray(embryoinfo);
  const patientData1 = JSON.parse(localStorage.getItem("patient"));
  let clinicinfo = JSON.parse(localStorage.getItem("clinic"));

  const patientData = {
    id: patientData1[1],
    name: patientData1[2],
    age: calculate_age(new Date(patientData1[3])),
    DOB: patientData1[3],
    retreval: new Date(),
  };

  const clinicData = {
    clinicName: clinicinfo[1],
    drName: clinicinfo[7],
  };
  const reportData = {
    date: new Date(),
    embryos: embryoinfodata.length,
  };
  const handleLoadSuccess = () => {
    setLoading(false);
  };
  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <PDFViewer className="pdf-view" showToolbar="true">
      <Document style={styles.document} onLoadSuccess={handlePDFLoadSuccess}>
        <OnePage
          patientData={patientData}
          clinicData={clinicData}
          reportData={reportData}
        />
        <TowPage
          patientData={patientData}
          clinicData={clinicData}
          reportData={reportData}
          data={embryoinfo}
        />

        {embryoinfo.map((embryos, ind) => {
          return (
            <ThreePage
              ind={ind}
              patientData={patientData}
              clinicData={clinicData}
              reportData={reportData}
              embryos={embryos}
            />
          );
        })}
        <LastPage />
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  document: {
    width: "100%",
    display: "flex",
    fontFamily: "Helvetica-Bold",
  },
  page: {
    position: "relative",
  },
});
export default MainReport;
