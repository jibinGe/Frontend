import React, { useState, useEffect } from "react";
import Embryo from "../../Images/embryo-no.png";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "../../App.css";
import EmbryoScoreBar from "./embryoViabilityScoreBar";
import Edit from "./Edit";
import { Modal } from "@mui/material";
import ImageModal from "./imageModal";
import Edit1 from '../../Icons/Edit1.svg'
function EmbryoDetails(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValues, setInputValues] = useState({
    embryoNumber: { value: props.embryo_number, modified: false },
    embryoName: { value: props.embryo_name, modified: false },
    embryoAge: { value: props.embryo_age, modified: false },
    embryoCycleId: { value: props.cycle_id, modified: false },
    embryoCollectionDate: { value:  props.collection_date ? new Date(props.collection_date).toISOString().substr(0, 10) : '' , modified: false },
    embryoTransferDate: { value: props.transfer_date ? new Date(props.transfer_date).toISOString().substr(0, 10) : '', modified: false },
    Pregnancy: { value:  props.pregnancy, modified: false },
    embryo_status: { value:  props.embryo_status, modified: false },
    Live: { value:  props.live_birth, modified: false },
    Clinic:{value:  props.clinical_notes,modified:false},
    patient_id:{value:  props.patient_id,modified:false},
    id:{value: props.id,modified:false}
  });

 


  const [imageStatus, setImageStatus] = useState({ text: props.embryo_status, color: ""});
 
  const [isOpen, setIsOpen] = useState(false);
   const [embryoNumber,setEmbryoNumber]=useState("")
   const backgroundColor =
   props.embryo_status === 'Transferred'
     ? '#2279F5'
     : props.embryo_status === 'Frozen'
     ? '#00D2FE'
     : props.embryo_status === 'Discarded'
     ? '#FB3B42'
     : '';


   
  // const backgroundColor = props.embryo_status === 'Frozen' ? '#00D2FE' : "";
 const [embryo_name,setEmbryoName]=useState( inputValues.embryoName.value)
  // const [embryoAge,setEmbryoAge]=useState("")
  // const [embryoCycleId,setEmbryoCycleId]=useState("")
  // const [embryoCollectionDate,setEmbryoCollectionDate]=useState("")
  // const [embryoTransferDate,setEmbryoTransferDate]=useState("")
  // useEffect(()=>{
  //   EmbryoDetails(props)
  // },[props.score])
  return (
    <>
      {isEdit ? (
        <Edit
          inputValues={inputValues}
          setInputValues={setInputValues}
           embryoNumber={props.embryo_number}
           setEmbryoNumber={embryoNumber}
           embryo_name={embryo_name}
           setEmbryoName={setEmbryoName}
          // embryoAge={embryoAge}
          // setEmbryoAge={setEmbryoAge}
          // embryoCycleId={embryoCycleId}
          // setEmbryoCycleId={setEmbryoCycleId}
          // embryoCollectionDate={embryoCollectionDate}
          // setEmbryoCollectionDate={setEmbryoCollectionDate}
          // embryoTransferDate={embryoTransferDate}
          // setEmbryoTransferDate={setEmbryoTransferDate}
          setIsEdit={setIsEdit}
          setIsEdited={props.setIsEdited}
          setImageStatus={setImageStatus}
          border={props.border}
          background={props.background}
          imageStatus={imageStatus}
          score={props.score}
          url={props.url}
          filename={props.filename}
          
          embryo_number={props.embryo_number}
         
          embryo_age={props.embryo_age}
          cycle_id={props.cycle_id}
          scan_date={props.scan_date}
          collection_date={props.collection_date}
          transfer_date={props.transfer_date}
          pregnancy={props.pregnancy}
          live_birth={props.live_birth}
          clinical_notes={props.clinical_notes}
          embryo_status={props.embryo_status}
          embryo_link={props.embryo_link}
          patient_id={props.patient_id}
          id={props.id}

        />
      ) : (
        <div
          className="emb-box "
          style={{ border: props.border, background: props.background }}
        >
          <div className="box5">
            <div className="txt10" style={{ background: backgroundColor }}>
              <span className="txt12">{props.embryo_status}</span>
            </div>
            <div style={{width:"82%"}}>
              <img
                style={{ border: isOpen ? "4px solid #010B18" : "", margin: 10 }}
                onClick={() => setIsOpen(true)}
                className="emb-img"
                src={props.url}
                alt=""
              />
              <div className="image-name" style={{ textAlign: "center" }}>
                {props.filename}
              </div>
            </div>
            
          </div>
          <div style={{ width: "83%", height: "20%" }}>
            <div style={{ display: "flex", marginTop: 35 ,width:"100%"}}>
              <div className="emb-box2">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "15px",
                    marginTop:"20px"
                  }}
                >
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Embryo Number
                    </p>
                    <p>{props.embryo_number}</p>
                  </div>
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Embryo Name
                    </p>
                    <p>{ props.embryo_name}</p>
                  </div>
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Embryo Age
                    </p>
                    <p>{props.embryo_age}</p>
                  </div>
                  <div>
                    <p
                      style={{
                        marginBottom: 0,
                        marginRight: 11,
                        color: "#6C7C93",
                        
                      }}
                    >
                      Cycel Id
                    </p>
                    <p>{props.cycle_id}</p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" ,marginTop:"20px"}}
                >
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Collection Date
                    </p>
                    <p>
                      { props.collection_date ? new Date(props.collection_date).toISOString().substr(0, 10).split("-")
                        .reverse()
                        .join("-") : ''}
                    </p>
                  </div>
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Transfer Date
                    </p>
                    <p>
                      {props.transfer_date ? new Date(props.transfer_date).toISOString().substr(0, 10)
                        .split("-")
                        .reverse()
                        .join("-") : ''}
                    </p>
                  </div>
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Pregnancy
                    </p>
                    <p
                      style={{
                        fontFamily: "Roboto",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "18.75px",
                      }}
                    >
                      {props.pregnancy}
                    </p>
                  </div>
                  <div>
                    <p style={{ marginBottom: 0, color: "#6C7C93" }}>
                      Live Birth
                    </p>
                    <p>{props.live_birth}</p>
                  </div>
                </div>
              </div>
              <div className="score-bar">
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-end",marginRight:"35px"}}>
                  <EmbryoScoreBar score={props.score} />
                
                <p style={{ color: "#6c7c93", textAlign: "center" }}>
                  Embryo viability score
                </p>
                </div>
              </div>
            </div>
            <div className="edit">
              <div style={{ margin: "6px 0" }}>
                <button className="btn3"  onClick={() => setIsEdit(true)}>
                  <img src={Edit1} style={{ paddingRight:"5px"}}/>
                  <span className="btn-txt">Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal open={isOpen}>
        <ImageModal setIsOpen={setIsOpen} Image={props.url}></ImageModal>
      </Modal>
    </>
  );
}
export default EmbryoDetails;
