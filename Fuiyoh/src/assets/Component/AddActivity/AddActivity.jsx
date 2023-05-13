import React, { useState } from "react";
import ActivitySelector from "../Activity/ActivitySelector";
import LayoutSignin from "../Layout/LayoutSignin";
import Walking from "../Activity/Walking";
import Running from "../Activity/Running";
import Cycling from "../Activity/Cycling";
import Hiking from "../Activity/Hiking";
import Swimming from "../Activity/Swimming";
import "./AddActivity.css";

const AddActivity = () => {
  const [activityType, setActivityType] = useState("");

  const setActivity = (activity) => {
    setActivityType(activity);
  };

  return (
    <LayoutSignin>
      <div className="addActivity">
        <ActivitySelector setActivity={setActivity} />
        {activityType === "walking" && <Walking />}
        {activityType === "running" && <Running/>}
        {activityType === "cycling" && <Cycling/>}
        {activityType === "hiking" && <Hiking/>}
        {activityType === "swimming" && <Swimming/>}
      </div>
    </LayoutSignin>
  );
};

export default AddActivity;
