import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import Swal from "sweetalert2";
import "./EditUser.css";
import LayoutSignin from "../Layout/LayoutSignin";
import xmark from "../Activity/assets/xmark-solid.svg";
import account from "../../Picture/dashboard/account.svg";

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
  console.log(userId.userId);
  const navigate = useNavigate();
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
        
        const today = new Date(birthdate);
        let today_date = today.getDate();
        let today_month = today.getMonth() + 1;
        if (today_month < 10) {
          today_month = "0" + `${today_month}`;
        }
        let today_year = today.getFullYear();
        const today_fulldate = `${today_year}-${today_month}-${today_date}`;
        birthdate = today_fulldate;

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
          navigate(`/dashboard/${userId.userId}`);
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
    navigate(`/dashboard/${userId.userId}`);
  };


  //photo
  const [loading, setLoading] = useState(false);
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

    function uploadSingleImage(base64) {
        setLoading(true);
        axios
            .post(`${import.meta.env.VITE_APP_KEY}/activities/uploadImage`, { image: base64 })
            .then(async (res) => {
                const imageUrl = res.data;
                console.log(res)
                onImageUpload(imageUrl); // Pass the URL to the parent component
                await Swal.fire({
                    icon: "success",
                    title: "Image uploaded!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }
  };

  //เช็คว่าภาพโหลดยัง
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const onImageUpload = (url) => {
    setUser((prevActivity) => ({
      ...prevActivity,
      userPhoto: url,
    }));
    setIsImageUploaded(true);
  };

  console.log(user.userPhoto)

  
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
        setUser((prevActivity) => ({
          ...prevActivity,
          userPhoto: "",
        }));
        setIsImageUploaded(false);
      }
    });
  };



  return (
    <LayoutSignin>
      <section className="body-edit-profile">
        <form onSubmit={handleSubmit} className="edit-profile">
          {/* user photo */}
          <div className="edit-photo">
            {user.userPhoto==="" && (
              <div className="user-photo">
                <img src={account} alt="user-photo" />
              </div>
            )}

            {user.userPhoto && (
              <div className="user-photo">
                <img src={user.userPhoto} alt="Uploaded" />
              </div>
            )}

            {/* edit logo */}
            <div className="edit-photo-logo">
              <div className="user-logo-delete">
                {/* <img src={xmark} onClick={handleDeleteImage} className="xmark"/> */}
                {/* <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> */}
                <svg 
                  width="800px" 
                  height="800px" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleDeleteImage}
                >
                  <path 
                    d="M19 5L4.99998 19M5.00001 5L19 19" 
                    // stroke="#000000" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    // fill=""
                    // fill-rule="evenodd"
                    // clip-rule="evenodd"
                  />
                </svg>
              </div>
              <label className="user-logo-edit">
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
                <input
                  type="file"
                  onChange={uploadImage} />
              </label>
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
                      <label for="male">
                        <input 
                            type="radio" 
                            value="male" 
                            onChange={handleChange}
                            checked={user.gender=="male"}
                            name="gender" 
                        />
                      Male</label>
                    </div>
                    <div className="select-gender">
                      <label for="female">
                        <input 
                            type="radio" 
                            value="female" 
                            onChange={handleChange}
                            checked={user.gender=="female"}
                            name="gender"
                        />
                      Female</label>
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
