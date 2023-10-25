import React from "react";
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
  Card,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Embryo from "../../../Images/embryo-no.png";
const ScoreContainer = styled(Box)({
  width: "100%",
  height: "120px",
  background: "#E6FBFF",
  display: "flex",
  borderRadius: "12px",
  justifyContent: "space-between",
  alignItems: "center",
});

const EmbryoScore = ({ embryoData, patient_id }) => {
  return (
    <Box sx={{ margin: "0 39px", width: "70%", margin: "15px auto" }}>
      <Typography variant="h2">How each Embryo Scored</Typography>

      {embryoData.length &&
        embryoData?.map((embryo, index) => {
          return (
            <ScoreContainer key={index}>
              <Box
                sx={{
                  display: "flex",
                  width: "230px",
                  height: "120px",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={embryo.embryo_link
                  }
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                  }}
                />
                <Box
                  sx={{
                    width: "60px",
                    height: "120px",
                    background: "#468FF7",
                    borderRadius: "8px",
                    marginLeft: "19px",
                  }}
                ></Box>
              </Box>

              <Box sx={{ padding: "0 36px", width: "168px", height: "93px" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "21px",
                    letterSpacing: "4%",
                  }}
                >
                  Embryo Score
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "24px",
                    fontWeight: 800,
                    lineHeight: "36px",
                    letterSpacing: "4%",
                  }}
                >
                  {embryo.percentage?.toFixed(2)}/100
                </Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <Table sx={{}} size="small" aria-label="a dense table">
                  <TableBody>
                    {Object.entries({
                      "Embryo No": embryo.embryo_number,
                      "Embryo Age": embryo.embryo_age,
                      "Patient Id": embryo.patient_id,
                      "Cycle Id": embryo.cycle_id,
                    }).map(([key, value]) => (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                            "& > *": {
                              padding: 0.3,
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
                          <TableCell sx={{ borderBottom: "none" }}>
                            {value}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </ScoreContainer>
          );
        })}
    </Box>
  );
};

export default EmbryoScore;
