import React, { useState, useEffect, useContext } from "react";

import commentIcon from "../public/images/commentIcon.png";
import redHeartIcon from "../public/images/redHeartIcon.png";
import calendarIcon from "../public/images/calendarIcon.png";
import PinRedIcon from "../public/images/pinRedIcon.png";
import PinBlackIcon from "../public/images/pinBlackIcon.png";

import moment from "moment";
import axios from "../config/axios";
import { PinContext } from "../contexts/PinContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useHistory } from "react-router";
import { useParams } from "react-router";

import Swal from "sweetalert2";
import { UserIcon } from "@heroicons/react/outline";

function UserTopicList() {
  const [userData, setUserData] = useState([]);
  const [userTopic, setUserTopic] = useState([]);

  const { user } = useContext(AuthContext);
  const { pin, setPin, pinTrigger, setPinTrigger } = useContext(PinContext);
  const history = useHistory();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getAllTopic = async () => {
      try {
        const resUserData = await axios.get("/user/user/" + id);

        if (resUserData.data.user.userStatus !== "ACTIVE") {
          await Swal.fire({
            icon: "error",
            title: "ไม่พบ USER นี้ในระบบ",
            showConfirmButton: false,
          });

          history.push("/");
          return;
        }

        setUserData(resUserData.data.user);

        const resUserTopic = await axios.get("/topics/user/" + id);

        const userTopic = resUserTopic.data.topics;

        const newUserTopic = userTopic.map((topic) => {
          return topic.Pins.filter((pin) => pin.userId === user.id)[0]
            ? { ...topic, pinned: "YES" }
            : { ...topic, pinned: "NO" };
        });

        setUserTopic(newUserTopic);
      } catch (err) {
        console.log(err);
        // console.dir(err);

        // validate ถ้าไม่เจอ User ในระบบ
        if (err?.response.data.message === "User not found") {
          await Swal.fire({
            icon: "error",
            title: "ไม่พบ USER นี้ในระบบ",
            showConfirmButton: false,
          });

          history.push("/");
        }
      }
    };
    getAllTopic();
  }, [id, pinTrigger]);

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
        {/* dashboard header */}
        {/* <div className="topic-list-box">
          <div
            key={user.id}
            style={{
              width: "90%",
              borderBottom: "solid grey 1px",
              marginBottom: "10px",
              paddingBottom: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={user.userImg}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50px",
                  margin: "0 15px",
                }}
              />
            </div>
            <div>
              <a onClick={() => console.log(user.id)} style={{}}>
                <strong>{user.username}</strong>
              </a>
              <div style={{ marginTop: "5px", fontSize: "12px" }}>
                <span>
                  <b>Role:</b>&nbsp;&nbsp; {user.userRole}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <b>Status:</b>&nbsp;&nbsp;
                  <span
                    style={{
                      color: user.userStatus === "ACTIVE" ? "green" : "grey",
                    }}
                  >
                    {user.userStatus}
                  </span>
                </span>
              </div>
            </div>

            <div>
              <button
                style={{
                  backgroundColor: "#edd1b0",
                  border: "none",
                }}
              >
                <img
                  src={editIcon}
                  alt="edit-icon"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
              </button>
            </div>
          </div>
        </div> */}
        <div
          className="topic-list-box"
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            key={userData?.id}
            style={{
              width: "90%",

              marginBottom: "10px",
              paddingBottom: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={userData?.userImg}
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "100px",
                margin: "0 15px",
                objectFit: "cover",
                overflow: "hidden",
                objectPosition: "50% 50%",
              }}
            />
            <a
            // onClick={() => console.log(userData?.id)}
            >
              <h1>{userData?.username}</h1>{" "}
            </a>
          </div>
        </div>

        <div className="topic-list-box">
          <div
            style={{
              width: "100%",
              borderBottom: "solid black 1px",
            }}
          >
            <h2>
              <b>{userData?.username}'s Topics</b>
            </h2>
          </div>
          {/* dashboard topic item */}
          {userTopic?.map((item) => {
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
                    <a
                      href="#"
                      style={{ textDecoration: "none" }}
                      onClick={() => history.push(`/topic/${item.id}`)}
                    >
                      <strong>
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
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "1.5rem",
                        }}
                        src={userData?.userImg ? userData?.userImg : UserIcon}
                      />{" "}
                      &nbsp;&nbsp;
                      <a href="#" style={{ textDecoration: "none" }}>
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
            );
          })}
          {/* dashboard topic item */}
        </div>
      </div>

      <div style={{ width: "5%", height: "auto" }}></div>
    </>
  );
}

export default UserTopicList;
