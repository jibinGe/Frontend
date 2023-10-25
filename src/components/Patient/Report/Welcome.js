import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Mother from "../../../Images/motherbg1.png";
import Discription from "./Discription";
import Details from "./Details";
import EmbryoScore from "./EmbryoScore";
import { fetchJSON } from "../../../controllers/Essentials";
import { useReactToPrint } from "react-to-print";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const useStyles = makeStyles((theme) => ({
  myPrintImage: {
    // Styles for the button when printing
    // Example: hide the button when printing
    "@media print": {
      // Styles for Material-UI components when printing
      // Example: hide the button and change font size of typography
      "& .box-img": {
        position: "absolute",
        top: "",
        left: "250px",
        top: "350px",
      },
      "& .myTypography": {
        marginTop: "100px",
      },
    },
  },
}));
// const Text = styled(Typography)({
//   fontSize: "16px",
//   fontFamily: "Inter",
//   fontStyle: "normal",
//   lineHeight: "30px",
//   fontWeight: 700,
//   color: "#010B18",
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Welcome = () => {
  //TODO:do not try to edit or delete these codes (to ryan)
  const [embryoData, setEmbryoData] = React.useState([]);
  const patientInfo = JSON.parse(localStorage.getItem("patient"));
  const embryoFetch = async () => {
    await fetchJSON("embryo/get/" + patientInfo[1], "GET", "").then((data) => {
      console.log(data);
      let myList = data.embryo_details;
      myList.sort((a, b) => b[14] - a[14]);
      setEmbryoData(myList);
    });
  };

  React.useEffect(() => {
    embryoFetch();
  }, []);
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //TODO:do not try to edit or delete these codes (to ryan)
  const classes = useStyles();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}> 
    <div>
      <Box
        sx={{ position: "relative" }}
        ref={componentRef}
        // className={classes.myPrintImage}
      >
        <Box
          sx={{
            width: "70%",
            height: "579px",
            background: "linear-gradient(180deg, #2279F5 0%, #00D2FE 100.01%)",
            margin: "0px auto",
          }}
        ></Box>

        <Box sx={{ width: "60%", margin: "0px auto" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#00D2FE"
              fill-opacity="1"
              d="M0,0L48,26.7C96,53,192,107,288,112C384,117,480,75,576,58.7C672,43,768,53,864,74.7C960,96,1056,128,1152,165.3C1248,203,1344,245,1392,266.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          <Box sx={{ marginTop: "25px" }} className="myTypography">
            <Text variant="h6" sx={{ textAlign: "center" }}>
              Artificial Intelligence enabled embryo selection for
            </Text>
            <Text sx={{ textAlign: "center" }}>high IVF success rate</Text>
          </Box>

          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#00D2FE" fill-opacity="1" d="M0,64L48,69.3C96,75,192,85,288,117.3C384,149,480,203,576,197.3C672,192,768,128,864,101.3C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg> */}
        </Box>

        
        <Box
          sx={{ position: "absolute", top: "350px", left: "450px" }}
          className="box-img"
        >
          <img src={Mother} />
        </Box>
        <Box>
          <Details totalEmbryo={embryoData.length} />
        </Box>
        <Box>
          <Discription />
        </Box>
        <Box>
          <EmbryoScore embryoData={embryoData} patient_id={patientInfo[1]} />

          <Details totalEmbryo={embryoData.length} />
        </Box>
       
      </Box>
    </div>
    </View>
      </Page>
    </Document>
  );
};

export default Welcome;
