import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmbryoDetails from "../helpers/embryoDetails";
import Embryo from "../Embryo/index";
import PatientDetails from "../Embryo/patientDetails";
import { useNavigate, useLocation } from "react-router-dom";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PrintIcon from '@mui/icons-material/Print';
const Download = () => {
    const [isEdit, setIsEdit] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isViewReport, setIsViewReport] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isSort, setSort] = useState(null);
  const history = useNavigate();
  const location = useLocation();
  var data = location.state;

  useEffect(() => {
    // if (isSort) {
    //   data = data.sort(function (a, b) {
    //     return a.percentage - b.percentage;
    //   });
    // } else if (!isSort) {
    //   data = data.sort(function (a, b) {
    //     return a.percentage - b.percentage;
    //   });
    //   data.reverse();
    // } else {
    // }
  }, [isSort]);

  const num = [85.732, 65.745, 40.465];
  return (
    <div>
      {isViewReport ? (
        <>
          <button onClick={() => history(-1)} className="back-button">
            Back
          </button>{" "}
          <PatientDetails />
        </>
      ) : (
        <Embryo isPresent={true} />
      )}
      <div className="emb-container col-12 col-md-12 ">
        <div className="flex-box">
          <div className="embryo-heading">Embryos</div>
          <div className="filter">
            <div className="filter__widget widget">
              <span>Search By</span>
              <input
                className="search-cycle-id"
                placeholder="Cycle Id"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  height: "32px",
                  width: "152px",
                }}
                type="text"
              ></input>
            </div>
            <div className="filter__widget flex-mid">
              <span style={{ marginRight: 0 }}>Sort By</span>
            </div>
            <div className="filter__widget flex-mid">
              <div className="select">Quality Score</div>
            </div>
            <div className=" filter__box" onClick={() => setSort(!isSort)}>
              {isCheck ? <ArrowUpwardIcon sx={{ color: "#6C7C93" }} onClick={()=> setIsCheck(false)}/>:<ArrowDownwardIcon sx={{ color: "#6C7C93" }} onClick={()=> setIsCheck(true)}/>}
            </div>
            <div>
              <SaveAltIcon/>
              <PrintIcon/>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {data &&
            data.map((d, index) => {
              let score = parseFloat(d.percentage).toFixed(2);
              let scoreColor =
                score >= 75
                  ? "8px solid #47D273"
                  : score >= 50
                  ? "8px solid #FAC20A"
                  : "8px solid #FB3B42";
              return (
                <EmbryoDetails
                  key={index}
                  setIsEdit={setIsEdit}
                  setIsEdited={setIsEdited}
                  border={scoreColor}
                  boxShadow={scoreColor}
                  score={score}
                  url={d.img}
                  filename={d.filename}
                />
              );
            })}
          {/* {isSort ? (
            <>
              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #47D273"
                background="#EFFBF3"
                score={num[0].toFixed(2)}
              />
              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #FAC20A"
                background="#FFFDF5"
                score={num[1].toFixed(2)}
              />
              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #FB3B42"
                background="#FFF5F5"
                score={num[2].toFixed(2)}
              />
            </>
          ) : (
            <>
              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #FB3B42"
                background="#FFF5F5"
                score={num[2].toFixed(2)}
              />

              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #FAC20A"
                background="#FFFDF5"
                score={num[1].toFixed(2)}
              />

              <EmbryoDetails
                setIsEdit={setIsEdit}
                setIsEdited={setIsEdited}
                border="6px solid #47D273"
                background="#EFFBF3"
                score={num[0].toFixed(2)}
              />
            </>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Download