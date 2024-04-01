import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import Copyright from "../../components/copyright/Copyright";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext); // get the props that we provided from AuthContext
  const handleSubmit = (e) => {
    e.preventDefault();
    // call the loginCall function
    loginCall(
      { email: emailRef.current.value, password: passwordRef.current.value },
      dispatch
    );
  };
  console.log(user);

  return (
    <>
      <div className="login">
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
                placeholder="Email"
                type="email"
                required
                className="loginInput"
                ref={emailRef}
              />
              <input
                placeholder="Password"
                type="password"
                required
                minLength="5"
                className="loginInput"
                ref={passwordRef}
              />
              <button
                type="submit"
                className="loginButton"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <Link
                className={`loginRegisterButton ${
                  isFetching ? "disabled" : ""
                }`}
                to={isFetching ? "#" : "/register"}
              >
                <span>Create a New Account</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default Login;
