import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import ModalUserDetail from "./modals-admin/ModalUserDetail";

import UserIcon from "../../public/images/userIcon.png";
import { BanIcon, KeyIcon } from "@heroicons/react/outline";
import moment from "moment";
import Swal from "sweetalert2";

function UserManage() {
  //Modal UserList > UserDetail
  const [modalUserDetailIsOpen, setModalUserDetailIsOpen] = useState(false);

  const openModalUserDetail = (e, item) => {
    setModalUserDetailIsOpen(true);
    // console.log(item);
    setUserDetail(item);
  };

  const closeModalUserDetail = () => {
    setModalUserDetailIsOpen(false);
    setUserDetail();
  };

  //get User List
  const [usersList, setUsersList] = useState();
  const [userDetail, setUserDetail] = useState();

  useEffect(async () => {
    await getUser();
  }, []);

  const getUser = async () => {
    try {
      const resUsers = await axios.get("/admin/user");
      // console.log(resUsers.data.users);
      const {
        data: { users },
      } = resUsers;
      setUsersList(users);
    } catch (err) {
      console.dir(err);
    }
  };
  // console.log(usersList);

  //handleOnClick change Status
  const handlerChangeUserStatus = async (e, user) => {
    try {
      // console.log(e);
      // console.log(user.userStatus);

      //validate
      if (user.userRole === "ADMIN") {
        throw new Error("ไม่สามารถเปลี่ยนสถานะของ Role ADMIN ได้");
      }

      // ทำให้ userStatus จาก INACTIVE เป็น ACTIVE
      if (
        (e.target.id === "icon-active" ||
          e.target.nearestViewportElement?.id === "icon-active") &&
        user.userStatus === "INACTIVE"
      ) {
        // console.log("yes icon-active INACTIVE", user.id);

        Swal.fire({
          text: "คุณต้องการ ACTIVE UserId: " + user.id + " ใช่ไหม?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resActiveUser = await axios.patch(
              "/admin/user/status/" + user.id,
              {
                userStatus: "ACTIVE",
              }
            );

            getUser();
          }
        });
      }

      // ทำให้ userStatus จาก BANNED เป็น ACTIVE
      if (
        (e.target.id === "icon-ban" ||
          e.target.nearestViewportElement?.id === "icon-ban") &&
        user.userStatus === "BANNED"
      ) {
        // console.log("yes icon-ban BANNED", user.id);

        Swal.fire({
          text: "คุณต้องการปลด BAN UserId: " + user.id + " ใช่ไหม?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resUnBanUser = await axios.patch(
              "/admin/user/status/" + user.id,
              {
                userStatus: "ACTIVE",
              }
            );

            getUser();
          }
        });
      }

      // ทำให้ userStatus จาก ACTIVE เป็น BANNED
      if (
        (e.target.id === "icon-ban" ||
          e.target.nearestViewportElement?.id === "icon-ban") &&
        user.userStatus === "ACTIVE"
      ) {
        // console.log("yes icon-ban ACTIVE", user.id);

        Swal.fire({
          text: "คุณต้องการ BAN UserId: " + user.id + " ใช่ไหม?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่",
          cancelButtonText: "ไม่ใช่",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resBanUser = await axios.patch(
              "/admin/user/status/" + user.id,
              {
                userStatus: "BANNED",
              }
            );

            getUser();
          }
        });
      }
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <>
      <div className="admin-content-content-body">
        <div className="admin-content-content-body-headText">{"User List"}</div>
        <table className="admin-table-userList">
          <thead>
            <tr className="admin-table-userList-tr-thead">
              <th>ลำดับ</th>
              <th>
                <div className="admin-table-reportList-tr-thead-longTxt">
                  <div>User</div>
                  <div>Id</div>
                </div>
              </th>
              <th>
                <div className="admin-table-reportList-tr-thead-longTxt">
                  <div>User</div>
                  <div>name</div>
                </div>
              </th>
              <th>Email</th>
              <th>Img</th>
              <th>Birthday</th>
              <th>Role</th>
              <th className="admin-table-userList-tr-thead-col-8">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((item, index) => {
              return (
                <tr className="admin-table-userList-tr-tbody" key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td className="admin-table-userList-tr-tbody-userEmail">
                    {item.email}
                  </td>
                  <td>
                    <img
                      src={item?.userImg ? item?.userImg : UserIcon}
                      className="admin-table-userList-tr-tbody-userImg"
                      onClick={(e) => openModalUserDetail(e, item)}
                    />
                  </td>
                  <td>{moment(item.birthDate).format("DD/MM/YYYY")}</td>
                  <td>{item.userRole}</td>
                  <td>{item.userStatus}</td>
                  <td>
                    <div className="admin-table-userList-tr-tbody-management-iconGrp">
                      {item.userRole !== "ADMIN" && (
                        <>
                          {item.userStatus === "INACTIVE" && (
                            <div
                              className="admin-table-roomList-tr-tbody-management-iconGrp-inside"
                              onClick={(e) => handlerChangeUserStatus(e, item)}
                            >
                              <KeyIcon
                                id="icon-active"
                                className="admin-table-userList-tr-tbody-management-iconGrp-inside-icon"
                              />
                              <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-1">
                                CHANGE
                              </p>
                              <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-2">
                                STATUS
                              </p>
                            </div>
                          )}
                          {item.userStatus !== "INACTIVE" && (
                            <div
                              className="admin-table-roomList-tr-tbody-management-iconGrp-inside"
                              onClick={(e) => handlerChangeUserStatus(e, item)}
                            >
                              <BanIcon
                                id="icon-ban"
                                className="admin-table-userList-tr-tbody-management-iconGrp-inside-icon"
                              />
                              {item.userStatus === "BANNED" ? (
                                <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-1">
                                  UNBAN
                                </p>
                              ) : (
                                <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-1">
                                  BAN
                                </p>
                              )}
                              <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-hidden">
                                DUMMY
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="admin-content-content-footer"></div>
      </div>
      <div class="h-16"></div>

      <ModalUserDetail
        modalUserDetailIsOpen={modalUserDetailIsOpen}
        closeModalUserDetail={closeModalUserDetail}
        userDetail={userDetail}
      />
    </>
  );
}

export default UserManage;
