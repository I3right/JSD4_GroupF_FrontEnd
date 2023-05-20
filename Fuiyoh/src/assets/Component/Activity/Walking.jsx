import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Joi from "joi";
import "./Css/Walking.css";
import UploadImage from "./UploadImage";
import xmark from "./assets/xmark-solid.svg";
import bad from "./assets/bad.png";
import worst from "./assets/worst.png";
import normal from "./assets/normal.png";
import good from "./assets/good.png";
import best from "./assets/best.png";


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
    .messages({"title.required":"Please fill title wtih alphabet(A-Z)"}),
  distance: Joi.number().integer().required().label("distance(km)"),
  duration: Joi.number().integer().required().label("duration(min)"),
  location: Joi.string().allow("").optional().label("location"),
  date: Joi.date().allow("").iso().optional().label("date"),
  description: Joi.string().allow("").max(150).optional().label("description"),
  feeling: Joi.string().allow("")
    .valid("best", "good", "normal", "bad", "worst")
    .optional()
    .label("feeling"),
  img: Joi.optional().allow("").label("img"),
});

const AddActivity = () => {
  const navigate = useNavigate();
  //เก็บข้อมูล activity เป็น object ถ้าเก็บ state ทีละตัวมันจัดการยาก
  const [activity, setActivity] = useState({
    type: "walking",
    title: "",
    distance: "",
    duration: "",
    location: "",
    date: "",
    description: "",
    feeling: "",
    img: "",
  });

  const [isImageUploaded, setIsImageUploaded] = useState(false);


  const handleImageUpload = (url) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      img: url,
    }));
    setIsImageUploaded(true);
  };

  const handleDeleteImage = () => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      img: "",
    }));
    setIsImageUploaded(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value === undefined ? "" : value,
    }));
  };

  const handleFeelingButtonClick = (value) => {
    setActivity((prevState) => ({
      ...prevState,
      feeling: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // ส้ร้าง obj ใหม่ชื่อ fieldToValide เพื่อลดข้อมูลไม่ได้กรอกทิ้งเพื่อจะได้ไม่รกที่ฝั่ง DB สร้างจากการ iterate activity
    // ใช้ reduce เพื่อที่ว่าจะได้ใช้ค่าเดิม(acc) กับค่าตัวถัดไป(key) ซึ่งถ้าค่าที่เอามาวนลูปไม่ใช่ "" ก็จะเพิ่มค่าเข้าไปใน fieldToValide
    // const fieldsToValidate = Object.keys(activity).reduce((acc, key) => {
    //   // เช็คว่าเป็น "" ไหมถ้าไม่ใช่ก็เพิ่มค่า
    //   if (activity[key] !== "") {
    //     // เพิ่มค่าด้วย key และ value ที่ตรงกับ activity
    //     acc[key] = activity[key];
    //   }
    //   return acc;
    // }, {});

    // ลองเปลี่ยนเป็น fieldToValidate โดยให้เช็คค่าของ activity ถ้าค่านั้นเป็นค่าว่างให้เปลี่ยนเป็น null
    // const fieldsToValidate = Object.keys(activity).reduce((acc, key) => {
    //   const value = activity[key];
    //   // Check if the value is an empty string
    //   if (value === "") {
    //     // Assign null instead of deleting the key
    //     acc[key] = null;
    //   } else {
    //     // Add the key-value pair to the fieldsToValidate object
    //     acc[key] = value;
    //   }
    //   return acc;
    // }, {});

    // const { error, value } = formSchema.validate(fieldsToValidate);

    const { error, value } = formSchema.validate(activity);

    if (!error) {
      try {
        await axios.post(
          `${import.meta.env.VITE_APP_KEY}/activities/create`,
          value
        );
        await Swal.fire({
          icon: "success",
          title: "Activity Created!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard");
        return; // Exit the function after successful submission
      } catch (err) {
        await Swal.fire({
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }

    // Handle validation errors
  if(error){
    console.log(error);
    Swal.fire({
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1000,
    });
  }
  };

  return (
    <div className="addActivity-form ">
      <h2>Walking</h2>
      <h3>Add Your detailed</h3>
      <form onSubmit={handleSubmit} className="addActivty">
        <label className="title">
          <h3>Title*</h3>
          <input
            name="title"
            type="text"
            value={activity.title}
            onChange={handleChange}
            placeholder="Add Your Title"
          />
        </label>

        <label className="distance">
          <h3>Distance*</h3>
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
            className="hover:bg-violet-100"
          >
            1 km
          </button>
          <button
            type="button"
            name="distance"
            value="2"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            2 km
          </button>
          <button
            type="button"
            name="distance"
            value="3"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            3 km
          </button>
          <button
            type="button"
            name="distance"
            value="5"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            5 km
          </button>
          <button
            type="button"
            name="distance"
            value="7"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            7 km
          </button>
        </div>

        <label className="duration">
          <h3>Duration*</h3>
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
            className="hover:bg-violet-100"
          >
            30 mins
          </button>
          <button
            type="button"
            name="duration"
            value="60"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            60 mins
          </button>
          <button
            type="button"
            name="duration"
            value="90"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            90 mins
          </button>
          <button
            type="button"
            name="duration"
            value="120"
            onClick={handleChange}
            className="hover:bg-violet-100"
          >
            120 mins
          </button>
          <button
            type="button"
            name="duration"
            value="150"
            onClick={handleChange}
            className="hover:bg-violet-100"
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

        <div className="feeling">
          <h3>Feeling</h3>
          <div className="flex justify-between">
            <button className={"px-4 py-0.5 hover:bg-violet-100 rounded-sm " + (activity.feeling === "worst" ? "bg-violet-100" : "")}
              type="button"
              name="feeling"
              value="worst"
              onClick={() => handleFeelingButtonClick("worst")}
            >
              <img src={worst} alt="worst" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-100 rounded-sm " + (activity.feeling === "bad" ? "bg-violet-100	" : "")}
              type="button"
              name="feeling"
              value="bad"
              onClick={() => handleFeelingButtonClick("bad")}
            >
              <img src={bad} alt="bad" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-100 rounded-sm " + (activity.feeling === "normal" ? "bg-violet-100	" : "")}
              type="button"
              name="feeling"
              value="normal"
              onClick={() => handleFeelingButtonClick("normal")}
            >
              <img src={normal} alt="normal" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-100 rounded-sm " + (activity.feeling === "good" ? "bg-violet-100	p-0.5" : "")}
              type="button"
              name="feeling"
              value="good"
              onClick={() => handleFeelingButtonClick("good")}
            >
              <img src={good} alt="good" />
            </button>
            <button className={"px-4 py-0.5 hover:bg-violet-100 rounded-sm " + (activity.feeling === "best" ? "bg-violet-100	p-0.5	" : "")}
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
          {!isImageUploaded && (
            <UploadImage onImageUpload={handleImageUpload} />
          )}
        </label>

          {isImageUploaded && (
            <div className="form-image-container">
              <img src={activity.img} alt="Uploaded" />
              <img src={xmark} onClick={handleDeleteImage} className="xmark"/>
            </div>
          )}

        <button type="submit" className="addActivity-btn addAct-btn">
          Add Activity
        </button>
        <Link
          to={"/dashboard"}
          type="button"
          className="cancleActivity-btn  addAct-btn"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddActivity;
