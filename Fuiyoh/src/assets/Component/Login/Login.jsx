import React from "react";
import LayoutNormal from "../Layout/LayoutNormal";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import picLogin from "../../Picture/login/cycling-amico.png";
import logo from "../../Picture/login/logoLogin.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("**Invalid email")
      .required("**Email is required"),
    password: yup.string().required("**Password is required"),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    schema
      .validate({ email, password }, { abortEarly: false })
      .then(() => {
        // form is valid, submit it
        console.log("Form is valid");
      })
      .catch((err) => {
        // form is invalid, set the errors
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <LayoutNormal>
      <div className="body-login">
        <div className="main-container">
          <div className="main-container-form">
            <div className="left-side">
              <div>
                <img src={picLogin} alt="" />
              </div>
            </div>
            <div className="right-side">
              <h1>LOG IN</h1>
              <div className="logoLogin">
                <img src={logo} alt="" />
              </div>
              <form className="form-container" onSubmit={handleSubmit}>
                <div className="login-box">
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

                  {/* error zone */}
                  <div>
                    {errors.email && <p className="error">{errors.email}</p>}
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>

                  <div className="button">
                    <button id="buttonLogin">Log In</button>
                    <Link to="/" id="buttonBack">
                      Back
                    </Link>
                    <div className="or-text">
                      <p>OR</p>
                    </div>
                    <Link to="/Register" id="buttonRegister">
                      Register Now!
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutNormal>
  );
};

export default Login;
