import React from "react";
import { useHistory } from "react-router";

function RoomItems(props) {
  const history = useHistory();

  const handlerClick = (e, room) => {
    // console.log("Click", room.id);

    history.push("/room/" + room.id);
  };

  return (
    <div
      className="roomBar-container-contentBox"
      onClick={(e) => handlerClick(e, props.item)}
    >
      <div className="roomBar-container-contentBox-inside-iconImg-Bg">
        <img
          src={props.item?.roomIcon}
          alt={"roomIcon"}
          className="roomBar-container-contentBox-inside-iconImg"
        />
      </div>
      <div className="roomBar-container-contentBox-inside-textBox">
        {props.item?.roomName}
      </div>
    </div>
  );
}

export default RoomItems;
