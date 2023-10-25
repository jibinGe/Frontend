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

const ActivityLogs = ({ setSelectedButton,setSelectedItem }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const classes = useStyles();
  //const [uPage, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [EmployeeDetails, setEmployeeDetails] = useState([]);
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
    const fetchData = async () => {
      try {
        const data = await fetchJSON("activitylog/details", "GET", "");
        console.log(data);
        setEmployeeDetails(data.activity_details);
      } catch (ERR) {
       // alert("refresh and login again");
      //  history("/");
      }
    };
    
    fetchData();
  }, []);
  


  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }
  const handleFilterOptionChange = (event) => {
    // Update the filter options based on the selected value
    setFilterOptions(event.target.value);
  };
  const filteredProducts = EmployeeDetails.filter((employee) => {
    const matchesSearchQuery = employee.EmployeeName
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
    if (searchQuery === "" && filterOptions === "") {
      return true; // Show all products when both search query and filter options are empty
    } else {
      return matchesSearchQuery;
    }
  });
  const handleClick = (value) => {
 
    console.log("sele value : "+ JSON.stringify(value))
    localStorage.setItem("employee", JSON.stringify(value));
 
     setSelectedButton(12,value);

  
  };
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
        <Box sx={{ marginTop: "32px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Actvity Logs
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
            <FormControl>
              <select
                id="cars"
                className="inpt5"
                style={{ width: "200px" }}
                name="cars"
              >
                <option value="" disabled selected >Employees</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </FormControl>

            <Typography variant="span">Filter by</Typography>
            <FormControl>
              <select id="cars" className="inpt5" name="cars">
                <option value="" disabled selected >Month</option>
                {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      
              </select>
            </FormControl>

            <FormControl>
              <select id="cars" className="inpt5" name="cars">
                <option value="" disabled selected >Year</option>
                <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
              </select>
            </FormControl>
          </Box>
        </Box>
      </FormHeader>

      <Container>
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
          <TableHead sx={{ marginBottom: "0px", borderBottom: "none" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}># </TableCell>
              <TableCell style={{ fontWeight: 600 }}>Employee Name</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Login date</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Login Time</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Count</TableCell>
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
                    <span style={{ marginLeft: "5px" }}>{item.EmployeeName}</span>
                  </Box>
                </TableCell>
                <TableCell>{item.LoginDate}</TableCell>
                <TableCell>{item.LoginTime}</TableCell>
                <TableCell>{item.created_count}</TableCell>
                <TableCell
                  sx={{
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    border: "1px solid #E2E5E9",
                    borderLeft: "none",
                  }}
                >
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
                    onClick={() => handleClick(item) }
                  
                  >
                    <VisibilityOutlinedIcon sx={{}} />
                  </Box>
                
                </TableCell>
              </TableRows>
            ))}
          </TableBody>
        </Table>
      </Container>

      <div className={classes.pagination}>
        <Pagination
          className={classes.roundedPagination}
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </Box>
  );
};

export default ActivityLogs;
