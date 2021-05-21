import React from "react";

import pinIcon from "../img/office-pin.png";
import pinedIcon from "../img/office-pin-red.png";
import axios from "../config/axios";

import Swal from "sweetalert2";

function PinItems(props) {
  const showTopicText = props.item.Topic.topicName.substr(0, 13);

  const handlerDeletePin = async (e, pinned) => {
    console.log("handlerDeletePin", pinned);

    try {
      const confirmDeletedPin = await Swal.fire({
        text: `คุณต้องการ ลบกระทู้ "${showTopicText}..." ทีปักหมุดไว้ใช่ไหม?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      });
      // console.log(confirmDeletedPin);

      if (!confirmDeletedPin.isConfirmed) {
        return;
      }

      const deletePin = await axios.delete("/pins/" + pinned.id);

      props.getUserPin();

      Swal.fire({
        icon: "success",
        title: "ลบกระทู้ที่ปักหมุดไว้สำเร็จ",
        showConfirmButton: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlerGoToPinTopic = (e, topic) => {
    console.log("handlerGoToPinTopic", topic);
  };

  return (
    <div className="roomBar-container-contentBox">
      <div className="pinBar-container-contentBox-inside-iconImg-Bg">
        <img
          src={pinedIcon}
          alt={"pinIcon"}
          className="roomBar-container-contentBox-inside-iconImg"
          onClick={(e) => handlerDeletePin(e, props.item)}
        />
      </div>
      <div
        className="roomBar-container-contentBox-inside-textBox"
        onClick={(e) => handlerGoToPinTopic(e, props.item.Topic)}
      >
        {showTopicText + "..."}
      </div>
    </div>
  );
}

export default PinItems;
