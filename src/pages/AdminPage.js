import React, { useState } from "react";

import Navbar from "../components/navbar";

import { HomeIcon, PencilIcon } from "@heroicons/react/outline";

import UserManage from "../components/admins/UserManage";
import TopicManage from "../components/admins/TopicManage";
import ReportManage from "../components/admins/ReportManage";
import RoomManage from "../components/admins/RoomManage";

function AdminPage() {
  const [changeDisplayByNavbar, setChangeDisplayByNavbar] = useState({});

  return (
    <>
      <div className="admin-all-body">
        <div className="admin-header">
          <Navbar Icon={HomeIcon} Icon2={PencilIcon} />
        </div>
        <div className="admin-content-body">
          <div className="admin-content-margin-right"></div>
          <div className="admin-content-navBar">
            <div className="admin-content-navBar-header">
              {
                <>
                  <div className="admin-content-navBar-header-dashLine">
                    <div className="admin-content-navBar-header-dashLine-inside"></div>
                    <div></div>
                  </div>
                  <div className="admin-content-navBar-header-dashLine-text-padding"></div>
                  <p className="admin-content-navBar-header-dashLine-text">
                    {"ADMIN NAVBAR"}
                  </p>
                  <div className="admin-content-navBar-header-dashLine-text-padding"></div>
                  <div className="admin-content-navBar-header-dashLine">
                    <div className="admin-content-navBar-header-dashLine-inside"></div>
                    <div></div>
                  </div>
                </>
              }
            </div>
            <div className="admin-content-navBar-body">
              {
                <ul className="admin-content-navBar-body-menu">
                  <li onClick={() => setChangeDisplayByNavbar({ user: true })}>
                    USER
                  </li>
                  <li onClick={() => setChangeDisplayByNavbar({ topic: true })}>
                    TOPIC
                  </li>
                  <li
                    onClick={() => setChangeDisplayByNavbar({ report: true })}
                  >
                    REPORT
                  </li>
                  <li onClick={() => setChangeDisplayByNavbar({ room: true })}>
                    ROOM
                  </li>
                </ul>
              }
            </div>
          </div>
          <div className="admin-content-content">
            <div className="admin-content-navBar-header">
              {
                <>
                  <div className="admin-content-navBar-header-dashLine">
                    <div className="admin-content-navBar-header-dashLine-inside"></div>
                    <div></div>
                  </div>
                  <div className="admin-content-navBar-header-dashLine-text-padding"></div>
                  <p className="admin-content-navBar-header-dashLine-text">
                    {"CONTENT"}
                  </p>
                  <div className="admin-content-navBar-header-dashLine-text-padding"></div>
                  <div className="admin-content-navBar-header-dashLine">
                    <div className="admin-content-navBar-header-dashLine-inside"></div>
                    <div></div>
                  </div>
                </>
              }
            </div>

            {changeDisplayByNavbar.user && <UserManage />}
            {changeDisplayByNavbar.topic && <TopicManage />}
            {changeDisplayByNavbar.room && <RoomManage />}
            {changeDisplayByNavbar.report && <ReportManage />}
          </div>
          <div className="admin-content-margin-left"></div>
        </div>
        <div className="admin-footer"></div>
      </div>
    </>
  );
}

export default AdminPage;
