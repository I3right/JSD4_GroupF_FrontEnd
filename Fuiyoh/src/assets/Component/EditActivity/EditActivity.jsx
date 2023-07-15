import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi";
import Swal from "sweetalert2";
import { useNavigate, Link, useParams } from "react-router-dom";
import LayoutSignin from "../Layout/LayoutSignin";
import UploadImage from "../Activity/UploadImage";
import { getUserId } from "../../service/authorize";
import xmark from "../Activity/assets/xmark-solid.svg";
import bad from "../Activity/assets/bad.png";
import worst from "../Activity/assets/worst.png";
import normal from "../Activity/assets/normal.png";
import good from "../Activity/assets/good.png";
import best from "../Activity/assets/best.png";
import "./editActivity.css";

const formSchema = Joi.object({
  type: Joi.string()
    .valid("walking", "running", "cycling", "hiking", "swimming")
    .required()
    .label("type"),
  title: Joi.string()
    .regex(/^[\u0E00-\u0E7Fa-zA-Z0-9\s.\/]+$/)
    .min(1)
    .required()
    .label("title")
    .messages({
      "string.pattern.base":
        "The title must contain only alphabetic characters (a-z)",
    }),
  distance: Joi.number().greater(0).less(Infinity).precision(3).required().label("distance(km)"),
  duration: Joi.number().greater(0).less(Infinity).integer().required().label("duration(min)"),
  location: Joi.string().allow("").optional().label("location"),
  date: Joi.date().allow("").max("now").optional().label("date"),
  description: Joi.string().allow("").max(150).optional().label("description"),
  feeling: Joi.string()
    .allow("")
    .valid("best", "good", "normal", "bad", "worst")
    .optional()
    .label("feeling"),
  img: Joi.optional().allow("").label("img"),
});

const EditActivity = () => {
  const userId = getUserId()
  const navigate = useNavigate();
  const activityId = useParams();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
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
      const err = error.response.data.message;
      Swal.fire("Error", err, "error");
    }
  };


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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { error, value } = formSchema.validate(activity);
    if (!error) {
      try {
        await axios.put(
          `${import.meta.env.VITE_APP_KEY}/activities/update/${activityId.activityId}`,
          value
        );
        await Swal.fire({
          icon: "success",
          title: "Activity updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/dashboard/${userId}`);
        return; // Exit the function after successful submission
      } catch (error) {
        const err = error.response.data.message;
        Swal.fire("Error", err, "error");
      }
    }

    // Handle validation errors
    error.details.forEach((item) => {
      Swal.fire("Error", item.message, "error");
    });
  };

  const handleCancle = () => {
    navigate(`/dashboard/${userId}`);
  };

  const handleImageUpload = (url) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      img: url,
    }));
    setIsImageUploaded(true);
  };

  const handleDeleteImage = () => {
    Swal.fire({
      title: "คุณต้องการลบรูปใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Image deleted!",
          showConfirmButton: false,
          timer: 1000,
        });
        setActivity((prevActivity) => ({
          ...prevActivity,
          img: "",
        }));
        setIsImageUploaded(false);
      }
    });
  };

  const handleFeelingButtonClick = (value) => {
    setActivity((prevState) => ({
      ...prevState,
      feeling: value,
    }));
  };


  return (
    <LayoutSignin>
      <div className="editActivity-box">
        <form className="editActivity-form" onSubmit={handleUpdate}>
          <h2>Edit Activity</h2>
          <label className="title">
            <h3>Title<span id="require-info">*</span></h3>
            <input
              name="title"
              type="text"
              value={activity.title}
              onChange={handleChange}
              placeholder="Add Your Title"
            />
          </label>

          <label className="distance">
            <h3>Distance<small>(km)</small><span id="require-info">*</span></h3>
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
            value="1"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            1 km
          </button>
          <button
            type="button"
            name="distance"
            value="2"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            2 km
          </button>
          <button
            type="button"
            name="distance"
            value="3"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            3 km
          </button>
          <button
            type="button"
            name="distance"
            value="5"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            5 km
          </button>
          <button
            type="button"
            name="distance"
            value="7"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            7 km
          </button>
        </div>

          <label className="duration">
            <h3>Duration<small>(mins)</small><span id="require-info">*</span></h3>
            <input
              name="duration"
              type="number"
              value={activity.duration}
              onChange={handleChange}
              placeholder="Add Your duration(minutes)"
            />
          </label>

          <div className="duration-preset">
          <button
            type="button"
            name="duration"
            value="30"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            30 mins
          </button>
          <button
            type="button"
            name="duration"
            value="60"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            60 mins
          </button>
          <button
            type="button"
            name="duration"
            value="90"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            90 mins
          </button>
          <button
            type="button"
            name="duration"
            value="120"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            120 mins
          </button>
          <button
            type="button"
            name="duration"
            value="150"
            onClick={handleChange}
            className={" hover:bg-violet-200 rounded-sm bg-violet-100 " }
          >
            150 mins
          </button>
        </div>

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

        
          <div className="feeling">
          <h3>Feeling</h3>
          <div className="flex justify-between">
            <button className={"px-4 py-0.5 hover:bg-violet-200 rounded-sm bg-violet-100 " + (activity.feeling === "worst" ? "bg-violet-200" : "")}
              type="button"
              name="feeling"
              value="worst"
              onClick={() => handleFeelingButtonClick("worst")}
            >
              <img src={worst} alt="worst" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-200 rounded-sm bg-violet-100 " + (activity.feeling === "bad" ? "bg-violet-200	" : "")}
              type="button"
              name="feeling"
              value="bad"
              onClick={() => handleFeelingButtonClick("bad")}
            >
              <img src={bad} alt="bad" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-200 rounded-sm bg-violet-100 " + (activity.feeling === "normal" ? "bg-violet-200	" : "")}
              type="button"
              name="feeling"
              value="normal"
              onClick={() => handleFeelingButtonClick("normal")}
            >
              <img src={normal} alt="normal" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-200 rounded-sm bg-violet-100 " + (activity.feeling === "good" ? "bg-violet-200	p-0.5" : "")}
              type="button"
              name="feeling"
              value="good"
              onClick={() => handleFeelingButtonClick("good")}
            >
              <img src={good} alt="good" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-200 rounded-sm bg-violet-100 " + (activity.feeling === "best" ? "bg-violet-200	p-0.5	" : "")}
              type="button"
              name="feeling"
              value="best"
              onClick={() => handleFeelingButtonClick("best")}
            >
              <img src={best} alt="best" />
            </button>
          </div>
        </div>
         

          <label className="image">
          <h3>Picture</h3>
          {!activity.img && (
            <UploadImage onImageUpload={handleImageUpload} />
          )}
        </label>

          {activity.img && (
            <div className="form-image-container">
              <img src={activity.img} alt="Uploaded" />
              <img src={xmark} onClick={handleDeleteImage} className="xmark"/>
            </div>
          )}

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
