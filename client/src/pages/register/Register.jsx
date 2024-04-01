import React, { useRef, useState, useEffect } from "react";
import "./register.css";
import Copyright from "../../components/copyright/Copyright";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {}, [passwordValue, confirmPasswordValue]);

  const handleInputPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleConfirmInputPassword = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordValue !== confirmPasswordValue) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordValue,
      };
      try {
        await axios.post("http://localhost:8000/api/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="login">
        <div className="alert">
          {showAlert && (
            <Alert severity="error" color="error">
              Password don't match!
            </Alert>
          )}
        </div>
        <div className="loginWrapper">
          <div className="loginLeft">
            <img src="/assets/connection.png" alt="" className="wplogin" />
          </div>

          <div className="loginRight">
            <div className="logoWrapper">
              <h3 className="loginLogo">We Meet</h3>
              <p className="loginDesc">
                Connect with friends and the world around you on We Meet
              </p>
            </div>

            <form
              action=""
              onSubmit={(e) => handleSubmit(e)}
              className="loginBox"
            >
              <input
                placeholder="Username"
                required
                ref={usernameRef}
                className="loginInput"
              />
              <input
                placeholder="Email"
                type="email"
                required
                ref={emailRef}
                className="loginInput"
              />
              <input
                placeholder="Password"
                type="password"
                required
                onChange={handleInputPassword}
                className="loginInput"
                minLength="6"
              />
              <input
                placeholder="Confirm Password"
                type="password"
                required
                onChange={handleConfirmInputPassword}
                className="loginInput"
                minLength="6"
              />
              <button type="submit" className="loginButton">
                Sign Up
              </button>
              <span className="loginIntoAccount">
                Already have an account ?{" "}
                <Link to="/login" className="logintext">
                  Login
                </Link>{" "}
              </span>
            </form>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Register;
