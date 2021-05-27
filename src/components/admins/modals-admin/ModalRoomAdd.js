import React, { useState } from "react";
import axios from "../../../config/axios";

import Loading from "../../utils/Loading";
import Swal from "sweetalert2";

import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalRoomAdd(props) {
  // handle Input FOR create Room
  const [roomAddInput, setRoomAddInput] = useState({});

  const handlerInputChange = (e) => {
    const { id, value } = e.target;
    setRoomAddInput((prev) => ({ ...prev, [id]: value }));
  };
  // console.log(roomAddInput);

  // Loading Modal
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const handlerCreateRoom = async (e) => {
    e.preventDefault();
    try {
      // console.log(props.uploadImage);
      // console.log(roomAddInput.roomAddName);

      //validate
      if (!roomAddInput?.roomAddName) {
        throw Error("กรุณากรอก ชื่อห้อง");
      }
      if (roomAddInput.roomAddName === "" || !roomAddInput.roomAddName.trim()) {
        throw Error("กรุณากรอก ชื่อห้อง");
      }
      if (!props.uploadImage) {
        throw Error("กรุณาอัพโหลด รูปภาพ");
      }

      setIsLoadingModal(true);

      const imgFromData = new FormData();
      imgFromData.append("roomIcon", props.uploadImage);
      const uploadRoomAddImg = await axios.post(
        "/upload/icon-img",
        imgFromData
      );

      const resCreateRoom = await axios.post("/admin/rooms", {
        roomName: roomAddInput.roomAddName,
        roomIcon: uploadRoomAddImg.data.img,
      });

      Swal.fire({
        icon: "success",
        title: "เพิ่ม Room ใหม่สำเร็จ",
        showConfirmButton: true,
      });

      setIsLoadingModal(false);

      props.getRoom();
      props.closeModalRoomAdd();
    } catch (err) {
      console.log(err);
      if (err.response) {
        props.setErrBox(err.response.data.message);
      } else {
        props.setErrBox(err.message);
      }
      setIsLoadingModal(false);
    }
  };
  // console.log(roomAddInput);

  return (
    <Modal
      isOpen={props.modalRoomAddIsOpen}
      onRequestClose={props.closeModalRoomAdd}
      style={customStyles}
      contentLabel="RoomAdd Modal"
      ariaHideApp={false}
    >
      <div className="modal-roomAdd-box">
        <div className="modal-roomAdd-box-header">
          <div className="modal-roomAdd-box-header-text">เพิ่ม Room ใหม่</div>
          <div onClick={props.closeModalRoomAdd} className="modal-X">
            X
          </div>
        </div>
        <div className="modal-roomAdd-box-content">
          <div className="modal-roomAdd-box-content-image">
            <div className="modal-roomAdd-box-content-image-box">
              {props.uploadImage === null ? (
                <div
                  className="modal-roomAdd-box-content-image-box-Pre-img"
                  onClick={props.handleClickUploadRoomAddImg}
                />
              ) : (
                <img
                  src={URL.createObjectURL(props.uploadImage)}
                  className="modal-roomAdd-box-content-image-box-Pre-img"
                  onClick={props.handleClickUploadRoomAddImg}
                />
              )}
              <label
                htmlFor="roomAddImg"
                className="modal-roomAdd-box-content-image-box-insideText"
                style={props.uploadImage === null ? {} : { display: "none" }}
              >
                Room Icon
              </label>
            </div>
            <input
              id="roomAddImg"
              type="file"
              className="modal-roomAdd-box-content-image-input-uploadImg"
              ref={props.hiddenFileInput}
              onChange={props.handlerUploadImage}
            />
          </div>
          <div className="modal-roomAdd-box-content-text">
            <input
              id="roomAddName"
              type="text"
              placeholder="Room Name"
              className="modal-roomAdd-box-content-text-inputRoomName"
              onChange={handlerInputChange}
            />
          </div>
        </div>
        <div className="modal-roomAdd-box-footer">
          {props.errBox && (
            <div className="error-box">
              <p>{props.errBox}</p>
            </div>
          )}
          {isLoadingModal && <Loading />}
          <button
            className="modal-roomAdd-box-footer-btnSubmit"
            onClick={(e) => handlerCreateRoom(e)}
          >
            Submit Add new Room
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalRoomAdd;
