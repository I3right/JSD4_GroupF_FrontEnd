import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutNormal from "../Layout/LayoutNormal";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import axios from "axios" ;
import Swal from "sweetalert2";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("**Username is required"),
    email: yup
      .string()
      .email("**Invalid email")
      .required("**Email is required"),
    password: yup
      .string()
      .min(8, "**Password must be at least 8 characters")
      .required("**Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "**Passwords must match")
      .required("**Confirm Password is required"),
  });

  // const handleRegisterButtonClick = () => {
  //   schema
  //     .validate(
  //       { username, email, password, confirmPassword },
  //       { abortEarly: false }
  //     )
  //     .then(() => {
  //       // form is valid, submit it
  //       console.log("Form is valid");
  //       navigate("/Login");
  //     })
  //     .catch((err) => {
  //       // form is invalid, set the errors
  //       const newErrors = {};
  //       err.inner.forEach((error) => {
  //         newErrors[error.path] = error.message;
  //       });
  //       setErrors(newErrors);
  //     });
  // };


  const handleRegisterButtonClick = () => {
    schema
      .validate(
        { username, email, password, confirmPassword },
        { abortEarly: false }
      )
      .then(() => {
        // Form is valid, submit it
        console.log("Form is valid");

        // Send a POST request to register the user
        const data = {
          username,
          email,
          password,
        };

        axios
          .post(`${import.meta.env.VITE_APP_KEY}/users/create`, data)
          .then((response) => {
            // Registration successful
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "Registered Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate("/Login");
          })
          .catch((error) => {
            // Registration failed
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500,
            });
          });
      })
      .catch((err) => {
        // Form is invalid, set the errors
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegisterButtonClick();
  };

  return (
    <LayoutNormal>
      <div className="body-register">
        <div className="container">
          <div className="from-container">
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit}>
              <div className="login-box">
                <div className="user-box">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label>Confirm Password</label>
                </div>

                {/* error zone */}

                <div>
                  {errors.username && (
                    <p className="error">{errors.username}</p>
                  )}
                  {errors.email && <p className="error">{errors.email}</p>}
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="button">
                  <button id="buttonRegister-register" type="submit">
                    Register
                  </button>
                  <Link to="/" id="buttonBack">
                    Back
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutNormal>
  );
};

export default Register;
