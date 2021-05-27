import React from "react";

import moment from "moment";

// Modal import
import Modal from "react-modal";
import { UserIcon } from "@heroicons/react/outline";
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

function ModalUserDetail(props) {
  // console.log(props);
  return (
    <Modal
      isOpen={props.modalUserDetailIsOpen}
      onRequestClose={props.closeModalUserDetail}
      style={customStyles}
      contentLabel="UserDetail Modal"
      ariaHideApp={false}
    >
      <div className="modal-reportDetail-box">
        <div className="modal-reportDetail-box-header">
          <div className="modal-reportDetail-box-header-text">User Detail</div>
          <div onClick={props.closeModalUserDetail} className="modal-X">
            X
          </div>
        </div>
        <div className="modal-reportDetail-box-content">
          <div className="modal-reportDetail-box-content-1">
            <p>User Id: {props.userDetail?.id}</p>
            <p>Username: {props.userDetail?.username}</p>
            <p>Email: {props.userDetail?.email}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p>Img:</p>
              <img
                src={
                  props.userDetail?.userImg
                    ? props.userDetail?.userImg
                    : UserIcon
                }
                className="modal-userDetail-box-content-1-userImg"
              />
            </div>
            <p>
              Birthday:{" "}
              {moment(props.userDetail?.birthDate).format("DD/MM/YYYY")}
            </p>
            <p>Role: {props.userDetail?.userRole}</p>
            <p>Status: {props.userDetail?.userStatus}</p>
            <p>
              created At:{" "}
              {moment(props.userDetail?.createdAt).format(
                "DD/MM/YYYY ,HH:mm:ss"
              )}
            </p>
          </div>
        </div>
        {/* <div className="modal-reportDetail-box-footer"></div> */}
      </div>
    </Modal>
  );
}

export default ModalUserDetail;
