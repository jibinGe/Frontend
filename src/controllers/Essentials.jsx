import Cookies from "js-cookie";

const validateJSON = (jsonData) => {
  // if (isNaN(parseInt(jsonData.patient_id))) {
  //   return "Patient ID is Not a Valid Number";
  // }
  // Check if the "first_name" and "last_name" keys are present and are strings.
  if (typeof jsonData.full_name !== "string" || jsonData.full_name === " ") {
    return "Name is Not a Valid Name";
  }
  // Check if the "date_of_birth" key is present and is a valid date.
  if (
    !jsonData.hasOwnProperty("dob") ||
    !/^\d{4}-\d{2}-\d{2}$/.test(jsonData.dob)
  ) {
    return "Date of Birth is Not a Valid Date";
  }
  return true;
};
const formateDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB");

  return formattedDate;
};
const fetchJSON = async (path, method, inputData) => {
  let fetched;
  if (method === "POST") {
    fetched = await fetch("http://127.0.0.1:5001/" + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify(inputData),
    }).then((response) => response.json());
  } else if (method === "GET") {
    fetched = await fetch("http://127.0.0.1:5001/" + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }).then((response) => response.json());
  }
  else if (method === "DELETE") {
    fetched = await fetch("http://127.0.0.1:5001/" + path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    }).then((response) => response.json());
  }

  return fetched;
};
function calculate_age(dob) {
  dob = new Date(dob);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}
export { validateJSON, fetchJSON, calculate_age, formateDate };
