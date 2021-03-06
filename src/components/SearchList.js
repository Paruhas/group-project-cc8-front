import React, { useState, useEffect, useContext } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router";

import {  useParams } from "react-router-dom";
import commentIcon from "../public/images/commentIcon.png";
import redHeartIcon from "../public/images/redHeartIcon.png";
import calendarIcon from "../public/images/calendarIcon.png";
import PinRedIcon from "../public/images/pinRedIcon.png";
import PinBlackIcon from "../public/images/pinBlackIcon.png";
import userIcon from "../public/images/userIcon.png";

import { PinContext } from "../contexts/PinContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";

function SearchList() {
  const [Topic, setTopic] = useState([]);
  const { user } = useContext(AuthContext);
  const { pin, setPin, pinTrigger, setPinTrigger } = useContext(PinContext);
  const history = useHistory();
  const { search } = useParams();

  useEffect(() => {
    const getAllTopic = async () => {
      try {
         const res = await axios.get("topics/all-active");
          setTopic(res.data.topics);
      } catch (err) {
        console.log(err);
      }
    };
    getAllTopic();
  }, []);
  console.log(Topic);
  const handlePin = async (e, item, pinned) => {
    console.log("xxx", item, pinned);
    const topicId = item.id;
    try {
      if (pinned === "NO") {
        const res = await axios.post("/user/pins/", { topicId });
        setPinTrigger(!pinTrigger);
      } else {
        let pinId;
        for (let p of item.Pins) {
          console.log("p", p, p.id);
          if (p.topicId === item.id) pinId = p.id;
        }
        const res = await axios.delete(`/user/pins/${pinId}`);
        setPin((prev) => prev.filter((item) => item.id !== pinId));
        setPinTrigger(!pinTrigger);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ width: "5%", height: "auto" }}></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "auto",
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
              color: "rgb(167, 167, 167)",
              height: "auto",
            }}
          >
            DASHBOARD
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
        <div style={{ height: "20px" }}> </div>
        {/* dashboard header */}
        <div className="topic-list-box">
          <div
            style={{
              width: "100%",
              borderBottom: "solid black 1px",
            }}
          >
            <h2>
              <b>Search Topics</b>
            </h2>
            { Topic.filter((item) =>
              item.topicName.toLowerCase().includes(search.toLowerCase())
            )[0]? null :  <strong style={{color:"red"}}>Cant Find this Topic  {`"${search}"` }</strong>}
          </div>
          {/* dashboard topic item */}
          {Topic.filter((item) =>
            item.topicName.toLowerCase().includes(search.toLowerCase())
          ).map((item) => {
            return (
              <div className="topic-item" key={item.id}>
                <div
                  style={{
                    width: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={item?.Room?.roomIcon}
                  />
                </div>
                <div
                  style={{
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <a style={{ textDecoration: "none" }}>
                      <strong
                        className="cursor-pointer"
                        onClick={() => history.push(`/topic/${item.id}`)}
                      >
                        {item.topicName.slice(0, 40) + "..."}
                      </strong>
                    </a>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={userIcon}
                      />
                      &nbsp;&nbsp;
                      <a
                        className="cursor-pointer"
                        onClick={() => history.push(`/user/${item.User.id}`)}
                        style={{ textDecoration: "none" }}
                      >
                        {item?.User?.username}
                      </a>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={calendarIcon}
                      />
                      &nbsp;&nbsp;{item.createdAt.slice(0, -14)}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "15%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={redHeartIcon}
                      />
                    </div>
                    <div
                      style={{
                        width: "60%",
                      }}
                    >
                      {item?.Likes?.length}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={commentIcon}
                      />
                    </div>
                    <div
                      style={{
                        width: "60%",
                      }}
                    >
                      {item?.Comments?.length}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "15%",
                  }}
                >
                  <button
                    className="button"
                    style={{
                      backgroundColor: "#edd1b0",
                      border: "none",
                    }}
                    onClick={(e) => handlePin(e, item, item.pinned)}
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={item.pinned === "YES" ? PinRedIcon : PinBlackIcon}
                    />
                  </button>
                </div>
              </div>
            );
          })}
          {/* dashboard topic item */}
        </div>
        <div style={{ height: "50px" }}> </div>
      </div>

      <div style={{ width: "5%", height: "auto" }}></div>
    </>
  );
}

export default SearchList;
