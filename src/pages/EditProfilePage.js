import React from "react";
import EditProfile from "../components/Auth/EditProfile";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function EditProfilePage() {
  return (
    <div>
      <div className="header">
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <div className="margin-right"></div>
        <div style={{ width: "17vw" }}></div>

        <EditProfile className="content-body-register" />
        <div style={{ width: "6vw" }}></div>

        <div className="margin-left"></div>
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default EditProfilePage;