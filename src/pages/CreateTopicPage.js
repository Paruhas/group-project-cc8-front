import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";
import CreateTopic from "../components/CreateTopic";
import PreviewTopic from "../components/PreviewTopic";

import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function CreateTopicPage() {
  const history = useHistory();
  const [room, setRoom] = useState();
  const [previewRoom, setPreviewRoom] = useState();
  const [editTopic, setEditTopic] = useState(false);
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
    try {
      const formData = new FormData();
      formData.append("image", fileTopicImg);
      console.log(formData);
      const res = await axios.post("/upload", formData);
      setTopicImg(res.data.img);
      setInput((prev) => ({ ...prev, topicImg: res.data.img }));
    } catch (err) {
      console.log(err);
    }
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
    const x = `<br /><br /><div style={{ textAlign: "center", textAlign:"-webkit-center"; }}><img style={{ display: "block", margin: "10px 0px" }} src=${res.data.img} /></div><br />`;
    setInput((prev) => ({ ...prev, topicContent: prev.topicContent + x }));
    setFileContentImg(null);
  };

  const handleTapContent = (e) => {
    e.preventDefault(e);
    const x = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    setInput((prev) => ({ ...prev, topicContent: prev.topicContent + x }));
  };

  const handleBreakLineContent = (e) => {
    e.preventDefault(e);
    const x = `<br />`;
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
  console.log("inputxxx", input);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
    if (name === "roomId") {
      setPreviewRoom(room.filter((item) => item.id == value));
    }
  };
  console.log(room);
  console.log("previewRoomHiHi", previewRoom);

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
    <div>
      <div className="header">
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <div className="margin-right"></div>
        <PreviewTopic
          className="content-body-topic"
          input={input}
          previewRoom={previewRoom}
          topicImg={topicImg}
        />
        <CreateTopic
          className="content-body-topic"
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleFileTopicImgChange={handleFileTopicImgChange}
          handleUploadTopicImg={handleUploadTopicImg}
          handleInputChange={handleInputChange}
          handleFileContentImgChange={handleFileContentImgChange}
          handleUploadContentImg={handleUploadContentImg}
          handleBreakLineContent={handleBreakLineContent}
          handleTapContent={handleTapContent}
          room={room}
          input={input}
        />

        <div className="margin-left"></div>
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default CreateTopicPage;
