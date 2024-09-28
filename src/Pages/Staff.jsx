import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import "../base.css";
import "../Styles/dashboard.css";
import "../Styles/finance.css";
import "../Styles/staff.css";

const Staff = () => {
  const [invoices, setInvoices] = useState([]);
  const [removingUser, setRemovingUser] = useState(null); // State for user being removed
  const navigate = useNavigate();

  //edit user
  const editUser = (id) => {
    console.log(`Editing user with ID: ${id}`);
    //redirect to edit page
    navigate(`/edit-family/${id}`);
  };
  const deleteInvoice = async (e, id) => {
    e.preventDefault();
    // alert(id);
    try {
      setRemovingUser(id);
      // Wait for animation to finish (0.5s, matching CSS animation duration)
      //send id to server
      let response = await axios.delete(
        `${import.meta.env.VITE_App_API_URL}/delete-family/${id}`
      );
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice.id !== id)
      );

      setTimeout(async () => {
        // Remove user from state array
        setRemovingUser(null); // Reset removing state
      }, 500);
    } catch (error) {}
  };
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
              <h1>Manage Families</h1>
            </div>
            <div className="py-2 px-4 search shadow-lg rounded-2xl">
              <div className="left">
                <span>Search For</span>
                <span> family name</span>
              </div>
              <div className="right">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Family Name"
                />
                <div className="btn-container">
                  <button type="button" class=" btn-submit">
                    Go
                  </button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <h2 className="text-left py-2">List of Families</h2>
              <div className="pagination ">
                <div className="pagination-box">
                  <div className="add-new">
                    <Link to="/create-family">
                      <span class="material-symbols-outlined">add</span>
                      add
                    </Link>
                  </div>
                  <div>
                    <button className="pagination-button">
                      {" "}
                      <span class="material-symbols-outlined">
                        chevron_left
                      </span>{" "}
                    </button>
                    <button className="pagination-button">
                      {" "}
                      <span class="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Family Name</th>
                    <th>Marital Status</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe Family</td>
                    <td>Married</td>
                    <td className="parents">
                      <span>Mrs. BERNICE ABAKAH</span>{" "}
                      <span> Mr. THOMAS ABAKAH</span>
                    </td>
                    <td>MIKAEL ABAKAH</td>
                    <td className="action">
                      <button className="edit">
                        <CiEdit onClick={(e) => editUser(2)} />
                      </button>
                      <button className="delete">
                        <RiDeleteBinLine
                          onClick={(e) => deleteInvoice(e, id)}
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Staff;
