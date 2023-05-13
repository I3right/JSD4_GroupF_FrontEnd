import React, { useState } from "react";
import inputImage from "../../Picture/activity/AddPicture.svg";
// import "./Css/Walking.css";
import { useNavigate } from "react-router-dom";

// รับ props มาจาก Dashboard
const Walking = (
  { editActivityList,
    setToggleEdit,
    setEditActivityList,
    activityCard,
    setActivityCard,
    editCardId
  }) => {
  const navigate = useNavigate();


  const handleUpdate = (event) => {
    event.preventDefault();
    setActivityCard(activityCard.map((card) => (card.id === editCardId)? editActivityList: card));
    setToggleEdit(false)
  };
  // 
  
  const handleChange = (event) => {
    // เอา name กับ value มาเก็บ object แล้วนำไปใป่ setState Activity
    const { name, value } = event.target;
    setEditActivityList((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };


  
  return (
    <div className="addActivity-form">
      <h2>Edit Activity</h2>
      <form onSubmit={handleUpdate} className="addActivty">
        <label className="title">
          <h3>Title</h3>
          <input
            name="title"
            type="text"
            value={editActivityList.title}
            onChange={handleChange}
            placeholder="Add Your Title"
          />
        </label>

        <label className="distance">
          <h3>Distance</h3>
          <input
            name="distance"
            type="number"
            value={editActivityList.distance}
            onChange={handleChange}
            placeholder="Add Your distance(kilometer)"
          />
        </label>

        <label className="duration">
          <h3>Duration</h3>
          <input
            name="duration"
            type="number"
            value={editActivityList.duration}
            onChange={handleChange}
            placeholder="Add Your duration(minutes)"
          />
        </label>
        <label className="location">
          <h3>Location</h3>
          <input
            name="location"
            type="text"
            value={editActivityList.location}
            onChange={handleChange}
            placeholder="Add Your location"
          />
        </label>

        <label className="date">
          <h3>Date</h3>
          <input
            name="date"
            type="date"
            value={editActivityList.date}
            onChange={handleChange}
            placeholder="Add Your date"
          />
        </label>

        <label className="description">
          <h3>Description</h3>
          <input
            name="description"
            type="text"
            value={editActivityList.description}
            onChange={handleChange}
            placeholder="Add Your description"
          />
        </label>

        <label className="feeling">
          <h3>Feeling</h3>
          <input
            name="feeling"
            type="text"
            value={editActivityList.feeling}
            onChange={handleChange}
            placeholder="Add Your feeling"
          />
        </label>

        <label className="image">
          <h3>Picture</h3>
          <div>
            <img src={inputImage} alt="icon input for image" />
          </div>
          <input type="file" value={editActivityList.value} />
        </label>

        <button type="submit" className="register-btn">
          Add Activity
        </button>
        <button onClick={() => setToggleEdit(false)} className="btn-back">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Walking;
