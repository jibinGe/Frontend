import React, { useState, useEffect } from "react";
import "../../Embryo/index.css";
import {
  Container,
  styled,
  Box,
  Typography,
  Button,
  Modal,FormControl
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PaymentModel from "./PaymentModel";
import { IndeterminateCheckBox } from "@mui/icons-material";
 
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
 
import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
 
import { DeleteForever } from "@mui/icons-material";
import { fetchJSON } from "../../../controllers/Essentials";

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
    display: 'flex',
    justifyContent: 'center',
    
    marginTop: useTheme().spacing(2),
    marginRight: useTheme().spacing(2),

  },
    roundedPagination: {
      background:"none",
      '& .MuiPaginationItem-root': {
        border: 'none',
        outline:"none",
        borderRadius: '8px',
        color: '#2279F5',
        backgroundColor: '#FFFFFF',// Change the background color here
        '&:hover': {
          background:"#FFFFFF",
          borderColor: '#2279F5', // Change the hover background color here
        },
        '& button': {
          borderColor: '#2279F5', // Set the desired border color
        },
        '&.Mui-selected': {
          color:"#2279F5",
          border: '1px solid #2279F5',
          background:"#FFFFFF", // Change the selected text color here
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
const PaymentList = ({ setSelectedButton }) => {
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

  const [isOpen, setIsOpen] = useState("");
  

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
        const data = await fetchJSON("/clinic/topay", "POST", "");
        console.log(data);
        setEmployeeDetails(data.payment_summary);
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
  const filteredProducts = EmployeeDetails?.filter((employee) => {
    const matchesSearchQuery = employee.month
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
  const rows = filteredProducts?.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  return (
    <>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Box>
          <button  style={{marginLeft:0, marginTop:0, paddingBottom:20}} onClick={() => setSelectedButton(5)} className="back-button">
            Back
          </button>
        </Box>
        <Box
          sx={{
            width: "94%",
            height: 880,
            margin: "5px 40px auto",
            background:
              "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
            borderRadius: "12px",
          }}
        >
          <FormHeader>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                June 2023 Patients List
              </Typography>
            </Box>
            <Box
              sx={{
                width: "500px",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                marginTop: "32px",
              }}
            >
              <Box
                sx={{
                  width: "240px",
                  height: "86px",
                  background: "#2279F5",
                  textAlign: "center",
                  boxShadow: "0px 2px 40px rgba(34, 121, 245, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  Patients Scanned
                </Typography>
                <Typography variant="h4" sx={{ color: "white" }}>
                  50
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "240px",
                  height: "86px",
                  background: "#47D273",
                  textAlign: "center",
                  boxShadow: "0px 2px 40px rgba(34, 121, 245, 0.15)",
                  borderRadius: "12px",
                }}
              >
                <Box
                  sx={{
                    marginTop: "14px",
                    display: "flex",

                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="p" sx={{ color: "white" }}>
                    Bill due date
                  </Typography>
                  <Typography variant="p" sx={{ color: "white" }}>
                    26/06/2023
                  </Typography>
                </Box>
                <Box
                  sx={{
                    wiedth: "192px",
                    heigth: "32px",
                    ackground: "#FFFFFF",
                    borderRadius: "12px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Due Amount"
                    style={{
                      width: "96px",
                      height: "32px",
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "14px",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      color: "#010B18",
                      outline: "none",
                      border: "none",
                      borderRadius: "12px 0px 0px 12px",
                    }}
                  />
                  <Button
                    style={{
                      width: "48px",
                      height: "32px",
                      fontSize: "12px",
                      fontWeight: 700,
                      lineHeight: "14px",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      color: "#010B18",
                      background: "",
                      outline: "none",
                      border: "none",
                      background:
                        "linear-gradient(360deg, #2279F5 8.33%, #00D2FE 91.67%)",
                      borderRadius: "0px 12px 12px 0px",
                      color: "#FFFFFF",
                    }}
                    onClick={() => setIsOpen(true)}
                  >
                    Pay
                  </Button>
                </Box>
              </Box>
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
                }}
              >
                <Typography variant="span">Filter by</Typography>
                <FormControl>
          <select id="cars" className="inpt5" name="cars" >
                    <option value="" disabled selected>Month</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
          </FormControl>
        
    <FormControl>
    <select id="cars" className="inpt5" name="cars" >
                    <option value="" disabled selected>Year</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
    </FormControl>
                {/* <Text
                  id="outlined-select-currency"
                  select
                  label="Year"
                  defaultValue="1996"
                  className={classes.root}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Text> */}
              </Box>
            </Box>
          </FormHeader>

          <Container>
            <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
              <TableHead sx={{ marginBottom: "0px", borderBottom: "none" }}>
                <TableRow>
                  <TableCell sx={{fontWeight:600}}># </TableCell>
                  <TableCell sx={{fontWeight:600}}>Patient Id</TableCell>
                  <TableCell sx={{fontWeight:600}}>First Name</TableCell>
                  <TableCell sx={{fontWeight:600}}>Last Name</TableCell>
                  <TableCell sx={{fontWeight:600}}>Date of Scan</TableCell>
                  <TableCell sx={{fontWeight:600}}>Contact No</TableCell>
                  {/* <TableCell sx={{fontWeight:600}}>Actions</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows?.map((item) => (
                  <TableRows>
                    <TableCell
                      sx={{
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        border: "1px solid #E2E5E9",
                        borderRight: "none",
                      }}
                    >
                      1
                    </TableCell>
                    <TableCell>XYZ456</TableCell>
                    <TableCell>Victoria</TableCell>
                    <TableCell>Cameron</TableCell>
                    <TableCell>07/06/2023</TableCell>
                    <TableCell>+91-864328732</TableCell>
                    {/* <TableCell
                      sx={{
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        border: "1px solid #E2E5E9",
                        borderLeft: "none",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <BoxContainer variant="text">
                          <StyledTypography variant="h6" component="h6">
                            Pay
                          </StyledTypography>
                        </BoxContainer>
                      </Box>
                    </TableCell> */}
                  </TableRows>
                ))}
              </TableBody>
            </Table>
          </Container>

          <div className={classes.pagination}>
            <Pagination
              className={classes.roundedPagination}
              count={2}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </Box>
      </Box>
      <Modal open={isOpen}>
        <PaymentModel setIsOpen={setIsOpen}></PaymentModel>
      </Modal>
    </>
  );
};

export default PaymentList;
