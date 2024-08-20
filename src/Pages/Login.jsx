// import { useState } from "react";
// import styled from "styled-components";
// import React from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import "../Styles/login.css";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="login-wrapper ">
      <img src={logo} alt="brand" />

      <form>
        <div className="error-message"> </div>
        <div className="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button className="submit"> Login</button>
      </form>
    </div>
  );
};

export default Login;
