import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";

import ReactHtmlParser from "react-html-parser";

function CreateTopic() {
  const history = useHistory();
  const [room, setRoom] = useState();

  const [input, setInput] = useState({});
  //upload topic img
  const [fileTopicImg, setFileTopicImg] = useState(null);
  const [topicImg, setTopicImg] = useState(null);
  const handleFileTopicImgChange = (e) => {
    console.log(e);
    setFileTopicImg(e.target.files[0]);
  };

  const handleUploadTopicImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileTopicImg);
    console.log(formData);
    const res = await axios.post("/upload", formData);
    setTopicImg(res.data.img);
  };
  //upload content img
  const [fileContentImg, setFileContentImg] = useState(null);

  const handleFileContentImgChange = (e) => {
    console.log(e);
    setFileContentImg(e.target.files[0]);
  };
  const handleUploadContentImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileContentImg);
    console.log(formData);
    const res = await axios.post("/upload", formData);
    const x = `<br /><br /><div style={{ textAlign: "center" }}><img style={{ display: "block", margin: "10px 0px" }} src=${res.data.img} /></div><br />`;
    setInput((prev) => ({ ...prev, topicContent: prev.topicContent + x }));
  };

  useEffect(() => {
    const getRoom = async () => {
      const res = await axios.get("/rooms/active");
      console.log(res.data.rooms);
      setRoom(res.data.rooms);
    };
    getRoom();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
  };
  console.log(room);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(input);
      console.log(input.topicContent.length);
      const response = await axios.post("/user/topics", {
        ...input,
        topicImg,
      });
      history.push(`/topic/${response.data.newTopic.id}`);
    } catch (err) {
      console.log(err);
      // console.dir(err);
    }
  };
  return (
    <>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: " 0 20px 20px",
          borderRadius: "10px",
          width: "50%",
        }}
      > */}
      {/* dashboard header */}
      {/* <div className="dashboad-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "auto",
            }}
          >
            <div
              style={{
                height: "50%",
                borderBottom: "solid rgb(167, 167, 167) 1px",
              }}
            ></div>
            <div></div>
          </div>
          <div
            style={{
              width: "2%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "rgb(167, 167, 167)",
              height: "auto",
              width: "auto",
            }}
          >
            <div>PREVIEW</div>
          </div>
          <div
            style={{
              width: "2%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "auto",
            }}
          >
            <div
              style={{
                height: "50%",
                borderBottom: "solid rgb(167, 167, 167) 1px",
              }}
            ></div>
            <div></div>
          </div>
        </div> */}
      {/* dashboard header */}
      {/* <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "20px",
            backgroundColor: "#edd1b0",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <div style={{ fontSize: "25px", width: "100%" }}>
            <strong>{input.topicName}</strong>
          </div>
          <br />
          {topicImg && (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img
                src={topicImg}
                alt="product"
                style={{ width: "40%", height: "40%" }}
              />
            </>
          )}
          <br />
          <div style={{ width: "100%" }}>
            {ReactHtmlParser(input.topicContent)}
          </div>
          {input.roomId && (
            <div>
              <img
                src={room.filter((item) => item.id === input.roomId).roomIcon}
              />
            </div>
          )}
        </div>
      </div> */}
      <div style={{ width: "5%", height: "auto" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: " 0 20px 20px",
          borderRadius: "10px",
          width: "50%",
        }}
      >
        {/* dashboard header */}
        <div className="dashboad-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              height: "auto",
            }}
          >
            <div
              style={{
                height: "50%",
                borderBottom: "solid rgb(167, 167, 167) 1px",
              }}
            ></div>
            <div></div>
          </div>
          <div
            style={{
              width: "2%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "rgb(167, 167, 167)",
              height: "auto",
              width: "auto",
            }}
          >
            <div>CREATE</div>&nbsp;&nbsp;
            <div>TOPIC</div>
          </div>
          <div
            style={{
              width: "2%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              height: "auto",
            }}
          >
            <div
              style={{
                height: "50%",
                borderBottom: "solid rgb(167, 167, 167) 1px",
              }}
            ></div>
            <div></div>
          </div>
        </div>
        {/* dashboard header */}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "20px",
            backgroundColor: "#edd1b0",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="form-div"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <label htmlFor="topicName">Topic Name</label>

              <div>
                <input
                  className="form-div"
                  type="text"
                  name="topicName"
                  placeholder="Topic Name"
                  value={input.topicName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <br />
            <div className="form-group form-div">
              <form>
                <div>
                  <label>Topic Image</label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "none",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      style={{
                        borderBottom: "none",
                      }}
                      type="file"
                      onChange={handleFileTopicImgChange}
                    />
                    <button onClick={handleUploadTopicImg}>Upload</button>
                  </div>
                </div>
              </form>
            </div>

            <br />
            <div className=" form-div">
              <label htmlFor="topicContent">Topic Content</label>

              <textarea
                className="form-div"
                type="text"
                name="topicContent"
                placeholder="Content"
                value={input.topicContent}
                onChange={handleInputChange}
              />

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "none",
                    marginTop: "10px",
                  }}
                >
                  <input
                    style={{
                      borderBottom: "none",
                    }}
                    type="file"
                    onChange={handleFileContentImgChange}
                  />
                  <button onClick={handleUploadContentImg}>Upload</button>
                </div>
              </div>

              {/* {productImg && (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img
                    src={productImg}
                    alt="product"
                    style={{ width: "40%", height: "40%" }}
                  />
                </>
              )} */}
            </div>
            <br />

            <div className="form-div">
              <label htmlFor="roomId">Room</label>
              <select id="roomId" name="roomId" onChange={handleInputChange}>
                <option name="roomId" selected>
                  Select Room
                </option>
                {room?.map((item) => (
                  <option name="roomId" value={item.id} key={item.id}>
                    {item.roomName}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="button">Create Topic</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTopic;
