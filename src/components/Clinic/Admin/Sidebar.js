import React, { useState,useEffect } from "react";
import { styled, Box, Typography, Button } from "@mui/material";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import User from "../../../Icons/Admin/admin.svg";
import Patients from "../Admin/Patients";
import About from "../../../Icons/Admin/about.png";
import Help from "../../../Icons/Admin/help.png";
import View from "../../../Icons/Admin/view-patients.png";
import Accounts from "../../../Icons/Admin/accounts.png";
import Activity from "../../../Icons/Admin/activity-logs.png";
import AddPatient from "../../../Icons/add-new-patients.png";
import ViewPatients from "./ViewPatients";
import AdminForm from "./AdminForm";
import AddEmployee from "./addEmployee";
import ActivityLogs from "./ActivityLogs";
import PaymentList from "./PaymentList";
import Payment from "./Payment";
import Helps from "../Admin/help";
import Abouts from "../Admin/about";
import Report from "./report";
import { useNavigate } from "react-router-dom";
import AddPatient1 from "./addPatient";
import { useLocation } from 'react-router-dom';
import ActivityDetails from "./ActivityDetails";
import Cookies from "js-cookie";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
  width: "23%",
  height: 880,
  borderRadius: "0px 12px 12px 0px",
  marginTop: "40px",
  borderImageSource: `linear-gradient(to left, #CEE1FD 8.33%, #CCF6FF 91.67%)`,
  borderImageSlice: 1,
  border: "2px solid transparent",
});

const BoxContainer = styled(Button)({
  width: 196,
  height: 48,
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "left",
  marginTop: "40px",
  border: "none",
  outline: "none",
  justifyContent: "flex-start",
});

const BoxContainer1 = styled(Box)({
  width: "32px",
  height: "32px",
  background: "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
  borderRadius: "40px",
  display: "flex",
  alignItems: "left",
  justifyContent: "flex-start",
  margin: "8px 12px 8px 8px",
});
const StyledTypography = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  color: "#6C7C93",
});

const Sidebar = () => {
  const location = useLocation();
  const variable = location.state && location.state.variable;
  const history = useNavigate();
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
 
  useEffect(() => {
    setSelectedButton(variable);
    const checkLocalStorageKey = () => {
      if (!localStorage.getItem('clinic')) {
        Cookies.set('access_token', '', { expires: -1 });
         Cookies.set('common_data', '', { expires: -1 });
         history("/");
      }  
      if (!Cookies.get('access_token')) {
        localStorage.setItem("clinic", []);
        history("/");
      }
      

    };

    checkLocalStorageKey();
  }, []);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <StyledContainer>
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 1 || selectedButton === 2
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(1)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 1
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={User} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{
              color:
                selectedButton === 1 || selectedButton === 2
                  ? "#ffffff"
                  : "#6C7C93",
            }}
            variant="h6"
            component="h6"
          >
            Admin Panel
          </StyledTypography>
        </BoxContainer>
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 3
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(3)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 3
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={AddPatient} width={32} height={32} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{ color: selectedButton === 3 ? "#ffffff" : "#6C7C93" }}
            variant="h6"
            component="h6"
          >
            Add New Patient
          </StyledTypography>
        </BoxContainer>
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 4
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(4)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 4
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={View} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{ color: selectedButton === 4 ? "#ffffff" : "#6C7C93" }}
            variant="h6"
            component="h6"
          >
            View Patients
          </StyledTypography>
        </BoxContainer>
        {/* <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 5 || selectedButton === 6
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(5)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 5
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={Accounts} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{
              color:
                selectedButton === 5 || selectedButton === 6
                  ? "#ffffff"
                  : "#6C7C93",
            }}
            variant="h6"
            component="h6"
          >
            Accounts
          </StyledTypography>
        </BoxContainer> */}
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 7 || selectedButton === 8
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(7)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 7
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={Activity} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{
              color:
                selectedButton === 7 || selectedButton === 8
                  ? "#ffffff"
                  : "#6C7C93",
            }}
            variant="h6"
            component="h6"
          >
            Activity Logs
          </StyledTypography>
        </BoxContainer>
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 9
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(9)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 9
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={Help} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{ color: selectedButton === 9 ? "#ffffff" : "#6C7C93" }}
            variant="h6"
            component="h6"
          >
            Help
          </StyledTypography>
        </BoxContainer>
        <BoxContainer
          variant="text"
          sx={{ marginTop: "40px", outlineStyle: "none" }}
          style={{
            background:
              selectedButton === 10
                ? "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)"
                : "rgba(255, 255, 255, 0.8)",
          }}
          onClick={() => handleButtonClick(10)}
        >
          <BoxContainer1
            style={{
              background:
                selectedButton === 10
                  ? "#FFFFFF"
                  : "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            }}
          >
            <img src={About} style={{}} />
          </BoxContainer1>
          <StyledTypography
            sx={{ color: selectedButton === 10 ? "#ffffff" : "#6C7C93" }}
            variant="h6"
            component="h6"
          >
            About Genesys
          </StyledTypography>
        </BoxContainer>
      </StyledContainer>

      {selectedButton === 1 && (
        <AdminForm setSelectedButton={setSelectedButton} />
      )}
      {selectedButton === 3 && (
        <AddPatient1 />
      )}
      {selectedButton === 2 && (
        <AddEmployee setSelectedButton={setSelectedButton} />
      )}
      {selectedButton === 4 && <ViewPatients setSelectedButton={setSelectedButton}/>}
      {selectedButton === 5 && (
        <Payment setSelectedButton={setSelectedButton} />
      )}
      {selectedButton === 6 && (
        <PaymentList setSelectedButton={setSelectedButton} />
      )}
      {selectedButton === 7 && (
        <ActivityLogs setSelectedButton={setSelectedButton} setSelectedItem={setSelectedItem} />
      )}
      {selectedButton === 8 && (
        <Patients setSelectedButton={setSelectedButton} />
      )}
      {selectedButton === 9 && <Helps />}
      {selectedButton === 10 && <Abouts />}
      {selectedButton === 11 && <Report setSelectedButton={setSelectedButton}/>}
      {selectedButton === 12 && <ActivityDetails setSelectedButton={setSelectedButton} />}
    </Box>
  );
};

export default Sidebar;
