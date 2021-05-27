import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../config/axios";
import CreateTopic from "../components/CreateTopic";
import PreviewTopic from "../components/PreviewTopic";
import PinBar from "../components/PinBar";
import RoomBar from "../components/RoomBar";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";
import { AuthContext } from "../contexts/AuthContextProvider";

function EditTopicPage() {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState();
  const [previewRoom, setPreviewRoom] = useState([]);
  const [input, setInput] = useState({});
  const [editTopic, setEditTopic] = useState(false);

  useEffect(() => {
    const getTopic = async () => {
      try {
        const res = await axios.get(`/topics/active/${id}`);
        console.log("ressss", res);
        setInput(res.data.topic);
        const x = [];
        x.push(res.data.topic.Room);
        setPreviewRoom(x);
        if (res.data.topic.userId !== user.id) history.push("/me");
        setEditTopic(true);
      } catch (err) {
        console.dir(err);
        history.push("/me");
      }
    };
    getTopic();
    const getRoom = async () => {
      const res = await axios.get("/rooms/active");
      console.log(res.data.rooms);
      setRoom(res.data.rooms);
    };
    getRoom();
  }, [id]);
  console.log("inputxxx", input?.Room?.id);
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
    setInput((prev) => ({ ...prev, topicImg: res.data.img }));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(input);
    if (name === "roomId") {
      setPreviewRoom(room.filter((item) => item.id == value));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(input);
      console.log(input.topicContent.length);
      const response = await axios.patch(`/user/topics/${id}`, {
        ...input,
        topicImg,
      });
      history.push(`/topic/${id}`);
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
          editTopic={editTopic}
        />

        <div className="margin-left"></div>
      </div>
    </div>
  );
}

export default EditTopicPage;
