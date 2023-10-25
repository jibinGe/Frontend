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
import Modal from "@mui/material/Modal";
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

import AddEmployee from "../Clinic/Admin/addEmployee";
 import EmployeeForm from "./EmployeeForm";

const TableRows = styled(TableRow)({
  width: "95%",
  background: "#FFFFFF",
  boxSizing: "border-box",
  border: "1px solid #E2E5E9",
  borderRadius: "12px",
  padding: "12px",
}); 

const TableData = ({ item, index, deletePatient }) => {
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEditButton = () => {
    // Cookies.set("patient", item[0], { expires: 1 });
   localStorage.setItem("employee", JSON.stringify(item));
   
    setIsOpen(true)
   // history("/upload-images");
  };

  const handleReport = () => {
    localStorage.setItem("patient", JSON.stringify(item));

   // history("/report");
  };

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
          {index + 1}
        </TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.fullname}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.mobile}</TableCell>
        <TableCell>{item.accesslevel}</TableCell>
        
      
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
        <div className="container1">
      <div className="out-box3 ">
        <div className="contain1 ">
        <EmployeeForm setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      </div>
    </div>
      </Modal>             
                        
                      

    </>
  );
};

export default TableData;
