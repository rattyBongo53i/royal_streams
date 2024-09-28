import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../base.css";
import View from "../components/Student/view";

const Students = () => {
  // set page title
  useEffect(() => {
    document.title = "RSI | Students";
  }, []);



  return (
    <>
      <div className="base-wrapper">
        <div className="left">
          <Sidebar />
        </div>
        <div className="main-content">
          <div className="heading py-2 px-4">
            <h1>Students</h1>
          </div>
          <View/>
        </div>
      </div>
    </>
  );
};

export default Students;
