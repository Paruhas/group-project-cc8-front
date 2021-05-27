import React, { useState } from "react";
import axios from "../../config/axios";

// Modal import
import Modal from "react-modal";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalReportTopic(props) {
  const [reportInput, setReportInput] = useState({});

  const handlerReportInputChange = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.value);

    const { id, value } = e.target;
    setReportInput((prev) => ({ ...prev, [id]: value }));
  };
  // console.log(reportInput);

  const handlerSubmitReportTopic = async (e) => {
    e.preventDefault();
    try {
      // console.log(reportInput.reportContent);
      // console.log(props.topicDetail.id);

      // validate
      if (!reportInput.reportContent || !reportInput.reportContent.trim()) {
        throw Error("กรุณากรอก reportContent");
      }

      const createReport = await axios.post("/user/report/", {
        reportContent: reportInput.reportContent,
        topicId: props.topicDetail.id,
      });

      Swal.fire({
        title: `Report TopicId ${props.topicDetail.id} สำเร็จ`,
        icon: "success",
      });
      props.handleReport();

      props.closeModalReport();
      props.setTopicDetail();
      props.setReported(true);
      setReportInput({});
    } catch (err) {
      console.log(err);
      setReportInput({});
    }
  };

  return (
    <Modal
      isOpen={props.modalReportIsOpen}
      onRequestClose={props.closeModalReport}
      style={customStyles}
      contentLabel="ReportTopic Modal"
      ariaHideApp={false}
    >
      <div className="modal-reportTopic-box">
        <div className="modal-reportTopic-box-header">
          <div className="modal-reportTopic-box-header-text">Report Topic</div>
          <div onClick={props.closeModalReport}>X</div>
        </div>
        <div className="modal-reportTopic-box-content">
          <div className="modal-reportTopic-box-content-textDiv1">
            <p>Report Topic Id: {props.topicDetail?.id}</p>
            <p>Post By Username: {props.topicDetail?.User.username}</p>
          </div>
          <div className="modal-reportTopic-box-content-textDiv2">
            <p>เหตุผลการ Report</p>
            <textarea
              id="reportContent"
              type="input"
              className="modal-reportTopic-box-content-text-textArea"
              onChange={handlerReportInputChange}
            />
          </div>
        </div>
        <div className="modal-reportTopic-box-footer">
          <button
            className="modal-roomAdd-box-footer-btnSubmit"
            onClick={(e) => handlerSubmitReportTopic(e)}
          >
            Submit Report Topic
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalReportTopic;
