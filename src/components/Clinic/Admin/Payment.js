import React, { useState } from "react";
import "../../Embryo/index.css";
import {
  Container,
  styled,
  Box,
  Typography,
  Button,
  InputAdornment,
  MenuItem,FormControl, InputLabel, Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";

import { useTheme } from "@mui/material/styles";
 
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
import { formateDate } from "../../../controllers/Essentials";

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
      '& .MuiInputBase-root': {
        border: 'none', // Remove the border
         
      },
      '& .MuiInputBase-input': {
        
        background:"#FFFFFF",
        textAlign:"center" // Optional: Adjust the input padding if needed
      },
    },


  textField: {
    paddingBottom: "10px",
  },
}));
const FormHeader = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
const BoxContainer1 = styled(Button)({
  width: 80,
  height: 32,
  background: "#EBFAEF",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  
  borderRadius: "12px",
});
const BoxContainerDays = styled(Button)({
  width: 80,
  height: 32,
  background: "#FEF9E6",
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
const StyledTypography1 = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  color: "#47D273",
});

const StyledDaysLeft = styled(Typography)({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  color: "#FAC20A",
});

const Payment = ({ setSelectedButton }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const classes = useStyles();
  //const [uPage, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [PaymentDetails, setPaymentDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  const history = useNavigate();
  const currentMonth = new Date().getMonth() + 1; 
  const [filterOptions, setFilterOptions] = useState(currentMonth.toString());
  const currentYear = new Date().getFullYear().toString();
  const [filterOptionsyear, setFilterOptionsyear] = useState(currentYear);

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

 
  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }
 
  const handleFilterOptionChangeyear = (event) => {
    // Update the filter options based on the selected value
    setFilterOptionsyear(event.target.value);
  };

 
 
  React.useEffect(() => {

    let clinic = JSON.parse(localStorage.getItem("clinic"));
    

    const clinic_id = {
      clinic_id: clinic[0]
     
    };

    
    const fetchData = async () => {
      try {
        const data = await fetchJSON("clinic/payment-summary", "POST", clinic_id);
        console.log(data);
        setPaymentDetails(data.payment_summary);
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
  const filteredProducts = PaymentDetails.filter((payment) => {
    const matchesSearchQuery = payment.month
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

    

    if (searchQuery === "" && filterOptions === "") {
      return true; // Show all products when both search query and filter options are empty
    } else {
      return matchesSearchQuery;
    }
  });
  const handleClick = (value) => {
 
   
 
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
            Payments
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
              <TableCell sx={{ fontWeight: 600 }}>Payment Month </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Patients Scanned</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Next bill due date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due in</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Payment</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((item) => (
              <TableRows>
                <TableCell
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    border: "1px solid #E2E5E9",
                    borderRight: "none",
                  }}
                >
                  {item.payment_month}
                </TableCell>
                <TableCell>{item.patient_scanned}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{ formateDate(item.next_bill_due_date)}</TableCell>
                <TableCell>

                  <Box sx={{ display: "flex", gap: "5px" }}>
                    <BoxContainerDays variant="text" sx={{background : item.due!=="__" ? "#FEF9E6" : "#FFFFFF",boxShadow  : item.due!=="__" ? "0px 2px 40px rgba(34, 121, 245, 0.15)" : "0px 2px 40px #FFFFFF"}}  onClick={handleClick}>
                      <StyledDaysLeft variant="h6" component="h6">
                        {item.due_in}
                      </StyledDaysLeft>
                    </BoxContainerDays>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    border: "1px solid #E2E5E9",
                    borderLeft: "none",
                  }}
                >
                  {item.due !== "__" ? (
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    <BoxContainer variant="text" onClick={handleClick}>
                      <StyledTypography variant="h6" component="h6">
                        Pay
                      </StyledTypography>
                    </BoxContainer>
                  </Box>) : <Box sx={{ display: "flex", gap: "5px" }}>
                    <BoxContainer1 disabled variant="text" onClick={handleClick}>
                      <StyledTypography1 variant="h6" component="h6">
                        Paid
                      </StyledTypography1>
                    </BoxContainer1>
                  </Box>}
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

export default Payment;
