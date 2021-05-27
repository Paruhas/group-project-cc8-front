import React from "react";
import axios from "../config/axios";
import commentIcon from "../public/images/commentIcon.png";
import redHeartIcon from "../public/images/redHeartIcon.png";
import emtyHeartIcon from "../public/images/emtyHeartIcon.png";

import editIcon from "../public/images/editIcon.png";
import deleteIcon from "../public/images/deleteIcon.png";
import PinRedIcon from "../public/images/pinRedIcon.png";
import PinBlackIcon from "../public/images/pinBlackIcon.png";
import reportRedIcon from "../public/images/reportRedIcon.png";
import reportBlackIcon from "../public/images/reportBlackIcon.png";
import ReactHtmlParser from "react-html-parser";
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PinContext } from "../contexts/PinContextProvider";

import ModalReportTopic from "./modals/ModalReportTopic";

import Swal from "sweetalert2";

function PreviewTopic({ topicImg, input, previewRoom }) {
  const { user } = useContext(AuthContext);
  useEffect(() => {}, [input, previewRoom]);

  // console.log("xxxx");
  console.log(input);

  console.log(Boolean(previewRoom));
  console.log(Boolean(!previewRoom));

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
          width: "90%",
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
          <div className="topic-name">
            <div className="room-section">
              {previewRoom &&
                previewRoom.map((item) => (
                  <>
                    <img
                      src={item.roomIcon}
                      alt="room-icon"
                      style={{ width: "50px", height: "50px" }}
                    />

                    <a
                      style={{
                        fontSize: "10px",
                        // color: "gray",
                        textDecoration: "none",
                      }}
                      onClick={console.log(item.id)}
                    >
                      {item.roomName}
                    </a>
                  </>
                ))}
            </div>

            <div
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                fontSize: "25px",
              }}
            >
              <div>
                <strong>{input.topicName}</strong>
              </div>
            </div>
            <div
              className="topic-control-button"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "10%",
              }}
            ></div>
          </div>
          <div style={{ fontSize: "14px" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <strong>Author : </strong>
            <a style={{ color: "brown" }} onClick={console.log(user.id)}>
              {user.username}
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <strong>Date : </strong> &nbsp;
            <span>{new Date(Date.now()).toLocaleDateString()}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <img src={topicImg ? topicImg : input.topicImg} />
          </div>
          <div
            align="justify"
            style={{
              paddingBottom: "20px",
              borderBottom: "solid rgb(167, 167, 167) 1px",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {ReactHtmlParser(input.topicContent)}
          </div>
        </div>
      </div>
      <div style={{ width: "5%", height: "auto" }}></div>
    </>
  );
}

export default PreviewTopic;
