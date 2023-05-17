import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi";
import Swal from "sweetalert2";
import inputImage from "../../Picture/activity/AddPicture.svg";
import { useNavigate, Link, useParams } from "react-router-dom";
import LayoutSignin from "../Layout/LayoutSignin";
import "./editActivity.css";

const formSchema = Joi.object({
  type: Joi.string()
    .valid("walking", "running", "cycling", "hiking", "swimming")
    .required()
    .label("type"),
  title: Joi.string()
    .regex(/^[A-Za-z\s]+$/)
    .min(1)
    .max(20)
    .required()
    .label("title")
    .messages({
      "string.pattern.base":
        "The title must contain only alphabetic characters (a-z)",
    }),
  distance: Joi.number().integer().required().label("distance(km)"),
  duration: Joi.number().integer().required().label("duration(min)"),
  location: Joi.string().allow("").optional().label("location"),
  date: Joi.date().allow("").iso().optional().label("date"),
  description: Joi.string().allow("").max(150).optional().label("description"),
  feeling: Joi.string()
    .allow("")
    .valid("best", "good", "normal", "bad", "worst")
    .optional()
    .label("feeling"),
  img: Joi.optional().allow("").label("img"),
});

const EditActivity = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    type: "",
    title: "",
    distance: "",
    duration: "",
    location: "",
    date: "",
    description: "",
    feeling: "",
    img: "",
  });
  const activityId = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_KEY}/activities/get/${activityId.activityId}`
      );
      if (response) {
        const { type, title, distance, duration } = response.data;
        let { location, date, description, feeling, img } = response.data;

        const today = new Date(date);
        let today_date = today.getDate();
        let today_month = today.getMonth() + 1;
        if (today_month < 10) {
          today_month = "0" + `${today_month}`;
        }
        let today_year = today.getFullYear();
        const today_fulldate = `${today_year}-${today_month}-${today_date}`;
        date = today_fulldate;

        setActivity({
          ...activity,
          type,
          title,
          distance,
          duration,
          location,
          date,
          description,
          feeling,
          img,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(activity);

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value,
    }));
  };
  console.log(activity);
  const handleUpdate = async (event) => {
    event.preventDefault();
    const { error, value } = formSchema.validate(activity);
    if (!error) {
      try {
        await axios.put(
          `${import.meta.env.VITE_APP_KEY}/activities/update/${
            activityId.activityId
          }`,
          value
        );
        await Swal.fire({
          icon: "success",
          title: "Activity updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
        return; // Exit the function after successful submission
      } catch (err) {
        console.log(err);
      }
    }

    // Handle validation errors
    error.details.forEach((item) => {
      Swal.fire("Error", item.message, "error");
    });
  };

  const handleCancle = () => {
    navigate("/dashboard");
  };

  return (
    <LayoutSignin>
      <div className="editActivity-box">
        <form className="editActivity-form" onSubmit={handleUpdate}>
          <h2>Edit Activity</h2>
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
              onBlur={(e) => (e.target.value = activity.date)}
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
            <input type="file" value={activity.img} onChange={handleChange} />
          </label>

          <button type="submit" className="addActivity-btn addAct-btn">
            Update
          </button>
          <button
            onClick={() => handleCancle()}
            className="cancleActivity-btn  addAct-btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </LayoutSignin>
  );
};

export default EditActivity;
