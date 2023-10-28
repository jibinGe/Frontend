import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../controllers/UserContext";
import { useNavigate } from "react-router-dom";
import DataContext from "../controllers/DataContext";
import Cookies from "js-cookie";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { data, setData } = useContext(DataContext);
  const { updateUser } = useContext(UserContext);
  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (Cookies.get('access_token')) {
      history("/sidebar");
    }
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setData((prev) => {
      return {
        ...prev,
        LoginInfo: inputs,
      };
    });
    console.log(inputs);
    await fetch("http://127.0.0.1:5001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((userData) => {
        updateUser(userData);
        setData((prev) => {
          return {
            ...prev,
            LoginData: userData,
          };
        });
        console.log(userData);
        if (userData.login == true) {
          Cookies.set("access_token", userData?.access_token, {
            expires: 1,
          });
          Cookies.set(
            "common_data",
            userData?.clinic[1] + "#" + userData?.user[2],
            {
              expires: 1,
            }
          );
          localStorage.setItem("clinic", JSON.stringify(userData?.clinic));
          history("/welcome");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((ERR) => {
        alert("Invalid Credentials");
      });
  };
  return (
    <div className="container3">
      <div className="out-box5 ">
        <div className="contain1 ">
          <h2 className="txt8">Login</h2>
          <form>
            <div className="in-box">
              <div>
                <label style={{ display: "block" }}>User ID</label>
                <input
                  className="inpt"
                  name="username"
                  value={inputs.username}
                  type="text"
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginTop: 13 }}>
                <label style={{ display: "block" }}>Password</label>
                <input
                  className="inpt"
                  name="password"
                  value={inputs.password}
                  type="password"
                  onChange={handleChange}
                />
              </div>

              <button className="btn1" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
