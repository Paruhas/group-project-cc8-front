import React, { useEffect, useContext } from "react";
import axios from "../config/axios";

import service from "../services/localStorageService";
import { PinContext } from "../contexts/PinContextProvider";
import PinItems from "./PinItems";

import jwtDecode from "jwt-decode";

function PinBar() {
  const { pin, setPin, pinTrigger } = useContext(PinContext);
  // const [pintrigger, setPintrigger] = React.useState(true);

  useEffect(() => {
    getUserPin();
  }, [pinTrigger]);

  const getUserPin = async () => {
    try {
      // console.log(service.getToken());
      // console.log(jwtDecode(service.getToken()));

      // validate
      if (!service.getToken()) {
        // console.log("No token");
        return;
      }

      const userData = await jwtDecode(service.getToken());
      const resUserPinDat = await axios.get("/pins/user/" + userData.id);
      // console.log(resUserPinDat.data.pinned);
      const {
        data: { pinned },
      } = resUserPinDat;

      setPin(pinned);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(pin);

  return (
    <div className="roomBar-container">
      <div className="dashboad-header">
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <p className="roomBar-container-header-dashLine-text">PIN</p>
        <div className="roomBar-container-header-dashLine-text-padding"></div>
        <div className="roomBar-container-header-dashLine">
          <div className="roomBar-container-header-dashLine-inside"></div>
          <div></div>
        </div>
      </div>
      <div className="roomBar-container-contentList">
        {pin?.map((item, index) => {
          return <PinItems item={item} key={item.id} getUserPin={getUserPin} />;
        })}
      </div>
    </div>
  );
}

export default PinBar;
