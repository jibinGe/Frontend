import React from "react";
import "./Detail.css";
import {
  Container,
  styled,
  Box,
  Typography,
  Button,
  InputAdornment,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { display, height, padding } from "@mui/system";
import { calculate_age } from "../../../controllers/Essentials";

const TableContainer = styled(Box)({
  width: "70%",
  height: "20%",
  background: "#E6FBFF",
  padding: "20px 40px 20px 40px",
  display: "flex",
  justifyContent: "space-between",
  margin: "0px auto ",
});

function removePrefix(data) {
  const match = data.match(/\d+_(.+)/);
  return match ? match[1] : data;
}

const Details = ({ totalEmbryo }) => {
  const patientInfo = JSON.parse(localStorage.getItem("patient"));
  const PatientData = {
    "Patient Id": patientInfo[1],
    Name: patientInfo[2],
    Age: calculate_age(patientInfo[3]),
    DOB: new Date(patientInfo[3]).toISOString().split("T")[0],
  };
  const ClinicData = {
    "Clinic Name": JSON.parse(localStorage.getItem("clinic"))[1],
    "Dr. Name": JSON.parse(localStorage.getItem("clinic"))[7],
  };

  const data = {
    Date: new Date().toISOString().split("T")[0],
    Embryos: totalEmbryo,
  };

  const entries = Object.entries(data);

  return (
    <TableContainer>
      <Box sx={{ width: "20%" }}>
        <Table sx={{}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>Patients</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(PatientData).map(([key, value]) => (
              <>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="td"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {key}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{value}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ width: "20%" }}>
        <Table sx={{}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>Clinic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ClinicData).map(([key, value]) => (
              <>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="td"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {key}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{value}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ width: "20%" }}>
        <Table sx={{}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none" }}>Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(([key, value]) => (
              <>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="td"
                    scope="row"
                    sx={{ borderBottom: "none" }}
                  >
                    {key}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{value}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default Details;
