import React, { useState} from "react";
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

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",

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

  textField: {
    paddingBottom: "10px",
  },
}));

const FormHeader = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "28px",
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
const TableHeader = styled(Container)({
  width: "95%",
  marginBottom: "0px",
  marginTop: "28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const BoxContainer = styled(Button)({
  width: 196,
  height: 48,
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

const AdminForm = ({ setSelectedButton, selectedButton }) => {
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
    setDelete(false);
    fetchJSON("employee/get", "GET", "")
      .then((data) => {
         console.log(data);
        seEmployeeDetails(data.users);
      })
      .catch((ERR) => {
       // alert("refresh and login again");
        //history("/");
      });
  }, [dele]);


  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }
  const handleFilterOptionChange = (event) => {
    // Update the filter options based on the selected value
    setFilterOptions(event.target.value);
  };
  const filteredProducts = EmployeeDetails.filter((employee) => {
    const matchesSearchQuery = employee.fullname
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
    if (searchQuery === "" && filterOptions === "") {
      return true; // Show all products when both search query and filter options are empty
    } else {
      return matchesSearchQuery;
    }
  });
  const handleClick = () => {
    // setIsOpen(true);
    // props.setIsEdited(true);
    setSelectedButton(2);
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
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
            }}
            variant="h3"
          >
            Admin Panel
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Box maxWidth="md" sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="standard"
              type="search"
              placeholder="Search by employee id, name"
              className={classes.textField}
              onChange={handleSearch}
              value={searchQuery}
              sx={{
                width: 300,
                height:44,
                background: "#FFFFFF",
                borderRadius: "5px",
                marginRight: "20px",
                paddingTop:"10px",
                paddingLeft:"15px"
                
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment sx={{paddingRight:"20px"}} position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          </Box>

          <Box>
            <BoxContainer variant="text" onClick={handleClick}>
              <StyledTypography
                sx={{
                  color: "#ffffff",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
                variant="h6"
                component="h6"
              >
                Add New Employee
              </StyledTypography>
            </BoxContainer>
          </Box>
        </Box>
      </FormHeader>

      <Container>
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 15px" }}>
          <TableHead sx={{ marginBottom: "0px", borderBottom: "none" }}>
            <TableRow>
              <TableCell sx={{fontWeight:600}} ># </TableCell>
              <TableCell sx={{fontWeight:600}}  >Employee Id</TableCell>
              <TableCell sx={{fontWeight:600}}>Name</TableCell>
              <TableCell sx={{fontWeight:600}}>Email</TableCell>
              <TableCell sx={{fontWeight:600}}>Contact No</TableCell>
              <TableCell sx={{fontWeight:600}}>Account Access</TableCell>
              <TableCell sx={{fontWeight:600}}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {rows?.map((item, index) => (
                <TableData
                  key={index}
                  item={item}
                  deleteEmployee={() => showDeleteConfirmation(item)}
                  index={index}
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
    </Box>
  );
};

export default AdminForm;