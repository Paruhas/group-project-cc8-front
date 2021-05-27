import React from "react";
import Register from "../components/Auth/Register";
import LogIn from "../components/Auth/LogIn";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function LogInPage() {
  return (
    <div>
      <div className="header">
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <div className="margin-right"></div>
        <div style={{ width: "17vw" }}></div>

        <Register className="content-body-register" />
        <div style={{ width: "6vw" }}></div>
        <LogIn className="content-body-login" />
        <div style={{ width: "17vw" }}></div>

        <div className="margin-left"></div>
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default LogInPage;
