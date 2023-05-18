import React, { useEffect } from "react";
import LayoutNormal from "../Layout/LayoutNormal";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import picLogin from "../../Picture/login/cycling-amico.png";
import logo from "../../Picture/login/logoLogin.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("**Invalid email")
      .required("**Email is required"),
    password: yup
      .string()
      .min(8, "**Password must be at least 8 characters")
      .required("**Password is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    validatedata({ email, password });
    console.log(errors);
    try {
      const loginresult = await axios.post(
        `${import.meta.env.VITE_APP_KEY}/authen/login`,
        { email, password }
      );
      if (loginresult) {
        console.log(loginresult);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const validatedata = async ({ email, password }) => {
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
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
                      <Link to={"/dashboard"}>OR</Link>
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
