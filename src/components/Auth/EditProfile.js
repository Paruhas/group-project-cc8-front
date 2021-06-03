import { useEffect, useContext, useState, useRef } from "react";
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
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const { isLoading, setIsLoading, ClearLoading } =
    useContext(IsLoadingContext);
  useEffect(() => {
    setInput({
      username: user.username,

      birthDate: user.birthDate,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  console.log("input", input);
  //Image Upload
  const [uploadImage, setUploadImage] = useState(null);

  const handlerUploadImage = (e) => {
    // console.log(e);
    if (e.target.files[0]) {
      setUploadImage(e.target.files[0]);
    } else {
      setUploadImage(null);
    }
  };

  // Hide Upload Input
  const hiddenFileInput = useRef(null);
  const handleClickUploadRoomAddImg = (e) => {
    hiddenFileInput.current.click();
  };
  // upload picture
  const validateInput = () => {
    const newError = {};
    if (!input.username || !input.username.trim())
      newError.username = "Username is required.";
    if (!input.email || !input.email.trim())
      newError.email = "Email is required.";
    if (!input.password || !input.password.trim())
      newError.password = "Password is required.";
    if (!input.birthDate || !input.birthDate.trim())
      newError.birthDate = "Birthdate is required.";
    if (!isEmail.test(input.email)) newError.email = "This is not an email.";
    if (!isPassword.test(input.password))
      newError.password =
        "Password must contain at least eight characters, one uppercase letter, one lowercase letter and one number .";
    if (input.password !== input.confirmPassword)
      newError.confirmPassword =
        "Password and confirm password are not matched.";
    setError(newError);
    console.log(error);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("submit");
      validateInput();
      let response;
      setIsLoading(true);
      if (uploadImage) {
        const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
        formData.append("image", uploadImage);

        const res = await axios.post("/upload", formData);
        response = await axios.patch("/user/me/update", {
          ...input,
          userImg: res.data.img,
        });
      } else {
        response = await axios.patch("/user/me/update", {
          ...input,
        });
      }
      localStorageService.clearToken();
      localStorageService.setToken(response.data.token);
      const payload = jwtDecode(response.data.token);

      setIsLoading(false);

      setUser(payload);
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
        <p className="roomBar-container-header-dashLine-text">Edit Profile</p>
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
          <div
            className="form-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <label htmlFor="username">Username</label>

            <div>
              <input
                className="form-div"
                type="text"
                name="username"
                placeholder="Username"
                value={input.username}
                onChange={handleInputChange}
              />
            </div>
            {error.username ? (
              <div style={{ fontSize: "12px", color: "red" }}>
                {error.username}
              </div>
            ) : null}
          </div>
          <br />

          <div className="form-group form-div">
            <div>
              <div>Upload New Image</div>
              <br />
              {uploadImage === null ? (
                <>
                  <img
                    src={user?.userImg}
                    className="modal-roomAdd-box-content-image-box-Pre-img"
                    onClick={handleClickUploadRoomAddImg}
                  />
                  <div style={{ fontSize: "10px" }}>
                    Click picture to upload
                  </div>
                </>
              ) : (
                <img
                  src={URL.createObjectURL(uploadImage)}
                  className="modal-roomAdd-box-content-image-box-Pre-img"
                  onClick={handleClickUploadRoomAddImg}
                />
              )}
              <label
                htmlFor="roomAddImg"
                className="modal-roomAdd-box-content-image-box-insideText"
              >
                User Image
              </label>
            </div>
            <input
              id="roomAddImg"
              type="file"
              className="modal-roomAdd-box-content-image-input-uploadImg"
              ref={hiddenFileInput}
              onChange={handlerUploadImage}
            />
          </div>

          <br />
          <div className="form-div">
            <label htmlFor="checkinDate">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={input.birthDate}
              onChange={handleInputChange}
            />
          </div>
          {error.birthDate ? (
            <div style={{ fontSize: "12px", color: "red" }}>
              {error.birthDate}
            </div>
          ) : null}
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="button">Edit Profile</button>
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