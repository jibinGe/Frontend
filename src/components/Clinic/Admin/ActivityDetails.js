import React, { useState, useEffect } from "react";
import "../../Embryo/index.css";
 
import Profile from "../../../Images/profile-image.png";
 
 
 

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
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Pagination from "@mui/material/Pagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { DeleteForever } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { fetchJSON } from "../../../controllers/Essentials";
import TableData from "../../Common/EmployeeData";
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",

    marginTop: useTheme().spacing(2),
    marginRight: useTheme().spacing(2),
  },
  roundedPagination: {
    background: "none",
    "& .MuiPaginationItem-root": {
      border: "none",
      outline: "none",
      borderRadius: "8px",
      color: "#2279F5",
      backgroundColor: "#FFFFFF", // Change the background color here
      "&:hover": {
        background: "#FFFFFF",
        borderColor: "#2279F5", // Change the hover background color here
      },
      "& button": {
        borderColor: "#2279F5", // Set the desired border color
      },
      "&.Mui-selected": {
        color: "#2279F5",
        border: "1px solid #2279F5",
        background: "#FFFFFF", // Change the selected text color here
        // '&:hover': {
        //   backgroundColor: '#455a64', // Change the selected hover background color here
        // },
      },
    },
  },

  root: {
    "& .MuiInputBase-root": {
      border: "none", // Remove the border
      // Optional: Set the border radius if needed
    },
    "& .MuiInputBase-input": {
      background: "#FFFFFF", // Optional: Adjust the input padding if needed
    },
  },

  roots: {
    "& .MuiInputBase-root": {
      border: "none",
      marginRight: "80px",

      // Remove the border
      // Optional: Set the border radius if needed
    },
    "& .MuiInputBase-input": {},
  },

  textField: {
    paddingBottom: "10px",
  },
}));

// const useStyles = makeStyles({
//     tableRow: {
//       margin: '10px 0',
//       borderSpacing: '4px' ,
//       borderRadius:'12px' // Set the desired margin between rows
//     },
//   });

const FormHeader = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const FormTable = styled(Container)({
  width: "95%",
  background: "#FFFFFF",
  boxSizing: "border-box",
  border: "1px solid #E2E5E9",
  borderRadius: "12px",
  padding: "12px",
});

const TableRows = styled(TableRow)({
  width: "95%",
  background: "#FFFFFF",
  boxSizing: "border-box",
  border: "1px solid #E2E5E9",
  borderRadius: "12px",
  padding: "12px",
});
const Text = styled(TextField)({
  width: "88px",
  height: "44px",
  background: "#FFFFFF",
});

const BoxContainer = styled(Button)({
  width: 80,
  height: 32,
  background: "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  boxShadow: "0px 2px 40px rgba(34, 121, 245, 0.15)",
  borderRadius: "12px",
});

const StyledTypography = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  color: "#FFFFFF",
});

const ActivityDetails = ({ setSelectedButton,setSelectedItem }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const classes = useStyles();
  //const [uPage, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [EmployeeDetails, seEmployeeDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const history = useNavigate();
 
  //const [uPage, setPage] = useState(1);
 
  const [dele, setDelete] = useState();

  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const showDeleteConfirmation = (item) => {
    setDeleteConfirmation(item);
  };

  const handleDeleteConfirmation = () => {
    if (deleteConfirmation) {
      deleteEmployee(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };
  
  const deleteEmployee = async (item) => {
    let hit = await fetchJSON("employee/delete", "POST", {
      patient_id: item[1],
    });

    setDelete(true);
  };

  React.useEffect(() => {
  
   
  let patientInfo = JSON.parse(localStorage.getItem("employee"));
    const date = new Date().toISOString().slice(0, 10);
    //fetchJSON("activitylog/filter?employee_name=abrahamscaria83@gmail.com&action_date=2023-08-13",  "GET", "")
   fetchJSON("activitylog/filter?employee_name="+patientInfo.EmployeeEmail + "&action_date=" + patientInfo.LoginDate,  "GET", "")
      .then((data) => {
         console.log(data);
        seEmployeeDetails(data.activity_details);
      })
      .catch((ERR) => {
        alert("refresh and login again");
      //  history("/");
      });
      return () => {
        console.log("Component unmounting/cleanup");
      };
  }, []);

  function removePrefix(data) {
    const match = data.match(/\d+_(.+)/);
    return match ? match[1] : data;
  }
  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }
  const handleFilterOptionChange = (event) => {
    // Update the filter options based on the selected value
    setFilterOptions(event.target.value);
  };
  const filteredProducts = EmployeeDetails.filter((employee) => {
    const matchesSearchQuery = employee.PatientName
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
    if (searchQuery === "" && filterOptions === "") {
      return true; // Show all products when both search query and filter options are empty
    } else {
      return matchesSearchQuery;
    }
  });
  const handleClick = () => {
 
  setSelectedButton(7);

  
  }
  const rows = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  return (
    <Box
      sx={{
        width: "73%",
        height: 880,
        margin: "40px auto",
        background: "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
        borderRadius: "12px",
      }}
    > 
      <FormHeader>
      <div>
    <button onClick={() =>   handleClick()} className="back-button">
      Back
    </button>
  </div>
        <Box sx={{ marginTop: "32px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Actvity Details
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              marginTop: "32px",
            }}
          >
            
            
          </Box>
        </Box>
      </FormHeader>

      <Container>
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
          <TableHead sx={{ marginBottom: "0px", borderBottom: "none" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}># </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Patient ID</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Patient Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item,index) => (
              <TableRows>
                <TableCell
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    border: "1px solid #E2E5E9",
                    borderRight: "none",
                  }}
                >
               {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <Box>
                    <img src={Profile} />
                    <span style={{ marginLeft: "5px" }}>{item.PatientId ? removePrefix(item.PatientId) : ''}</span> 
                    {/* {item.PatientId ? removePrefix(item.PatientId) : ''} */}
                  </Box>
                </TableCell>
                <TableCell>{item.PatientName}</TableCell>
                <TableCell>{item.Action}</TableCell>
              
           
              </TableRows>
            ))}
          </TableBody>
        </Table>
        <div className={classes.pagination}>
        <Pagination
          className={classes.roundedPagination}
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
      </Container>

     
    </Box>
  );
};

export default ActivityDetails;
