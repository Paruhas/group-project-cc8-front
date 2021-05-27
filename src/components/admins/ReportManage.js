import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

import ModalReportDetail from "./modals-admin/ModalReportDetail";

import { KeyIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";

function ReportManage() {
  // error box
  const [errBox, setErrBox] = useState("");

  //Modal ReportDetail
  const [modalReportDetailIsOpen, setModalReportDetailIsOpen] = useState(false);

  const openModalReportDetail = (e, item) => {
    setModalReportDetailIsOpen(true);
    setReportDetail(item);
    setAdminDesInput({ adminDescription: item.adminDescription });
  };

  const closeModalReportDetail = () => {
    setModalReportDetailIsOpen(false);
    setReportDetail();
    setAdminDesInput({
      adminDescription: "",
    });
    setErrBox("");
  };

  // get All Report
  const [allReport, setAllReport] = useState();
  const [reportDetail, setReportDetail] = useState();

  useEffect(async () => {
    await getReport();
  }, []);

  const getReport = async () => {
    try {
      const resReports = await axios.get("/admin/report/");
      // console.log(resReports);
      const {
        data: { reports },
      } = resReports;
      setAllReport(reports);
    } catch (err) {
      console.dir(err);
    }
  };
  // console.log(allReport);

  // Admin Description Change
  const [adminDesInput, setAdminDesInput] = useState({
    adminDescription: "",
  });

  // Report Status Change
  const handlerChangeReportStatus = async (e, reportId, reportStatus) => {
    try {
      // console.log(reportId);
      // console.log(reportStatus);

      let reportReqBody;

      if (reportStatus === "REPORT") {
        reportReqBody = "REJECT";
      }
      if (reportStatus === "REJECT") {
        reportReqBody = "REPORT";
      }

      Swal.fire({
        text: `คุณต้องการ ${reportReqBody} ReportId: ${reportId} ใช่ไหม?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const reportStatusUpdate = await axios.patch(
            "/admin/report/" + reportId,
            { reportStatus: reportReqBody }
          );

          closeModalReportDetail();
          getReport();
        }
      });
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <>
      <div className="admin-content-content-body">
        <div className="admin-content-content-body-headText">
          {"Report List"}
        </div>
        <table className="admin-table-reportList">
          <thead>
            <tr className="admin-table-reportList-tr-thead">
              <th>ลำดับ</th>
              <th>Report Id</th>
              <th>User Id</th>
              <th>Topic Id</th>
              <th>Report Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allReport?.map((item, index) => {
              return (
                <tr className="admin-table-reportList-tr-tbody" key={item.id}>
                  <td>{index + 1}</td>
                  <td
                    onClick={(e) => openModalReportDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.id}
                  </td>
                  <td
                    onClick={(e) => openModalReportDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.User.id}
                  </td>
                  <td
                    onClick={(e) => openModalReportDetail(e, item)}
                    className="admin-table-reportList-tr-tbody-td-pointer"
                  >
                    {item.topicId}
                  </td>
                  <td>{item.reportStatus}</td>
                  <td>
                    <div className="admin-table-userList-tr-tbody-management-iconGrp">
                      <div className="admin-table-roomList-tr-tbody-management-iconGrp-inside">
                        <KeyIcon
                          className="admin-table-userList-tr-tbody-management-iconGrp-inside-icon"
                          id="icon-active"
                          onClick={(e) =>
                            handlerChangeReportStatus(
                              e,
                              item.id,
                              item.reportStatus
                            )
                          }
                        />
                        <p className="admin-table-userList-tr-tbody-management-iconGrp-inside-text-1">
                          CHANGE STATUS
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

      <ModalReportDetail
        modalReportDetailIsOpen={modalReportDetailIsOpen}
        closeModalReportDetail={closeModalReportDetail}
        reportDetail={reportDetail}
        getReport={getReport}
        setAdminDesInput={setAdminDesInput}
        adminDesInput={adminDesInput}
        setErrBox={setErrBox}
        errBox={errBox}
      />
    </>
  );
}

export default ReportManage;
