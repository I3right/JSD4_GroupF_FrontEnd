import React, { useState } from "react";
import inputImage from "../../Picture/activity/AddPicture.svg";
import "./Css/Walking.css";
import { Link } from "react-router-dom";

const AddActivity = () => {
  //เก็บข้อมูล activity เป็น object ถ้าเก็บ state ทีละตัวมันจัดการยาก
  const [activity, setActivity] = useState({
    activity_type: "cycling",
    title: "",
    distance: "",
    duration: "",
    location: "",
    date: "",
    description: "",
    feeling: "",
    img: "",
  });

  //นำค่าที่กรอกใน input มาใส่เข้าไปใน state
  const handleChange = (event) => {
    // เอา name กับ value มาเก็บ object แล้วนำไปใป่ setState Activity
    const { name, value } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  console.log(activity);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("here is activity", activity);
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

  return (
    <div className="addActivity-form">
      <h2>Cycling</h2>
      <h3>Add Your detailed</h3>
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

        <div className="distance-preset">
          <button
            type="button"
            name="distance"
            value="0.5"
            onClick={handleChange}
          >
            0.5 km
          </button>
          <button
            type="button"
            name="distance"
            value="1.0"
            onClick={handleChange}
          >
            1.0 km
          </button>
          <button
            type="button"
            name="distance"
            value="2.0"
            onClick={handleChange}
          >
            2.0 km
          </button>
          <button
            type="button"
            name="distance"
            value="3.0"
            onClick={handleChange}
          >
            3.0 km
          </button>
        </div>

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
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
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

        <button type="submit" className="addActivity-btn addAct-btn">
          Add Activity
        </button>
        <Link to={'/dashboard'} type='button' className="cancleActivity-btn  addAct-btn">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddActivity;
