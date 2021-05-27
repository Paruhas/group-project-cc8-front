import React from "react";
import Navbar from "../components/navbar";
import SearchList from "../components/SearchList";
import PinBar from "../components/PinBar";
import RoomBar from "../components/RoomBar";

import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function SearchPage() {
  return (
    <div>
      <div>
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <div className="margin-right"></div>
        <div className="content-body-room">
          <RoomBar />
        </div>
        <SearchList className="content-body-topic" />
        <div className="content-body-pin">
          <PinBar />
        </div>
        <div className="margin-left"></div>
      </div>
    </div>
  );
}

export default SearchPage;
