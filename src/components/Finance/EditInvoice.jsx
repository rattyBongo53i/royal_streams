import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import "./styles/edit-invoice.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const EditInvoice = () => {
  const [tax, setTax] = useState(""); // Store the
  // const [selectedOption, setSelectedOption] = useState("");

  const [selectStatusOption, setSelectStatusOption] = useState("Pending");
  const [scheduleOption, setScheduleOption] = useState("");
  const [monthSelection, setMonthSelection] = useState("");
  const [feeCategory, setFeeCategory] = useState([]);
  const [feeCategoryData, setFeeCategoryData] = useState([]);
  const [removingUser, setRemovingUser] = useState(null); // State for user being removed
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");



  // Event handler for handling select input change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    // console.log(`Selected Option: ${e.target.value}`);
  };
const handleSelectChangeSchedule = (e) => {
  setScheduleOption(e.target.value); // This will store the selected schedule name
};

const handleSelectStatusChange = (e) => {
  setSelectStatusOption(e.target.value); // This will store the selected status ID
};

const handleMonthChange = (e) => {
  setMonthSelection(e.target.value); // This will store the selected month ID
};

const handleFeeCategoryChange = (e) => {
  setFeeCategory(e.target.value); // This will store the selected fee category ID
};


    const deleteInvoice = async (e, id) => {
      e.preventDefault();
      // alert(id);
      try {
        setRemovingUser(id);
        // Wait for animation to finish (0.5s, matching CSS animation duration)
        //send id to server
        let response = await axios.delete(`${import.meta.env.VITE_App_API_URL}/delete-invoice/${id}`);
           setInvoices((prevInvoices) =>
             prevInvoices.filter((invoice) => invoice.id !== id)
           );

        setTimeout(async () => {
          // Remove user from state array
          setRemovingUser(null); // Reset removing state
        }, 500);
      } catch (error) {}
    };
    const schedule = [
      { id: 1, name: "TERM 1" },
      { id: 2, name: "TERM 2" },
      { id: 3, name: "TERM 3" },
      { id: 4, name: "SUMMER SCHOOL" },
  ];
  
    const status = [
      { id: 1, name: "Pending" },
      { id: 2, name: "Issued" },
      { id: 3, name: "Issued - Overdue" },
      { id: 4, name: "Paid" },
      { id: 5, name: "Paid - Partial" },
      { id: 6, name: "Paid - Late" },
      { id: 7, name: "Canceled" },
      { id: 8, name: "Refunded" },
    ];
    // month
    const month = [
      { id: 1, name: "January" },
      { id: 2, name: "February" },
      { id: 3, name: "March" },
      { id: 4, name: "April" },
      { id: 5, name: "May" },
      { id: 6, name: "June" },
      { id: 7, name: "July" },
      { id: 8, name: "August" },
      { id: 9, name: "September" },
      { id: 10, name: "October" },
      { id: 11, name: "November" },
      { id: 12, name: "December" },
    ];

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_App_API_URL}/get-fee-categories`
        );
        const data = await response.json();
        setFeeCategoryData(data);
      };
      fetchData();
    }, []);
  //get invoices 
    useEffect(() => {
          const fetchInvoice = async () => {
            const response = await fetch(
              `${import.meta.env.VITE_App_API_URL}/get-invoices`
            );
            const data = await response.json();
            setInvoices(data);
          };
          fetchInvoice();
    }, []);
  
  
  const InvoiceSearchQuery = async (e) => {
    e.preventDefault();
    //set loading state to true
    setLoading(true);
    // simulate server response delay
    setTimeout(() => {
      setLoading(false); // Set loading state to false after delay
    }, 2000); // Adjust the delay to match your server response time
    // alert("Server response");
    //

    try {
      let query = {
        schedule: scheduleOption,
        month: monthSelection,
        feeCategory: feeCategory,
        status: selectStatusOption,
        student_id: selectedOption,
      };
    } catch (e) {
    }
      }
  
    const PageHeader = styled.div`
      padding: 0.4rem;
      //media queries
      @media screen and (max-width: 1200px) {
      }
      @media screen and (max-width: 768px) {
      }
    `;
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
            <PageHeader>
              <h1>Manage Invoice</h1>
            </PageHeader>
            <div className="top-nav">
              <nav className="navbar">
                <div className="left">
                  <ul className="nav-menu">
                    <li className="nav-item">
                      <Link to="/finance">home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/invoice">create nvoice</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/edit-invoice">Manage invoices</Link>
                    </li>
                  </ul>
                </div>

                <div className="right"></div>
              </nav>
            </div>

            <div className="invoice-area">
              <div className="filter">
                <div className="choose-heading">
                  <h2>FILTERS</h2>{" "}
                </div>
                <div className="filter-container">
                  <form action="#">
                    {/* Schedule Selection */}
                    <div className="form-group">
                      <label>Schedule</label>
                      <select
                        value={scheduleOption || ""}
                        onChange={handleSelectChangeSchedule}
                      >
                        <option value="" disabled>
                          Select schedule
                        </option>
                        {schedule.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Selection */}
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={selectStatusOption || ""}
                        onChange={handleSelectStatusChange}
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        {status.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Month Selection */}
                    <div className="form-group">
                      <label>Month</label>
                      <select
                        value={monthSelection || ""}
                        onChange={handleMonthChange}
                      >
                        <option value="" disabled>
                          Select month
                        </option>
                        {month.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fee Category Selection */}
                    <div className="form-group">
                      <label>Fee Category</label>
                      <select
                        value={feeCategory || ""}
                        onChange={handleFeeCategoryChange}
                      >
                        <option value="" disabled>
                          Select fee category
                        </option>
                        {feeCategoryData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="go-submit">
                      <div></div>
                      <button type="submit" onClick={InvoiceSearchQuery}>
                        GO
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="all-invoices-table">
                <div className="view-heading px-8 py-2 font-bold">
                  <h2>View</h2>
                </div>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Invoice ID</th> */}
                      <th>Invoicee </th>
                      <th>Status</th>
                      <th>Issue Date</th>
                      <th>Fee Amount</th>
                      <th>Amount Paid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <TransitionGroup component="tbody">
                    {invoices.map((invoice) => (
                      <CSSTransition
                        key={invoice.id}
                        timeout={500}
                        classNames="fade"
                      >
                        <tr
                          key={invoice.id}
                          className={` isTofade ${
                            removingUser == invoice.id ? "fade-out" : ""
                          }`}
                        >
                          {/* <td>{invoice_id}</td> */}
                          <td>{invoice.student_name}</td>
                          <td>{invoice.status}</td>
                          <td>{invoice.issue_date}</td>
                          <td>{invoice.total_amount}</td>
                          <td>{invoice.amount_paid}</td>
                          <td className="action">
                            <button className="edit">
                              <CiEdit />
                            </button>
                            <button className="delete">
                              <RiDeleteBinLine
                                onClick={(e) => deleteInvoice(e, invoice.id)}
                              />
                            </button>
                          </td>
                        </tr>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EditInvoice;
