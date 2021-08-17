import React from "react";
import ChangePassword from "../components/Auth/ChangePassword";
import LogIn from "../components/Auth/LogIn";
import Navbar from "../components/navbar";
import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

function ChangePasswordPage() {
  return (
    <div>
      <div className="header">
        <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
      </div>
      <div className="content-body">
        <ChangePassword className="content-body-register" />
      </div>
      <div class="h-16"></div>
    </div>
  );
}

export default ChangePasswordPage;
