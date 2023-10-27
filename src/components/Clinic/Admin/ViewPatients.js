import React, { useState, useEffect } from "react";
import "../../Embryo/index.css";
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
import TableData from "../../Common/TableData";
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
    },
    "& .MuiInputBase-input": {
      background: "#FFFFFF",
      textAlign: "center", // Optional: Adjust the input padding if needed
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

// const TableRows = styled(TableRow)({
//   width: "95%",
//   background: "#FFFFFF",
//   boxSizing: "border-box",
//   border: "1px solid #E2E5E9",
//   borderRadius: "12px",
//   padding: "12px",
// });
const Text = styled(TextField)({
  width: 88,
  height: 44,
  background: "#FFFFFF",
  borderRadius: "5px",
  marginRight: "20px",
  paddingTop: "10px",
  paddingLeft: "15px",
  border: "none",
});

const BoxContainer = styled(Button)({
  width: 196,
  height: 40,
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
  color: "#6C7C93",
});

const ViewPatients = ({ setSelectedButton }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const [PatientsDetails, setPatientsDetails] = useState([]);
  //const [isSearch,setIsSearch]=useSate(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentMonth = new Date().getMonth() + 1; 
  const [filterOptions, setFilterOptions] = useState(currentMonth.toString());
  const currentYear = new Date().getFullYear().toString();

  const [filterOptionsyear, setFilterOptionsyear] = useState(currentYear);
  const history = useNavigate();
  const classes = useStyles();
  //const [uPage, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
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
  const handleClick = (value) => {
    // setIsOpen(true);
 

      
     setSelectedButton(12,value);

  
  };
  const handleDeleteConfirmation = () => {
    if (deleteConfirmation) {
      deletePatient(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };
  
  const deletePatient = async (item) => {
    let hit = await fetchJSON("patient/delete", "POST", {
      patient_id: item[1],
    });  

    setDelete(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJSON("patient/get", "GET", "");
        setPatientsDetails(data.patients);
      } catch (err) {
      //  alert("refresh and login again");
        //history.push("/");
      }
    };

    fetchData();
  }, []); // Don't forget to include `history` in your dependency array as you're using it inside the useEffect.


   
  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }
  const handleFilterOptionChange = (event) => {
    // Update the filter options based on the selected value
    setFilterOptions(event.target.value);
  };
  const handleFilterOptionChangeyear = (event) => {
    // Update the filter options based on the selected value
    setFilterOptionsyear(event.target.value);
  };


  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getMonth() + 1; // Months are zero-indexed, so January is 0 and December is 11. We add 1 to match normal human understanding of months.
  };
  const filteredProducts = PatientsDetails.filter((patient) => {
      const matchesSearchQuery = patient[2]
        .split(" ")[0]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
        const matchesPatientId = patient[1]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());


      
        // Assuming filterOptions is a property in patient object.
        const date = new Date(patient[8]);
        const formattedDate = date.toLocaleDateString("en-GB");

        console.log(matchesPatientId);
     

      const yearFromPatient = formattedDate.split("/")[2]; 
      console.log(yearFromPatient);
      const monthFromPatient = formattedDate.split("/")[1]; 
      console.log(monthFromPatient);

      const matchesYear = yearFromPatient === filterOptionsyear;
      const matchesMonth = parseInt(monthFromPatient,10) === parseInt(filterOptions,10);
      console.log(filterOptionsyear);
      console.log("matchesMonth" + matchesMonth);
      const isMatch = matchesYear && matchesMonth;

      console.log(isMatch);


      
    if (searchQuery === "" && filterOptions === "") {
      return true; // Show all products when both search query and filter options are empty
    } else {
      return (matchesSearchQuery  || matchesPatientId) &&  isMatch ;
    }
  });
  

  const rows = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  console.log(rows,"DDDDDDDDDDDDD")
  return (
    <Box sx={{ width: "77%", height: "100%" }}>
      <Box
        sx={{
          width: "94%",
          height: "100%",
          margin: "40px auto",
          background: "linear-gradient(360deg, #CEE1FD 8.33%, #CCF6FF 91.67%)",
          borderRadius: "12px",
        }}
      >
        <FormHeader>
          <Box sx={{ marginTop: "32px" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Patients List
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
              maxWidth="md"
              sx={{ display: "flex", alignItems: "center", marginTop: "32px" }}
            >
              <TextField
                variant="standard"
                type="search"
                placeholder="Search by Patient id, name"
                className={classes.textField}
                onChange={handleSearch}
                value={searchQuery}
                sx={{
                  width: 300,
                  height: 44,
                  background: "#FFFFFF",
                  borderRadius: "5px",
                  marginRight: "20px",
                  paddingTop: "10px",
                  paddingLeft: "15px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ paddingRight: "20px" }}
                      position="end"
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                marginTop: "32px",
              }}
            >
              <Typography variant="span">Filter by</Typography>
              <FormControl>
                <select
                  id="cars"
                  className="inpt5"
                  name="cars"
                  value={filterOptions}
                  onChange={handleFilterOptionChange}
                  multiple={false}
                >
                  <option value="" disabled selected>
                    Month
                  </option>
                 
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))} 
      
                </select>
              </FormControl>

              <FormControl>
                <select
                  id="cars"
                  value={filterOptionsyear}
                  onChange={handleFilterOptionChangeyear}
                  className="inpt6"
                  name="cars"
                  multiple={false}
                >
                  {/* <option value="" disabled selected>
                    Year
                  </option> */}
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
                <TableCell style={{ fontWeight: 600 }}>Patient Id</TableCell>
                <TableCell style={{ fontWeight: 600 }}>First Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Last Name</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Date of Birth</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Contact No</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Admit Date</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((item, index) => (
                <TableData
                  key={index}
                  item={item}
                  deletePatient={() => showDeleteConfirmation(item)}
                  index={index} 
                  page={page} 
                />
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
        {deleteConfirmation && (
        <tr>
          <td colSpan="7">
            Are you sure you want to delete?
            <button onClick={handleDeleteConfirmation}>Confirm</button>
            <button onClick={() => setDeleteConfirmation(null)}>Cancel</button>
          </td>
        </tr>
      )}
      </Box>
    </Box>
  );
};

export default ViewPatients;
