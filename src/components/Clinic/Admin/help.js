import React, { useState } from "react";
import {
  fetchJSON,
  formateDate,
  validateJSON,
} from "../../../controllers/Essentials";
import SuccessIcon from "../../../Icons/success-icon.svg";

import CloseIcon from "@mui/icons-material/Close";
const Help = ({ isOpen, setIsOpen }) => {
  function onClose() {
    setIsOpen(false);
  }
  const [problem_title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const validateForm = () => {
    let formErrors = {};
    if (!problem_title) formErrors.problem_title = "Title is required";
    if (!description) formErrors.description = "Description is required";
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      fetchJSON("report_a_problem", "POST", {
        problem_title: problem_title,
        description: description,
      })
        .then((data_response) => {
          if (data_response.success == true) {
            setIsOpen(false);
            // history("/upload-images");
          } else {
            setErrorMsg(data_response.message);
            setTitle("");
            setDescription("");
          }
        })
        .catch((err) => {
          alert("try again");
        });

      // try {
      //   const response = await axios.post('/api/problems', { title, description });
      //   alert('Problem reported successfully!');
      //   setTitle('');
      //   setDescription('');
      // } catch (error) {
      //   alert('There was a problem submitting your report.');
      // }
    }
  };
  return (
    <div className="container1">
      <div className="help-section">
        <div className="out-box3 ">
          <div className="contain1 " style={{ height: "auto" }}>
            <h2 className="txt8">Report a Problem</h2>
            <div className="help-box ">
              <form onSubmit={handleSubmit}>
                <div style={{ width: "100%" }}>
                  <label style={{ display: "block" }}>
                    Please describe the problem in detail we will get back to
                    you as soon as we can
                  </label>
                </div>
                <div style={{ width: "100%" }}>
                  <label style={{ display: "block" }}>Problem Title</label>
                  <input
                    className="inpt"
                    type="text"
                    value={problem_title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.problem_title && (
                    <p style={{ color: "red" }}>{errors.problem_title}</p>
                  )}
                </div>
                <div style={{ marginTop: 13, width: "100%" }}>
                  <label style={{ display: "block" }}>Description</label>
                  <textarea
                    rows={4}
                    cols={50}
                    className="inpt-text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p style={{ color: "red" }}>{errors.description}</p>
                  )}
                </div>
                {errorMsg && (
                  <p className="error" style={{ color: "red" }}>
                    {errorMsg}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 13,
                  }}
                >
                  <button type="submit" className="btn-help">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {setIsOpen && (
        <div className="success-msg-box">
          <button className="close-button" onClick={onClose}>
            <CloseIcon sx={{ color: "#6C7C93" }} />
          </button>
          <img src={SuccessIcon} alt="successful" width={80} height={80}></img>
          <div className="success-msg">Success!</div>
          <div className="saved-msg">Employee details saved successfully</div>
        </div>
      )}
    </div>
  );
};
export default Help;
