import React, { useEffect, useState } from "react";
import axios from "../config/axios";

import RoomItems from "./RoomItems";

function RoomBar() {
  const [allActiveRoom, setAllActiveRoom] = useState();

  useEffect(async () => {
    await getAllActiveRoom();
  }, []);

  const getAllActiveRoom = async () => {
    try {
      const resAllActiveRoom = await axios.get("/rooms/active");
      // console.log(resAllActiveRoom.data.rooms);
      const {
        data: { rooms },
      } = resAllActiveRoom;
      setAllActiveRoom(rooms);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      }
    }
  };
  // console.log(allActiveRoom);

  return (
    <div className="roomBar-container">
      <div className="dashboad-header">
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <p className="roomBar-container-header-dashLine-text">ROOM</p>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
      </div>
      <div className="roomBar-container-contentList">
        {allActiveRoom?.map((item, index) => {
          return <RoomItems key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default RoomBar;
