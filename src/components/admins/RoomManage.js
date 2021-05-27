import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../config/axios";

import Loading from "../utils/Loading";
import { IsLoadingContext } from "../../contexts/LoadingContextProvider";
import ModalRoomAdd from "./modals-admin/ModalRoomAdd";

import { KeyIcon, PencilIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";

function RoomManage() {
  // error box
  const [errBox, setErrBox] = useState("");

  //modal RoomAdd
  const [modalRoomAddIsOpen, setModalRoomAddIsOpen] = useState(false);

  const openModalRoomAdd = () => {
    setModalRoomAddIsOpen(true);
  };

  const closeModalRoomAdd = () => {
    setModalRoomAddIsOpen(false);
    setUploadImage(null);
    setErrBox("");
  };

  // Loading Context
  const { isLoading, setIsLoading, ClearLoading } =
    useContext(IsLoadingContext);

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

  // get Room List
  const [roomList, setRoomList] = useState();

  useEffect(async () => {
    await getRoom();
  }, []);

  const getRoom = async () => {
    try {
      const resRooms = await axios.get("/admin/rooms/");
      // console.log(resRooms);
      const {
        data: { rooms },
      } = resRooms;
      setRoomList(rooms);
    } catch (err) {
      console.dir(err);
    }
  };
  // console.log(roomList);
  // console.log(roomList[0]?.roomName);

  //handleOnClick edit Room?
  const handlerEditRoom = async (e, rooms) => {
    // console.log(e.target?.id, "target");
    // console.log(e.target.nearestViewportElement?.id, "nearestViewportElement");
    try {
      let wantToEdit;
      let editReqBodyValue;

      if (
        e.target?.id === "icon-name" ||
        e.target.nearestViewportElement?.id === "icon-name"
      ) {
        wantToEdit = "roomName";
      } else if (
        e.target?.id === "icon-img" ||
        e.target.nearestViewportElement?.id === "icon-img"
      ) {
        wantToEdit = "roomIcon";
      } else if (
        e.target?.id === "icon-status" ||
        e.target.nearestViewportElement?.id === "icon-status"
      ) {
        wantToEdit = "roomStatus";
      }

      //edit roomName
      if (wantToEdit === "roomName") {
        // console.log(rooms.roomName);

        const editRoomNameSwal = await Swal.fire({
          icon: "info",
          text: "แก้ไข RoomName",
          input: "text",
          inputValue: rooms.roomName, // defaultValue
          confirmButtonText: "OK",
          showCancelButton: "true",
          inputPlaceholder: "กรอก RoomName ที่ต้องการ",
          // validate
          inputValidator: (value) => {
            if (!value) {
              return "กรุณากรอก RoomName!";
            }
            if (value === rooms.roomName) {
              return;
            }
            for (let item of roomList) {
              if (item.roomName === value) {
                return "RoomName ซ้ำกับที่มีอยู่แล้ว";
              }
            }
          },
        });
        // console.log(editRoomNameSwal);

        editReqBodyValue = editRoomNameSwal.value;

        if (editRoomNameSwal.isConfirmed) {
          const roomNameUpdate = await axios.patch("/admin/rooms/" + rooms.id, {
            [wantToEdit]: editReqBodyValue,
          });
        }
      }

      //edit roomIcon
      if (wantToEdit === "roomIcon") {
        // console.log(rooms.roomIcon);

        const editRoomIconSwal = await Swal.fire({
          icon: "info",
          text: "อัพโหลด RoomIcon ใหม่",
          input: "file",
          confirmButtonText: "OK",
          showCancelButton: "true",
          // validate
          inputValidator: (value) => {
            if (!value) {
              return "กรุณาเลือกรูปที่ต้องการอัพโหลด RoomIcon";
            }
          },
        });
        // console.log(editRoomIconSwal);

        editReqBodyValue = editRoomIconSwal.value;

        // validate
        if (!editReqBodyValue) {
          return;
        }

        if (
          editReqBodyValue.type.split("/")[1] === "jpeg" ||
          editReqBodyValue.type.split("/")[1] === "jpg" ||
          editReqBodyValue.type.split("/")[1] === "png"
        ) {
          // console.log("type OK");
        } else {
          return "RoomIcon ต้องเป็นไฟล์แบบ jpeg jpg png เท่านั้น";
        }

        setIsLoading(true);
        window.scrollTo(0, 0);

        const imgFromData = new FormData();
        imgFromData.append("roomIcon", editReqBodyValue);

        const uploadRoomImg = await axios.post("/upload/icon-img", imgFromData);

        const resCreateRoom = await axios.patch("/admin/rooms/" + rooms.id, {
          [wantToEdit]: uploadRoomImg.data.img,
        });

        ClearLoading();

        Swal.fire({
          icon: "success",
          title: "แก้ไข RoomIcon สำเร็จ",
          showConfirmButton: true,
        });
      }

      // edit RoomStatus
      if (wantToEdit === "roomStatus") {
        // console.log(rooms.roomStatus);

        if (rooms.roomStatus === "ACTIVE") {
          editReqBodyValue = "INACTIVE";
        }
        if (rooms.roomStatus === "INACTIVE") {
          editReqBodyValue = "ACTIVE";
        }
        // console.log(editReqBodyValue);

        const { isConfirmed } = await Swal.fire({
          text: `คุณต้องการ ${editReqBodyValue} RoomId: ${rooms.id} ใช่ไหม?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        });
        // console.log(isConfirmed);

        if (isConfirmed) {
          const roomStatusUpdate = await axios.patch(
            "/admin/rooms/" + rooms.id,
            { [wantToEdit]: editReqBodyValue }
          );
        }
      }

      getRoom();
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
      // console.dir(err);
    }
  };

  return (
    <>
      <div className="admin-content-content-body">
        <div className="admin-content-content-body-headText">{"Room List"}</div>
        {isLoading && <Loading />}
        <table className="admin-table-roomList">
          <thead>
            <tr className="admin-table-roomList-tr-thead">
              <th>ลำดับ</th>
              <th>Room Id</th>
              <th>Room Name</th>
              <th>Room Icon</th>
              <th>Room Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roomList?.map((item, index) => {
              return (
                <tr className="admin-table-roomList-tr-tbody" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.roomName}</td>
                  <td>
                    <img
                      src={item.roomIcon}
                      className="admin-table-roomList-tr-tbody-img"
                    />
                  </td>
                  <td>{item.roomStatus}</td>
                  <td>
                    <div className="admin-table-roomList-tr-tbody-management-iconGrp">
                      <div className="admin-table-roomList-tr-tbody-management-iconGrp-inside">
                        <PencilIcon
                          id="icon-name"
                          onClick={(e) => handlerEditRoom(e, item)}
                          className="admin-table-roomList-tr-tbody-management-iconGrp-inside-icon"
                        />
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-1">
                          EDIT
                        </p>
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-2">
                          NAME
                        </p>
                      </div>
                      <div className="admin-table-roomList-tr-tbody-management-iconGrp-inside">
                        <PencilIcon
                          id="icon-img"
                          onClick={(e) => handlerEditRoom(e, item)}
                          className="admin-table-roomList-tr-tbody-management-iconGrp-inside-icon"
                        />
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-1">
                          EDIT
                        </p>
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-2">
                          ICON
                        </p>
                      </div>
                      <div className="admin-table-roomList-tr-tbody-management-iconGrp-inside">
                        <KeyIcon
                          id="icon-status"
                          onClick={(e) => handlerEditRoom(e, item)}
                          className="admin-table-roomList-tr-tbody-management-iconGrp-inside-icon"
                        />
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-1">
                          CHANGE
                        </p>
                        <p className="admin-table-roomList-tr-tbody-management-iconGrp-inside-text-2">
                          STATUS
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="admin-content-content-footer">
          <button
            className="admin-content-content-footer-btn-roomAdd"
            onClick={openModalRoomAdd}
          >
            + RoomADD
          </button>
        </div>
      </div>
      <div class="h-16"></div>

      <ModalRoomAdd
        modalRoomAddIsOpen={modalRoomAddIsOpen}
        closeModalRoomAdd={closeModalRoomAdd}
        uploadImage={uploadImage}
        handleClickUploadRoomAddImg={handleClickUploadRoomAddImg}
        hiddenFileInput={hiddenFileInput}
        handlerUploadImage={handlerUploadImage}
        getRoom={getRoom}
        setErrBox={setErrBox}
        errBox={errBox}
      />
    </>
  );
}

export default RoomManage;
