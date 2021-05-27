import React from "react";

function CreateTopic({
  handleSubmit,
  handleInputChange,
  handleFileTopicImgChange,
  handleUploadTopicImg,
  handleTapContent,
  handleBreakLineContent,
  handleFileContentImgChange,
  handleUploadContentImg,
  room,
  input,
  editTopic,
}) {
  console.log(input?.Room?.id);
  return (
    <>
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
              <label htmlFor="topicName">
                <b>Topic Name</b>
              </label>

              <div>
                <input
                  className="form-div"
                  type="text"
                  name="topicName"
                  placeholder="Topic Name"
                  value={input.topicName}
                  onChange={handleInputChange}
                  defaultValue={input.topicName}
                />
              </div>
            </div>
            <br />
            <div className="form-group form-div">
              <form>
                <div>
                  <label>
                    <b>Topic Image</b>
                  </label>
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
                    <button className="button" onClick={handleUploadTopicImg}>
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <br />
            <div className=" form-div">
              <label htmlFor="topicContent">
                <b>Topic Content</b>
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "10px 0",
                  borderTop: "solid grey 1px",
                }}
              >
                <button
                  className="button"
                  onClick={(e) => {
                    handleBreakLineContent(e);
                  }}
                >
                  Enter
                </button>
                <button
                  className="button"
                  onClick={(e) => {
                    handleTapContent(e);
                  }}
                >
                  Tap
                </button>
              </div>
              <textarea
                className="form-div"
                type="text"
                name="topicContent"
                placeholder="Content"
                rows="10"
                value={input.topicContent}
                onChange={handleInputChange}
                defaultValue={input.topicContent}
              />

              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "10px",
                    borderBottom: "solid grey 1px",
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
                  <button className="button" onClick={handleUploadContentImg}>
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <br />

            <div className="form-div">
              <label htmlFor="roomId">
                <b>Room</b>
              </label>
              <select id="roomId" name="roomId" onChange={handleInputChange}>
                <option
                  name="roomId"
                  selected={input?.Room?.id ? false : "selected"}
                  defaultValue={input?.Room?.id}
                >
                  Select Room
                </option>
                {room?.map((item) => {
                  // console.log(item.id);
                  // console.log(input?.Room?.id);
                  return (
                    <option
                      name="roomId"
                      value={item.id}
                      key={item.id}
                      selected={item.id == input?.Room?.id ? "selected" : false}
                    >
                      {item.roomName}
                    </option>
                  );
                })}
              </select>
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="button">
                {editTopic ? "Edit Topic" : "Create Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTopic;
