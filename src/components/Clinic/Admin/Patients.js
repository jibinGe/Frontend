import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Embryo/index.css";
import { Container, styled, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Delete } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import { useTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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

    marginTop: useTheme().spacing(1),
    marginRight: useTheme().spacing(2),
  },
  roundedPagination: {
    background: "none",
    "& .MuiPaginationItem-root": {
      borderRadius: "0%",
      backgroundColor: "#FFFFFF", // Change the background color here
      "&:hover": {
        backgroundColor: "#bdbdbd", // Change the hover background color here
      },
      "&.Mui-selected": {
        backgroundColor: "#607d8b", // Change the selected background color here
        color: "#ffffff", // Change the selected text color here
        "&:hover": {
          backgroundColor: "#455a64", // Change the selected hover background color here
        },
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

const Patients = ({ setSelectedButton }) => {
  const history = useNavigate();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const classes = useStyles();
  //const [uPage, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const rows = arr.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );
  const handleClick = () => {
    // setIsOpen(true);
    // props.setIsEdited(true);
    setSelectedButton(7);
  };
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
      <Box sx={{ background: "#ffffff" }}>
        <button
          style={{ marginLeft: 0, marginTop: 0, paddingBottom: 30 }}
          onClick={() => setSelectedButton(7)}
          className="back-button"
        >
          Back
        </button>
      </Box>
      <FormHeader>
        <Box sx={{ marginTop: "32px" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Patients List
          </Typography>
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
              <TableCell style={{ fontWeight: 600 }}>Report Date</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Contact No</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
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
                  1
                </TableCell>
                <TableCell>XYZ456</TableCell>
                <TableCell>Victoria</TableCell>
                <TableCell>Cameron</TableCell>
                <TableCell>07/06/2023</TableCell>
                <TableCell>+91-9563289751</TableCell>
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
                      }}
                      onClick={() => history("/report")}
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
                      }}
                    >
                      <BorderColorOutlinedIcon sx={{}} />
                    </Box>
                    <Box
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
                    >
                      <Delete sx={{}} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRows>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
};

export default Patients;
