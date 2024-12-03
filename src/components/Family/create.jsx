import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import "./styles/edit.css";

const create = () => {
      const [selectStatusMarriage, setSelectstatusMarriage]= useState("Married");
      const [language, setLanguage] = useState("");
  
    const Marritalstatus = [
     { id: 1, name: "Married" },
     { id: 2, name: "Separated" },
     { id: 3, name: "Divorced" },
     { id: 4, name: "De Facto" },
     { id: 5, name: "Other" },
   ];
   const Languages = [
     { id: 1, name: "English" },
     { id: 2, name: "French" },
     { id: 3, name: "Spanish" },
     { id: 4, name: "German" },
     { id: 5, name: "Chinese" },
     { id: 6, name: "Twi" },
     { id: 7, name: "Ga" },
     { id: 8, name: "Other" },
   ];
  
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
              <div className="page-title py-2 px-4">
                <h1>Add Family Records</h1>
              </div>
              <div className="navigation">
                <Link to="/create-family">Add New Family</Link>
                <span className="material-symbols-outlined">chevron_right</span>

                <Link to="/staff">Manage Family</Link>
              </div>
              <div className="content-area mt-8">
                <div className="form-area shadow-2xl rounded-2xl">
                  <div className="heading">General Information</div>
                  <form>
                    <div className="form-group">
                      <label for="family-name">Family Name</label>
                      <input type="text" id="family-name" required />
                    </div>
                    <div className="form-group">
                      <label for="family-name">Marital Status</label>
                      <select
                        value={selectStatusMarriage}
                        onChange={(e) => setSelectstatusMarriage}
                      >
                        <option value="" disabled>
                          Please select
                        </option>{" "}
                        {Marritalstatus.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="language">Home Language - Primary</label>
                      <select value={language} onChange={(e) => setLanguage}>
                        <option value="" disabled>
                          Please select{" "}
                        </option>
                        {Languages.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="address">
                        Address Name
                        <small>Formal name to address parent with</small>
                      </label>
                      <input type="text" id="language" />
                    </div>
                    <div className="form-group">
                      <label for="address">
                        Home Address <small></small>
                      </label>
                      <input type="text" id="address" />
                    </div>
                    <div className="form-group">
                      <label></label>
                      <button className="submit-info"> Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
};

export default create;
