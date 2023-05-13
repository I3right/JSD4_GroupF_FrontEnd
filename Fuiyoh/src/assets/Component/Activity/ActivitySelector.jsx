import React, { useState } from "react";

import walkingNormal from "../../Picture/activity/walking-normal.svg";
import runningNormal from "../../Picture/activity/running-normal.svg";
import cyclingNormal from "../../Picture/activity/cycling-normal.svg";
import hikingNormal from "../../Picture/activity/hiking-normal.svg";
import swimmingNormal from "../../Picture/activity/swimming-normal.svg";

import walkingHover from "../../Picture/activity/walking-hover.svg";
import runningHover from "../../Picture/activity/running-hover.svg";
import cyclingHover from "../../Picture/activity/cycling-hover.svg";
import hikingHover from "../../Picture/activity/hiking-hover.svg";
import swimmingHover from "../../Picture/activity/swimming-hover.svg";

const ActivitySelector = ({setActivity}) => {
  const [walkImg, setWalkImg] = useState(walkingNormal);
  const [runImg, setRunImg] = useState(runningNormal);
  const [cyclingImg, setcyclingImg] = useState(cyclingNormal);
  const [hikeImg, sethikeImg] = useState(hikingNormal);
  const [swimImg, setswimImg] = useState(swimmingNormal);

  const changeImgWalking = () => {
    setWalkImg(walkingHover);
    setRunImg(runningNormal);
    setcyclingImg(cyclingNormal);
    sethikeImg(hikingNormal);
    setswimImg(swimmingNormal);

    setActivity('walking')
  };

  const ChangeImgRunning = () => {
    setWalkImg(walkingNormal);
    setRunImg(runningHover);
    setcyclingImg(cyclingNormal);
    sethikeImg(hikingNormal);
    setswimImg(swimmingNormal);

    setActivity('running');
  };

  const ChangeImgCycling = () => {
    setWalkImg(walkingNormal);
    setRunImg(runningNormal);
    setcyclingImg(cyclingHover);
    sethikeImg(hikingNormal);
    setswimImg(swimmingNormal);

    setActivity('cycling');
  };

  const ChangeImgHiking = () => {
    setWalkImg(walkingNormal);
    setRunImg(runningNormal);
    setcyclingImg(cyclingNormal);
    sethikeImg(hikingHover);
    setswimImg(swimmingNormal);

    setActivity('hiking');
  };

  const ChangeImgSwimming = () => {
    setWalkImg(walkingNormal);
    setRunImg(runningNormal);
    setcyclingImg(cyclingNormal);
    sethikeImg(hikingNormal);
    setswimImg(swimmingHover);

    setActivity('swimming');
  };

  return (
    <div>
      <h2>Select Your Activity</h2>
      <div className="activity-selecter">
        <label>
          <input
            type="radio"
            name="activityRadio"
            onClick={() => changeImgWalking()}
          />
          <div><img src={walkImg} alt="Walikng icon" className="walking" /></div>
        </label>

        <label>
          <input
            type="radio"
            name="activityRadio"
            onClick={() => ChangeImgRunning()}
          />
          <div><img src={runImg} alt="Running icon" className="running" /></div>
        </label>

        <label>
          <input
            type="radio"
            name="activityRadio"
            onClick={() => ChangeImgCycling()}
          />
          <div><img src={cyclingImg} alt="Cycling icon" className="cycling" /></div>
        </label>

        <label>
          <input
            type="radio"
            name="activityRadio"
            onClick={() => ChangeImgHiking()}
          />
          <div><img src={hikeImg} alt="Hiking icon" className="hiking" /></div>
        </label>

        <label>
          <input
            type="radio"
            name="activityRadio"
            onClick={() => ChangeImgSwimming()}
          />
          <div><img src={swimImg} alt="Swimming icon" className="swimming" /></div>
        </label>
      </div>
    </div>
  );
};

export default ActivitySelector;
