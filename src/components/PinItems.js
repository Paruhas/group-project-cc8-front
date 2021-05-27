import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";
import { PinContext } from "../contexts/PinContextProvider";
import pinBlackIcon from "../public/images/pinBlackIcon.png";

import Swal from "sweetalert2";

function PinItems(props) {
  const showTopicText = props.item.Topic.topicName.substr(0, 13);
  const { pin, setPin, pinTrigger, setPinTrigger } = useContext(PinContext);
  const history = useHistory();

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
      setPinTrigger(!pinTrigger);
      props.getUserPin();

      await Swal.fire({
        icon: "success",
        title: "ลบกระทู้ที่ปักหมุดไว้สำเร็จ",
        showConfirmButton: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlerGoToPinTopic = (e, goTopic) => {
    console.log("handlerGoToPinTopic", goTopic);
    try {
      history.push("/topic/" + goTopic.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="roomBar-container-contentBox">
      <div className="pinBar-container-contentBox-inside-iconImg-Bg">
        <img
          src={pinBlackIcon}
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
