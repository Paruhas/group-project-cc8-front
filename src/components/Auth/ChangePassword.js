import { useContext, useState, useRef } from "react";
import axios from "../../config/axios";
import { useHistory } from "react-router-dom";

import localStorageService from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";

import jwtDecode from "jwt-decode";

import Loading from "../utils/Loading";
import { IsLoadingContext } from "../../contexts/LoadingContextProvider";

function Register() {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const { isLoading, setIsLoading, ClearLoading } =
    useContext(IsLoadingContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  // console.log("input", input);

  const validateInput = () => {
    const newError = {};

    if (!input.oldPassword || !input.oldPassword.trim())
      newError.oldPassword = "Old Password is required.";

    if (!input.password || !input.password.trim())
      newError.password = "Password is required.";

    if (input.password !== input.confirmPassword)
      newError.confirmPassword =
        "Password and confirm password are not matched.";

    setError(newError);
    console.log(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit");
      validateInput();
      console.log(error);

      setIsLoading(true);

      await axios.patch("/user/me/password", {
        ...input,
      });

      setIsLoading(false);

      history.push("/me");
    } catch (err) {
      setIsLoading(false);
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
    <div>
      <div className="dashboad-header">
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <p className="roomBar-container-header-dashLine-text">
          Change Password
        </p>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "20px",
          backgroundColor: "#edd1b0",
          borderRadius: "10px",
          minWidth: "500px",
        }}
      >
        <div class="h-7"></div>

        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <label htmlFor="password">Old Password</label>

            <input
              className="form-div"
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={input.oldPassword}
              onChange={handleInputChange}
            />
            {error.oldPassword ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.oldPassword}
              </div>
            ) : null}
          </div>
          <br />
          <div className="form-div">
            <label htmlFor="password">New Password</label>

            <input
              className="form-div"
              type="password"
              name="password"
              placeholder="New Password"
              value={input.password}
              onChange={handleInputChange}
            />
            {error.password ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.password}
              </div>
            ) : null}
          </div>
          <br />
          <div className="form-div">
            <label htmlFor="confirmPassword">Confirm New Password</label>

            <div>
              <input
                className="form-div"
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={input.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            {error.confirmPassword ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.confirmPassword}
              </div>
            ) : null}
          </div>
          <br />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="button">Change Password</button>
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
            <div style={{ fontSize: "12px", color: "red" }}>{error.server}</div>
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
            <div style={{ fontSize: "12px", color: "red" }}>{error.front}</div>
          </div>
        ) : null}
        {isLoading && <Loading />}
      </div>
    </div>
  );
}

export default Register;
