import { useEffect } from "react";
// import styled from "styled-components";
// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../Styles/login.css";
import logo from "../assets/logo.png";

const Login = () => {
    const navigate = useNavigate();
  // set page title
  useEffect(() => {
    document.title = "RSI | Login";
  }, []);

  const loginApp = async ()  => {
    navigate("/dashboard");
    // try {
    //   await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {
    //     username: "admin",
    //     password: "admin",
    //   });
    // } catch (error) {
    //   document.querySelector(".error-message").textContent =
    //     "Invalid credentials. Please try again.";
    // } https://web.facebook.com/reel/2402932933249124
  }

  return (
    <div className="login-wrapper ">
      <img src={logo} alt="brand" />

      <form>
        <div className="error-message"> </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group">
          https://web.facebook.com/reel/2402932933249124
          https://www.msport.com/gh/discounts/240812041826ACT63121319/lucky_draw?share=1&wapShare=1&reload=app
        </div>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button className="submit" onClick={() => loginApp()}>
          {" "}
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
