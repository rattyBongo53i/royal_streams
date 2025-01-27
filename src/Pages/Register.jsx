import { useEffect } from "react";
// import styled from "styled-components";
// import React from 'react'
import {  useNavigate } from "react-router-dom";
import "../Styles/login.css";
import logo from "../assets/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Register = () => {
  const navigate = useNavigate();
  // set page title
  useEffect(() => {
    document.title = "RSI | Login";
  }, []);

  const loginApp = async () => {
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
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // setError(""); // Clear previous errors

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        "kojo53i@live.com",
        "admin1234"
      );
      console.log("User signed in:", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err.message);
      // setError(err.message); // Display error to the user
    }
  };

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
        <div className="input-group"></div>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button className="submit" type="submit" onClick={() => loginApp()}>
          {" "}
          Login
        </button>
        <button className="submit" onClick={(e) => handleLogin(e)}>
          {" "}
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
