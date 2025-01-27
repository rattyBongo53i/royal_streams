import { useEffect, useState } from "react";
// import styled from "styled-components";
// import React from 'react'
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import logo from "../assets/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  // set page title
  useEffect(() => {
    document.title = "RSI | Login";
  }, []);

// const loginApp = async (e) => {
//   e.preventDefault();

//   try {
//     if (!email) {
//       toast.error("Please enter a valid email");
//       return false;
//     }

//     const url =
//       "https://app.royalstreamsinternational.org/index.php?action=login";
//     const response = await fetch(url, {
//       method: "POST",
//       mode: "cors", // Ensure CORS mode is enabled
//       headers: {
//         "Content-Type": "application/json", // Correct content type
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data);
//     // handleLogin(); // Uncomment and implement this as needed
//   } catch (error) {
//     console.error(error);
//     toast.error("Invalid email or password");
//   }
// };

// const getUser = async (e) => {
//   e.preventDefault();
//   try {
//     let res = await fetch(
//       "https://app.royalstreamsinternational.org/index.php?action=getAllStudents"
//     );
//     let response = await res.json(); // Correctly parse the response as JSON
//     console.log(response.data);
//   } catch (error) {
//     console.error(error); // Corrected typo
//     toast.error("getUser() function error");
//   }
// };
  

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
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group"></div>
        <div className="input-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="submit"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          {" "}
          Login
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Login;
