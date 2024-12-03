import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../base.css";
import View from "../components/Student/view";
import { motion } from "framer-motion";

const Students = () => {
  // set page title
  useEffect(() => {
    document.title = "RSI | Students";
  }, []);



  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="base-wrapper">
          <div className="left">
            <Sidebar />
          </div>
          <div className="main-content">
            <div className="heading py-2 px-4">
              <h1>Students</h1>
            </div>
            <View />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Students;
