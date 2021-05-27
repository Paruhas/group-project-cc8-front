import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import ModalTopicDetail from "./modals-admin/ModalTopicDetail";

import { KeyIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";

function TopicManage() {
  //Modal ReportDetail
  const [modalTopicDetailIsOpen, setModalTopicDetailIsOpen] = useState(false);

  const openModalTopicDetail = (e, item) => {
    setModalTopicDetailIsOpen(true);
    setTopicDetail(item);
  };

  const closeModalTopicDetail = () => {
    setModalTopicDetailIsOpen(false);
    setTopicDetail();
  };

  // get All Topic
  const [allTopics, setAllTopics] = useState();
  const [topicDetail, setTopicDetail] = useState();

  useEffect(async () => {
    await getTopic();
  }, []);

  const getTopic = async () => {
    try {
      const resTopics = await axios.get("/admin/topics/");
      // console.log(resTopics);
      const {
        data: { topics },
      } = resTopics;
      setAllTopics(topics);
    } catch (err) {
      console.dir(err);
    }
  };
  // console.log(allTopics);

  // handleOnClick change Status
  const handlerChangeTopicStatus = async (e, topic) => {
    try {
      let reqBodyTopicStatus;

      if (topic.topicStatus === "INACTIVE") {
        // console.log("yes icon-active INACTIVE", topic.id);
        reqBodyTopicStatus = "ACTIVE";
      }
      if (topic.topicStatus === "ACTIVE") {
        // console.log("yes icon-active ACTIVE", topic.id);
        reqBodyTopicStatus = "INACTIVE";
      }

      Swal.fire({
        text: `คุณต้องการ ${reqBodyTopicStatus} TopicID: ${topic.id} ใช่ไหม?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resTopic = await axios.patch(
            "/admin/topics/active-inactive/" + topic.id,
            { topicStatus: reqBodyTopicStatus }
          );

          getTopic();
        }
      });
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <>
      <div className="admin-content-content-body">
        <div className="admin-content-content-body-headText">
          {"Topic List"}
        </div>
        <table className="admin-table-topicList">
          <thead>
            <tr className="admin-table-reportList-tr-thead">
              <th>ลำดับ</th>
              <th>Topic Id</th>
              <th>By User Id</th>
              <th>Like</th>
              <th>Comment</th>
              <th>Topic Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allTopics?.map((item, index) => {
              return (
                <tr className="admin-table-reportList-tr-tbody" key={item.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={(e) => openModalTopicDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.id}
                  </td>
                  <td
                    onClick={(e) => openModalTopicDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.User.id}
                  </td>
                  <td
                    onClick={(e) => openModalTopicDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.Likes.length}
                  </td>
                  <td
                    onClick={(e) => openModalTopicDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.Comments.length}
                  </td>
                  <td>{item.topicStatus}</td>
                  <td>
                    <div className="admin-table-userList-tr-tbody-management-iconGrp">
                      <div className="admin-table-roomList-tr-tbody-management-iconGrp-inside">
                        <KeyIcon
                          className="admin-table-userList-tr-tbody-management-iconGrp-inside-icon"
                          id="icon-active"
                          onClick={(e) => handlerChangeTopicStatus(e, item)}
                        />
                        <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-1">
                          CHANGE
                        </p>
                        <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-2">
                          STATUS
                        </p>
                      </div>
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

      <ModalTopicDetail
        modalTopicDetailIsOpen={modalTopicDetailIsOpen}
        closeModalTopicDetail={closeModalTopicDetail}
        topicDetail={topicDetail}
      />
    </>
  );
}

export default TopicManage;
