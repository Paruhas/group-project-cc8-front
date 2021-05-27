import React from "react";

import AllRoomTopics from "../components/AllRoomTopic";
import PinBar from "../components/PinBar";
import RoomBar from "../components/RoomBar";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function AllTopicsPage() {
  return (
    <div>
      <div className="header">
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <div className="margin-right"></div>
        <div className="content-body-room">
          <RoomBar />
        </div>
        <AllRoomTopics className="content-body-topic" />
        <div className="content-body-pin">
          <PinBar />
        </div>
        <div className="margin-left"></div>
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default AllTopicsPage;
