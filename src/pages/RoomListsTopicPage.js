import React from "react";

import RoomTopics from "../components/RoomTopics";
import PinBar from "../components/PinBar";
import RoomBar from "../components/RoomBar";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function RoomListsTopicPage() {
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
        <RoomTopics className="content-body-topic" />
        <div className="content-body-pin">
          <PinBar />
        </div>
        <div className="margin-left"></div>
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default RoomListsTopicPage;
