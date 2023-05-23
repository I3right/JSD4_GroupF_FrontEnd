import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import "./EditUser.css";
import LayoutSignin from "../Layout/LayoutSignin";

const formSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .required(),
  fullname: Joi.string(),
  birthdate: Joi.date(),
  gender: Joi.string()
    .valid("male", "female"),
  weight: Joi.number()
    .integer(),
  height: Joi.number()
    .integer(),
  location: Joi.string(),
  bio: Joi.string()
    .max(300),
  userPhoto: Joi.optional()
    .allow("")
    .label("img"),
  
})

const EditUser = () => {
  const userId = useParams();
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    birthdate: "",
    gender: "",
    weight: "",
    height: "",
    location: "",
    bio: "",
    userPhoto: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_KEY}/users/getuserid/${userId.userId}`
      );

      // ถ้ามีข้อมูลอยู่แล้ว ให้แสดงข้อมูลเดิม
      if (response) {
        // console.log(response)
        const { username } = response.data;
        let { fullname, birthdate, gender, weight, height, location, bio, userPhoto } = response.data;
        
        // console.log(user)
        setUser(()=> ({
          ...user,
          username: username,
          fullname: fullname,
          birthdate: birthdate,
          gender: gender,
          weight: weight,
          height: height,
          location: location,
          bio: bio,
          userPhoto: userPhoto,
        }));
      }
    }
    catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, value } = formSchema.validate(user);
    // console.log(user)
    if (!error) {
      try {
          const response = await axios.put(
            `${import.meta.env.VITE_APP_KEY}/users/update/${userId.userId}`, 
            // { username, fullname, birthdate, gender, weight, height, location, bio, userPhoto }
            value
          );
          await Swal.fire({
            icon: "success",
            title: "User updated!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
          return;
      }
      catch (error) {
          console.log(error);
      }
    }
    // error.details.forEach((item) => {
    //   Swal.fire("Error", item.message, "error");
    // });
  };

  const handleCancle = () => {
    navigate("/dashboard");
  };


  return (
    <LayoutSignin>
      <section className="body-edit-profile">
        <form onSubmit={handleSubmit} className="edit-profile">
          {/* user photo */}
          <div className="edit-picture">
            <div className="user-picture">
              <img src="" alt="user-photo" />
            </div>

            {/* edit logo */}
            <div className="edit-picture-logo">
              {/* <?xml version="1.0" encoding="utf-8"? /> */}
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z"
                  fill=""
                />
              </svg>
            </div>
          </div>

          {/* user data */}
          <div className="edit-information">
            <div className="input-information">
                <label for="">Username</label>
                <input 
                    name="username" 
                    type="text" 
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username" 
                />
            </div>

            <div className="input-information">
                <label for="">Name</label>
                <input 
                    name="fullname" 
                    type="text" 
                    value={user.fullname}
                    onChange={handleChange}
                    placeholder="Fullname" 
                />
            </div>
            <div className="input-information">
                <label for="">Birthdate</label>
                <input 
                    name="birthdate" 
                    type="date" 
                    value={user.birthdate}
                    onChange={handleChange}
                    placeholder="Birthdate" 
                />
            </div>
            <div className="input-information">
                <p>
                    <b>Gender</b>
                </p>
                <div className="input-gender">
                    <div className="select-gender">
                        <input 
                            type="radio" 
                            value="male" 
                            onChange={handleChange}
                            name="gender" 
                        />
                        <label for="male">Male</label>
                    </div>
                    <div className="select-gender">
                        <input 
                            type="radio" 
                            value="female" 
                            onChange={handleChange}
                            name="gender"
                        />
                        <label for="female">Female</label>
                    </div>
                </div>
            </div>
            <div className="input-information">
                <label for="">Weight</label>
                <input name="weight" 
                    type="number" 
                    value={user.weight}
                    onChange={handleChange}
                    placeholder="Weight (kg)" 
                />
            </div>
            <div className="input-information">
                <label for="">Height</label>
                <input 
                    name="height" 
                    type="number" 
                    value={user.height}
                    onChange={handleChange}
                    placeholder="Height (cm)"
                />
            </div>
            <div className="input-information">
                <label for="">Location</label>
                <input 
                    name="location" 
                    type="text" 
                    value={user.location}
                    onChange={handleChange}
                    placeholder="Location" 
                />
            </div>
            <div className="input-information">
                <label for="">Bio</label>
                <input 
                    name="bio" 
                    type="text" 
                    value={user.bio}
                    onChange={handleChange}
                    placeholder="Biography" 
                />
            </div>
          </div>

          {/* button */}
          <div className="profile-button">
            {/* <Link to={"/dashboard"}> */}
                <button id="saveBtn" type="submit">
                    <b>Save</b>
                </button>
            {/* </Link> */}
            {/* <Link to={"/dashboard"}> */}
                <button 
                    onClick={handleCancle} 
                    id="cancleBtn" 
                    type="button"
                >
                    <b>Cancle</b>
                </button>
            {/* </Link> */}
          </div>
          
        </form>
      </section>
    </LayoutSignin>
  );
};

export default EditUser;
