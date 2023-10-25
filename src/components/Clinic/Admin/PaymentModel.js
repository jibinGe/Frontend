import React from 'react'
import "../../helpers/helper.css";
import {
    Container,
    styled,
    Box,
    Typography,
    Button,
    InputAdornment,
    MenuItem,
    Modal,
  } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//import EmbryoImage from "../../Images/image-modal.png";
const PaymentModel = ({setIsOpen}) => {
    const onClose = () => {
        setIsOpen(false);
      };
  return (
    <div className="image-box1">
            <button className="close-button" onClick={onClose}>
            <CloseIcon sx={{ color: "#6C7C93" }} />
        </button>
        
        <Box sx={{width:"240px",height:"86px",background:"#47D273",textAlign:"center",boxShadow: "0px 2px 40px rgba(34, 121, 245, 0.15)",
borderRadius: "12px"}}>
            <Box sx={{
            marginTop:"14px",
            display: "flex",
            
            justifyContent: "space-around",
            
          }}>
            <Typography variant="p" sx={{color:"white"}}>Bill due date</Typography>
            <Typography variant="p" sx={{color:"white"}}>26/06/2023</Typography>
            </Box>
            <Button style={{width:"48px",height:"32px",fontSize:"12px",fontWeight:700,lineHeight:"14px",fontFamily: 'Roboto',
fontStyle: "normal",color: "#2279F5",background:"#FFFFFF",outline:"none",border:"none",marginTop:"8px",
borderRadius: "12px"}}>Paid</Button>
           
    </Box>
    </div>
        
  )
}

export default PaymentModel