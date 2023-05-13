import React, { useState } from "react";
import inputImage from "../../Picture/activity/AddPicture.svg";
import "./Css/Walking.css";

// รับ props มาจาก Dashboard
const Walking = ({ onAdd, setToggleAdd }) => {

  //เก็บข้อมูล activity เป็น object ถ้าเก็บ state ทีละตัวมันจัดการยาก
  const [activity, setActivity] = useState({
    activity_type:"walking",
    title: "",
    distance: "",
    duration: "",
    location: "",
    date: "",
    description: "",
    feeling: "",
    img: "",
  });

  // console.log(activity);

  //นำค่าที่กรอกใน input มาใส่เข้าไปใน state
  const handleChange = (event) => {
    // เอา name กับ value มาเก็บ object แล้วนำไปใป่ setState Activity
    const { name, value } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(activity);
    // เซ็ต state เป็นค่าว่างเวลากด submit แล้วค่าใน input จะหายไป
    setActivity({
      title: "",
      distance: "",
      duration: "",
      location: "",
      date: "",
      description: "",
      feeling: "",
      img: "",
    });
  };

  const handleDurations500m = () => {
    setActivity({
      distance: +0.5,
    });
  };

  const handleDurations1km = () => {
    setActivity({
      distance: +1,
    });
  };

  const handleDurations2km = () => {
    setActivity({
      distance: +2,
    });
  };

  const handleDurations3km = () => {
    setActivity({
      distance: +3,
    });
  };

  const handleCancle = (e) => {
    console.log("click");
    setToggleAdd(false);
  };

  return (
    <div className="addActivity-form">
      <h2>Add Your Activity</h2>
      <form onSubmit={handleSubmit} className="addActivty">
        <label className="title">
          <h3>Title</h3>
          <input
            name="title"
            type="text"
            value={activity.title}
            onChange={handleChange}
            placeholder="Add Your Title"
          />
        </label>

        <label className="distance">
          <h3>Distance</h3>
          <input
            name="distance"
            type="number"
            value={activity.distance}
            onChange={handleChange}
            placeholder="Add Your distance(kilometer)"
          />
        </label>

        <ul className="distance-preset">
          <li onClick={handleDurations500m}>500 m</li>
          <li onClick={handleDurations1km}>1 km</li>
          <li onClick={handleDurations2km}>2 m</li>
          <li onClick={handleDurations3km}>3 m</li>
        </ul>

        <label className="duration">
          <h3>Duration</h3>
          <input
            name="duration"
            type="number"
            value={activity.duration}
            onChange={handleChange}
            placeholder="Add Your duration(minutes)"
          />
        </label>

        <label className="location">
          <h3>Location</h3>
          <input
            name="location"
            type="text"
            value={activity.location}
            onChange={handleChange}
            placeholder="Add Your location"
          />
        </label>

        <label className="date">
          <h3>Date</h3>
          <input
            name="date"
            type="date"
            value={activity.date}
            onChange={handleChange}
            placeholder="Add Your date"
          />
        </label>

        <label className="description">
          <h3>Description</h3>
          <input
            name="description"
            type="text"
            value={activity.description}
            onChange={handleChange}
            placeholder="Add Your description"
          />
        </label>

        <label className="feeling">
          <h3>Feeling</h3>
          <input
            name="feeling"
            type="text"
            value={activity.feeling}
            onChange={handleChange}
            placeholder="Add Your feeling"
          />
        </label>

        <label className="image">
          <h3>Picture</h3>
          <div>
            <img src={inputImage} alt="icon input for image" />
          </div>
          <input type="file" value={activity.value} />
        </label>

        <button type="submit" className="register-btn">
          Add Activity
        </button>
        <button onClick={() => handleCancle()} className="btn-back">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Walking;
