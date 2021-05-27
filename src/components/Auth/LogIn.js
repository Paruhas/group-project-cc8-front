import React, { useState, useContext } from "react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";

import localStorageService from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";

import jwtDecode from "jwt-decode";

function LogIn() {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  const validateInput = () => {
    const newError = {};
    if (!input.email || !input.email.trim())
      newError.email = "Email is required.";
    if (!input.password || !input.password.trim())
      newError.password = "Password is required.";
    if (!isEmail.test(input.email)) newError.email = "This is not an email.";
    if (!isPassword.test(input.password))
      newError.password =
        "Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number .";

    setError(newError);
    console.log(error);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validateInput();

      const res = await axios.post("/login", input);
      localStorageService.setToken(res.data.token);
      const payload = jwtDecode(res.data.token);
      setUser(payload);
      history.push("/me");
    } catch (err) {
      if (err.response) {
        console.log({ err });
        // console.log({ server: err.response.data.message });
        setError({ server: err.response.data.message });
        console.log(error.server);
      } else {
        console.log({ front: err.message });
        setError({ front: err.message });
      }
    }
  };
  return (
    <>
      <div>
        <div className="dashboad-header">
          <div className="roomBar-container-header-dashLine">
            <div className="roomBar-container-header-dashLine-inside"></div>
            <div></div>
          </div>
          <div className="roomBar-container-header-dashLine-text-padding"></div>
          <p className="roomBar-container-header-dashLine-text">LOG IN</p>
          <div className="roomBar-container-header-dashLine-text-padding"></div>
          <div className="roomBar-container-header-dashLine">
            <div className="roomBar-container-header-dashLine-inside"></div>
            <div></div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "20px",
            backgroundColor: "#edd1b0",
            borderRadius: "10px",
            minWidth: "500px",
          }}
        >
          <div>LOG IN</div>
          <br />

          <form onSubmit={handleSubmit}>
            <div className=" form-div">
              <label htmlFor="email">Email</label>

              <input
                className="form-div"
                type="text"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={(e) => handleInputChange(e)}
              />
              {error.email ? (
                <div style={{ fontSize: "12px", color: "red" }}>
                  {error.email}
                </div>
              ) : null}
            </div>
            <br />
            <div className="form-div">
              <label htmlFor="password">Password</label>

              <input
                className="form-div"
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={(e) => handleInputChange(e)}
              />
              {error.password ? (
                <div style={{ fontSize: "12px", color: "red" }}>
                  {error.password}
                </div>
              ) : null}
            </div>
            <br />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="button">Log In</button>
            </div>
          </form>
          {error.server ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <br />
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.server}
              </div>
            </div>
          ) : null}
          {error.front ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <br />
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.front}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default LogIn;
