import React, { useState, useEffect } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import Swal from "sweetalert2";
import "./EditUser.css";
import LayoutSignin from "../Layout/LayoutSignin";
import account from "../../Picture/dashboard/account.svg";
import Spinner from "../Activity/assets/Spinner.svg";

const formSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .required(),
  fullname: Joi.string().allow(''),
  birthdate: Joi.date().iso().allow('').max("now"),
  gender: Joi.string().allow('')
    .valid("male", "female"),
  weight: Joi.number().greater(0).less(Infinity)
    .integer(),
  height: Joi.number().greater(0).less(Infinity)
    .integer(),
  location: Joi.string().max(50).allow(""),
  bio: Joi.string().allow("")
    .max(100),
  userPhoto: Joi.optional()
    .allow("")
    .label("img"),
  
})

const EditUser = () => {
  const userId = useParams();
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

  console.log(user);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_KEY}/users/getuserid/${userId.userId}`
      );
      
      // ถ้ามีข้อมูลอยู่แล้ว ให้แสดงข้อมูลเดิม
      if (response) {
        // fist time
        const { username } = response.data;
        let { weight, height} = response.data;
        
        // get data after edit user
        let { fullname, birthdate, gender, location, bio, userPhoto } = response.data;
        
        if(birthdate === undefined || birthdate === null){
          birthdate = ""
        } else {
          const today = new Date(birthdate);
          let today_date = today.getDate();
          let today_month = today.getMonth() + 1;
          if (today_month < 10) {
            today_month = "0" + `${today_month}`;
          }
          let today_year = today.getFullYear();
          const today_fulldate = `${today_year}-${today_month}-${today_date}`;
          birthdate = today_fulldate;
        }
          
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
      const err = error.response.data.message;
      Swal.fire("Error", err, "error");
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
        const err = error.response.data.message;
        Swal.fire("Error", err, "error");

      }
    }
    error.details.forEach((item) => {
      Swal.fire("Error", item.message, "error");
    });
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
                onImageUpload(imageUrl); // Pass the URL to the parent component
                await Swal.fire({
                    icon: "success",
                    title: "Image uploaded!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .then(() => setLoading(false))
    }

  const uploadImage = async (event) => {
    const files = event.target.files;

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
          <h2>Edit User Information</h2>
          
          {/* user photo */}
          <div className="edit-photo">
          
            {user.userPhoto==="" && (
              <div className="user-photo">
                {loading && <img src={Spinner} alt="user-photo" />}
                {!loading && <img src={account} alt="user-photo" />}
              </div>
            )}

            {user.userPhoto && (
              <div className="user-photo">
                <img src={user.userPhoto} alt="Uploaded" />
              </div>
            )}

            {/* edit logo */}
            <div className="edit-photo-logo">
              <div className="user-logo-delete" >
              <label
              onClick={handleDeleteImage}>
                {user.userPhoto !== "" && <i className="user-logo-delete fa-solid fa-xmark"></i>}
              </label>
              </div>

              <label className="user-logo-edit">
                {/* <?xml version="1.0" encoding="utf-8"? /> */}
                {user.userPhoto === "" && <i className="user-logo-edit fas fa-edit"></i> }
                <input
                  type="file"
                  onChange={uploadImage} />
              </label>
            </div>
          </div>

          {/* user data */}
          <div className="edit-information">
            <div className="input-information">
                <label className="editUser-subject">
                <p>Username<span id="require-info">*</span></p>
                <input 
                    name="username" 
                    type="text" 
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username" 
                />
                </label>
            </div>

            <div className="input-information">
                <label className="editUser-subject"><p>Name</p>
                <input 
                    name="fullname" 
                    type="text" 
                    value={user.fullname}
                    onChange={handleChange}
                    placeholder="Fullname" 
                />
                </label>
            </div>
            <div className="input-information">
                <label className="editUser-subject"><p>Birthdate</p>
                <input 
                    name="birthdate" 
                    type="text" 
                    value={user.birthdate}
                    onChange={handleChange}
                    placeholder="add Your birthdate" 
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                />
                </label>
            </div>
            <div className="input-information">
                <label className="editUser-subject">
                    <p>Gender</p>
                </label>
                <div className="input-gender">
                    <div className="select-gender">
                      <label>
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
                      <label  className="editUser-subject">
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
                <label className="editUser-subject"><p>Weight</p>
                <input name="weight" 
                    type="number" 
                    value={user.weight}
                    onChange={handleChange}
                    placeholder="Weight (kg)" 
                />
                </label>
            </div>
            <div className="input-information">
                <label className="editUser-subject"><p>Height</p>
                <input 
                    name="height" 
                    type="number" 
                    value={user.height}
                    onChange={handleChange}
                    placeholder="Height (cm)"
                />
                </label>
            </div>
            <div className="input-information">
                <label className="editUser-subject"><p>Location</p>
                <input 
                    name="location" 
                    type="text" 
                    value={user.location}
                    onChange={handleChange}
                    placeholder="Location" 
                />
                </label>
            </div>
            <div className="input-information">
                <label className="editUser-subject"><p>Bio</p>
                <input 
                    name="bio" 
                    type="text" 
                    value={user.bio}
                    onChange={handleChange}
                    placeholder="Biography" 
                />
                </label>
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
