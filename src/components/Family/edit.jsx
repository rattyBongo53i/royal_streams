import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import "./styles/edit.css";

const edit = () => {
  const [selectStatusMarriage, setSelectstatusMarriage] = useState("Married");
  const [language, setLanguage] = useState("");
  const [selectStudentOption, setSelectStudentOption] = useState([]); 
  const [selectedStudent, setSelectedStudent] = useState("");

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
    const dataAccess = [
        { id: 1, name: "Yes" },
        { id: 2, name: "No" },

    ]
    const contactPriority = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },

    ]

  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_App_API_URL}/students`;
      (async () => {
        let response = await fetch(url);
        let data = await response.json();
        setSelectStudentOption(data);
        // console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
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
            <div className="page-title py-2 px-4">
              <h1>Upate Family Records</h1>
            </div>
            <div className="navigation">
              <Link to="/create-family">Add New Family</Link>
              <span class="material-symbols-outlined">chevron_right</span>

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
                    <label for="status">Marital Status</label>
                    <select
                      value={selectStatusMarriage}
                      onChange={(e) => setSelectstatusMarriage(e.target.value)}
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
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
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
                    <label for="#"></label>
                    <button className="submit-info"> Submit</button>
                  </div>
                </form>
              </div>
              <div className="form-area shadow-2xl rounded-2xl">
                <div className="heading-dark  py-4 px-2 mt-4">
                  <h2>RELATIONSHIP</h2>
                  <small className="px-1">
                    Use the table below to show how each child is related to
                    each adult in the family.
                  </small>
                </div>
                <div className="heading">Add Child</div>
                <form action="#">
                  <div className="form-group">
                    <label for="family-name">Child's Name</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      {selectStudentOption.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="commit">Comment</label>
                    <textarea className="notes-area"></textarea>
                  </div>
                </form>
                <div className="heading">Add Adult</div>
                <form>
                  <div className="form-group">
                    <label for="family-name">Adult's Name</label>
                    <input type="text" id="family-name" required />
                  </div>
                  <div className="form-group">
                    <label for="commit">Comment</label>
                    <textarea className="notes-area"></textarea>
                  </div>
                  <div className="form-group">
                    <label for="status">Data Access</label>
                    <select>
                      <option value="" disabled>
                        select option
                      </option>
                      {dataAccess.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="status">Contact Priority</label>
                    <select>
                      <option value="" disabled>
                        select option
                      </option>
                      {contactPriority.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="#"></label>
                    <button className="submit-info"> Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full  flex text-right">
              {/* current date */}
              <div className="current-date flex flex-col justify-around text-md  p-2">
                <span>Royal Streams International</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default edit;
