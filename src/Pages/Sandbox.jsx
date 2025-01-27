import  { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../base.css";
import "../components/Finance/styles/invoice.css";
import { useAuth } from "../context/useAuth";
import "../components/Finance/styles/sandbox.css";
// src\components\Finance\styles\.css firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";


const Sandbox = () => {
    const [students, setStudents] = useState([]);
    const { currentUser, logout } = useAuth();
   const navigate = useNavigate();
      useEffect(() => {
        document.title = "RSI | Sandbox";
      }, []);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

      useEffect(() => {
        try {
          const url = `${import.meta.env.VITE_App_API_URL}/people`;
          (async () => {
            let response = await fetch(url);
            let data = await response.json();
            setStudents(data);
            console.log(data);
          })();
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }, []);

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
        alert("Login successful!");
      } catch (err) {
        console.error("Error during login:", err.message);
        // setError(err.message); // Display error to the user
      }
    };

  return (
    <>
      <div className="base-wrapper">
        <div className="left">
          <Sidebar />
        </div>
        <div className="main-content">
          <h1>Sandbox</h1>
          <div className="firebase">
            <button className="btn" onClick={logout}>
              logout
            </button>
            <button className="btn" onClick={handleLogin}>
              Submit
            </button>
          </div>
          <div className="table-area">
            <table>
              <thead>
                <tr>
                  <th>official Name</th>
                  <th>email</th>
                  <th>username</th>
                  <th>birthdate</th>
                  <th>gender</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.officialName}</td>
                    <td>{student.email}</td>
                    <td>{student.username}</td>
                    <td>{student.dob}</td>
                    <td>{student.gender}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sandbox;
