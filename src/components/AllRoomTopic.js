import React, { useState, useContext, useEffect } from "react";
import axios from "../config/axios";
import { useHistory, useParams } from "react-router";

import { AuthContext } from "../contexts/AuthContextProvider";
import { PinContext } from "../contexts/PinContextProvider";

import commentIcon from "../public/images/commentIcon.png";
import redHeartIcon from "../public/images/redHeartIcon.png";
import calendarIcon from "../public/images/calendarIcon.png";
import PinRedIcon from "../public/images/pinRedIcon.png";
import PinBlackIcon from "../public/images/pinBlackIcon.png";

import Swal from "sweetalert2";
import moment from "moment";
import { UserIcon } from "@heroicons/react/outline";

function AllRoomTopic() {
  const { user } = useContext(AuthContext);
  const { pin, setPin, pinTrigger, setPinTrigger } = useContext(PinContext);
  const { roomId } = useParams();
  // console.log(roomId);

  // const [roomByParams, setRoomByParams] = useState([]);
  const [topicByRoomData, setTopicByRoomData] = useState([]);

  const history = useHistory();
  useEffect(() => {
    const getAllTopic = async () => {
      try {
        // const resRoom = await axios.get("/rooms/active/" + roomId);
        // setRoomByParams(resRoom.data.room);

        const resTopic = await axios.get(
          "/topics/all-active"
          // + roomId + "?page=1"
        );
        console.log(resTopic);

        const roomTopic = resTopic.data.topics;

        const newRoomTopic = roomTopic.map((topic) => {
          return topic.Pins.filter((pin) => pin.userId === user.id)[0]
            ? { ...topic, pinned: "YES" }
            : { ...topic, pinned: "NO" };
        });

        setTopicByRoomData(newRoomTopic);
      } catch (err) {
        console.log(err);
        console.dir(err);
      }
    };
    getAllTopic();
  }, [roomId, pinTrigger]);

  const handlePin = async (e, item, pinned) => {
    console.log("xxx", item, pinned);
    const topicId = item.id;
    try {
      // validate ถ้าไม่ LOGIN
      if (!user) {
        await Swal.fire({
          icon: "error",
          title: "กรุณา LOGIN / REGISTER ก่อน",
          showConfirmButton: false,
        });

        history.push("/login");
        return;
      }

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
              textAlign: "center",
            }}
          >
            ALL TOPIC
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

        <div className="topic-list-box">
          <div
            style={{
              width: "100%",
              borderBottom: "solid black 1px",
            }}
          >
            <h2>
              <b>All Topics</b>
            </h2>
          </div>
          {/* dashboard topic item */}
          {topicByRoomData?.map((item) => (
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
                  src={item.Room.roomIcon}
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
                  <a href="#" style={{ textDecoration: "none" }}>
                    <strong onClick={() => history.push(`/topic/${item.id}`)}>
                      {item.topicName.length > 43
                        ? item.topicName.slice(0, 40) + "..."
                        : item.topicName}
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
                      src={item?.User.userImg ? item?.User.userImg : UserIcon}
                      onClick={() => history.push(`/user/${item.User.id}`)}
                    />{" "}
                    &nbsp;&nbsp;
                    <a
                      href="#"
                      className=""
                      style={{ textDecoration: "none" }}
                      onClick={() => history.push(`/user/${item.User.id}`)}
                    >
                      {item.User.username}
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
                    &nbsp;&nbsp;
                    {moment(item.createdAt).format("DD/MM/YYYY ,HH:mm:ss")}
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
                    {item.Likes.length}
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
                    {item.Comments.length}
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
          ))}
          {/* dashboard topic item */}
        </div>
      </div>

      <div style={{ width: "5%", height: "auto" }}></div>
    </>
  );
}

export default AllRoomTopic;
