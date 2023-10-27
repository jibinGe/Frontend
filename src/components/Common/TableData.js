import React, { useState, useEffect } from "react";
import {
  Container,
  styled,
  Box,
  Typography,
  Button,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import Cookies from "js-cookie";
import { formateDate } from "../../controllers/Essentials";
import Modal from "@mui/material/Modal";
import PatientForm from "./PateintForm";
const TableRows = styled(TableRow)({
  width: "95%",
  background: "#FFFFFF",
  boxSizing: "border-box",
  border: "1px solid #E2E5E9",
  borderRadius: "12px",
  padding: "12px",
});

const TableData = ({ item, index, deletePatient, page }) => {
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleEditButton = () => {
    // Cookies.set("patient", item[0], { expires: 1 });
    // localStorage.setItem("patient", item[1]);
    localStorage.setItem("patient", JSON.stringify(item));
    setIsOpen(true)
  //  history("/upload-images");
  };

  const handleReport = () => {
    localStorage.setItem("patient", JSON.stringify(item));

    history("/report");
  };

  function removePrefix(data) {
    const match = data.match(/\d+_(.+)/);
    return match ? match[1] : data;
  }

  return (
    <>
      <TableRows>
        <TableCell
          sx={{
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            border: "1px solid #E2E5E9",
            borderRight: "none",
          }}
        >
           {(page - 1) * 7 + index + 1}
        </TableCell>
        <TableCell>{item[1] ? removePrefix(item[1]) : ''}</TableCell>
        <TableCell>{item[2].split(" ")[0]}</TableCell>
        <TableCell>{item[2].split(" ")[1]}</TableCell>
        <TableCell>{formateDate(item[3])}</TableCell>
        <TableCell>{item[6]}</TableCell>
        <TableCell>{formateDate(item[8])}</TableCell>
        <TableCell 
          sx={{
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
            border: "1px solid #E2E5E9",
            borderLeft: "none",
          }}
        >
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Box
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "34px",
                background: "#CCF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00D2FE",
                cursor: "pointer" 
              }}
              onClick={handleReport}
            >
              <VisibilityOutlinedIcon sx={{}} />
            </Box>
            <Box
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "34px",
                background: "#E7F0FE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2279F5",
                cursor: "pointer" 
              }}
              onClick={handleEditButton}
            >
              <BorderColorOutlinedIcon sx={{}} />
            </Box>
            {/* <Box
              sx={{
                width: "32px",
                height: "32px",
                borderRadius: "34px",
                background: "#FEE6E7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FB3B42",
              }}
              onClick={deletePatient}
            >
              <Delete sx={{}} />
            </Box> */}
          </Box>
        </TableCell>
      </TableRows>

      <Modal
        open={isOpen}
          
      >
       
     
       
        <PatientForm setIsOpen={setIsOpen} isOpen={isOpen} />
         
      
    
      </Modal>    
    </>
  );
};

export default TableData;
