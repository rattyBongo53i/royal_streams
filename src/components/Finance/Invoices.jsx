import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "../../base.css"; 
// import "../components/Finance/styles/invoice.css"; src\components\Finance\Invoices.jsx
// import "../components/Finance/styles/modal.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../src/assets/logo-bg.png";
import { motion } from "framer-motion";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Invoices = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectStatusOption, setSelectstatusOption] = useState("Pending");
  const [scheduleOption, setScheduleOption] = useState("");
  const [expense, setExpense] = useState([]);
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Store the selected date
  const [dueDate, setDueDate] = useState(""); // Store the
  // State to store selected
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedFeeId, setSelectedFeeId] = useState(""); // For select input value
  const [removingUser, setRemovingUser] = useState(null); // State for user being removed
  const [loading, setLoading] = useState(false);
  //state for invoice
  const [selectedInvoice, setSelectedInvoice] = useState([""]); // To store selected invoice details
  const [discount, setDiscount] = useState(0); // Discount as a percentage
  const [discountedTotal, setDiscountedTotal] = useState(0); // Final amount after discount
  const [studentsData, setStudentsData] = useState([""]); //
  const [student, setStudent] = useState("");
  const [show, setShow] = useState(false);
  const [emailShow, setEmailShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Final amount after
  const [emailArray, setemailArray] = useState(""); // Payment status

  const handleOpen = () => setShow(true);
  const Fopen = () => setShow(false);

  // set page title
  useEffect(() => {
    document.title = "RSI | Invoice";
    AOS.init(); //scroll animation
    AOS.refresh();
  }, []);
  // This function will calculate the discounted total whenever totalAmount or discount changes
  useEffect(() => {
    const discountAmount = (totalAmount * discount) / 100; // Calculate discount amount
    const newTotal = totalAmount - discountAmount; // Subtract discount from total amount
    setDiscountedTotal(newTotal);
  }, [totalAmount, discount]);

  useEffect(() => {
    const calculatedTotal = selectedFees.reduce(
      (acc, fee) => acc + parseFloat(fee.amount),
      0
    );
    setTotalAmount(calculatedTotal);
  }, [selectedFees]); // Recalculate totalAmount if fees change

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
  // Event handler for handling select input change
  const handleSelectChange = (e) => {
    // const selectedValue = e.target.value;

    setSelectedOption(e.target.value);
    // console.log(`Selected Option: ${e.target.value}`);
  };
  // Event handler for handling select input change
  const handleSelectChangeSchedule = (e) => {
    setScheduleOption(e.target.value);
    // // console.log(`Selected Option: ${e.target.value}`);
    // const selectedSchedule = schedule.find(
    // (item) => item.name === e.target.value
    // );
    // setScheduleOption(selectedSchedule); // Store the whole selected object
  };
  //handleSelectStatusChange
  const handleSelectStatusChange = (e) => {
    setSelectstatusOption(e.target.value);
    // console.log(`Selected Option: ${e.target.value}`);
  };
  // Handle date input change
  const handleDateChange = (e) => {
    const date = e.target.value; // Get the selected date from input
    setDueDate(date); // Update the state with the selected date
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_App_API_URL}/get-fees`;
      (async () => {
        let response = await fetch(url);
        let data = await response.json();
        setExpense(data);
        // console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
  }, []);
  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_App_API_URL}/students`;
      (async () => {
        let response = await fetch(url);
        let data = await response.json();
        setStudentsData(data);
        // console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const url = `${
        import.meta.env.VITE_App_API_URL
      }/get-student/${selectedOption}`;
      (async () => {
        let response = await fetch(url);
        let data = await response.json();
        setStudent(data);
        console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
  }, [selectedOption]);

  const handleFeeSelection = (e) => {
    const feeId = parseInt(e.target.value);
    // return;
    const selectedFee = expense.find((fee) => fee.id === feeId);
    // setSelectedFees(selectedFees.filter((fee) => fee.id!== selectedFeeId));
    // Check if fee is already added
    if (!selectedFees.some((fee) => fee.id === feeId)) {
      setSelectedFees([...selectedFees, selectedFee]); // Append new fee
    }

    setSelectedFeeId(""); // Reset select input to default state
  };

  // Function to calculate total amount
  const calculateTotalAmount = () => {
    const total = selectedFees.reduce(
      (acc, fee) => acc + parseFloat(fee.amount) || 0,
      0
    ); // Convert fee.amount to number
    return total.toFixed(2); // Ensures the result is formatted as a decimal (two decimal places)
  };
  // Handling discount input change
  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      setDiscount(discountValue);

      // Calculate the discounted total whenever the discount is inputted
      const discountAmount = (totalAmount * discountValue) / 100;
      const newTotal = totalAmount - discountAmount;
      setDiscountedTotal(newTotal);
    } else {
      setDiscount(0);
      setDiscountedTotal(totalAmount); // No discount applied
    }
  };

  //delete selected fee
  const deleteFee = (e, id) => {
    e.preventDefault(); // Prevents page reload
    // const feeId = e.target.getAttribute("data-id");
    try {
      // Trigger the fade-out animation before deleting the user
      setRemovingUser(id);

      // Wait for animation to finish (0.5s, matching CSS animation duration)
      setTimeout(async () => {
        // Remove the user from the list in the state after animation
        setSelectedFees(selectedFees.filter((fee) => fee.id !== id));

        // Clear the selected user after deletion
        // setSelectedFeeId("");
        setRemovingUser(null); // Reset removing state
      }, 500); // Delay matches CSS animation duration
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const isShowEmail = () => {
    setEmailShow(true);
  };
  const saveInvoice = () => {
    setLoading(true);
    // simulate server response delay
    setTimeout(() => {
      setLoading(false); // Set loading state to false after delay
    }, 2000);
  };
  const viewInModal = () => {
    setShow(true);
    const invoice = {
      student_id: selectedOption,
      student_name: student.officialName,
      status: selectStatusOption,
      schedule: scheduleOption,
      note: notes,
      fees: selectedFees,
      issue_date: selectedDate,
      due_date: dueDate,
      totalFeeAmount: calculateTotalAmount(),
      discount: discount,
      discountedTotal: discountedTotal,
    };

    setSelectedInvoice(invoice);
  };

  const savedInvoice = async (e) => {
    e.preventDefault();
    // if(selected)
    // setShow(true);
    //set loading state to true
    setLoading(true);
    // simulate server response delay
    setTimeout(() => {
      setLoading(false); // Set loading state to false after delay
    }, 2000); // Adjust the delay to match your server response time
    try {
      //if schedule is null return
      if (scheduleOption === null) {
        toast.error("Please select a schedule");
        return false;
      }
      if (selectedFees.length === 0) {
        toast.error("Please add at least one fee");
        return false;
      }

      //sudent not selected
      if (selectedOption === null || selectedOption === "") {
        toast.error("Please select a student");
        return false;
      }

      //  const invoice = {
      //    student_id: selectedOption,
      //    student_name: student.officialName,
      //    status: selectStatusOption,
      //    schedule: scheduleOption,
      //    note: notes,
      //    fees: selectedFees,
      //    issue_date: selectedDate,
      //    due_date: dueDate,
      //    totalFeeAmount: calculateTotalAmount(),
      //    discount: discount,
      //    discountedTotal: discountedTotal,
      //  };

      // console.log(invoice);
      // return true;

      const url = `${import.meta.env.VITE_App_API_URL}/store-invoice`;
      let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          student_id: selectedOption,
          status: selectStatusOption,
          schedule: scheduleOption,
          note: notes,
          fees: selectedFees,
          issue_date: selectedDate,
          due_date: dueDate,
          initialtotalFeeAmount: calculateTotalAmount(),
          isSent: false,
          discount: discount,
          totalFeeAmount: discountedTotal,
          student_name: student.officialName,
        }),
      });
      let result = await response.json();
      console.log(result);

      //check if response code is not 201
      console.log(response.status);

      if (response.status == 200 || response.status == 201) {
        toast.success("Invoice has been saved");
        //clear selected fees
        setSelectedFees([]);
        //clear selected date
        setSelectedDate(new Date().toISOString().split("T")[0]);
        //clear selected due date
        setDueDate(new Date().toISOString().split("T")[0]);
        //clear selected student
        setSelectedOption("");
        //clear selected status
        // setSelectstatusOption("");
        //clear selected schedule
        setScheduleOption(null);
        //clear notes
        setNotes("");
        //clear removing user
        setRemovingUser(null);
      }
      if (response.status == 422) {
        toast.error("Due date must be after current date");
        return false;
      }
      if (response.status == 400) {
        //none
        return;
      }
      //student Id
      if (response.status == 481) {
        toast.error("Please select a student");
        return false;
      }
      if (response.status == 401) {
        toast.error("Please select a schedule");
        return false;
      }
      if (response.status == 409) {
        // console.log("invoice is already saved");
        toast.error(" invoice is already saved");
        return false;
      }
      if (
        response.status != 200 ||
        response.status != 201 ||
        response.status != 409
      ) {
        console.error("Server responded with an error:", result);
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const showEmailRecipient = emailShow ? "fade-in" : "display-none";

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
      {" "}
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
              <h1>Update Invoice</h1>
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
              <div
                className={`spinner-container ${
                  loading === true ? "load" : ""
                }`}
              >
                <div className="spinner"></div>
              </div>
              <div className="heading-basic">
                <h2>Basic Information</h2>
              </div>
              <form action="#">
                <div className="form-group academic-year">
                  <label>Academic Year</label>
                  <span> 2024/2025</span>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectStatusOption}
                    onChange={handleSelectStatusChange}
                  >
                    <option value="" disabled>
                      Select status
                    </option>{" "}
                    {/* Default empty option */}
                    {status.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Invoicee</label>
                  <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="" disabled>
                      Select invoicee
                    </option>{" "}
                    {/* Default empty option */}
                    {studentsData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.officialName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="form-group">
                  <label>Schedule</label>
                  <select
                    value={scheduleOption || ""}
                    onChange={handleSelectChangeSchedule}
                  >
                    <option value="" disabled>
                      Select schedule
                    </option>{" "}
                    {/* Default empty option */}
                    {schedule.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* form group text area */}
                <div className="form-group text-area">
                  <label> Note</label>
                  <textarea
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                    placeholder="Please provide any additional instructions here."
                  ></textarea>
                </div>
                <div className="fee-area">
                  <div className="heading-basic">
                    <h2>Fees</h2>
                  </div>
                  <div className="append-area">
                    {selectedFees.map((fee) => (
                      <div
                        key={fee.id}
                        className={`appended ${
                          removingUser === fee.id ? "fade-out" : ""
                        }`}
                      >
                        <div className="append">
                          <span className="name">{fee.name} </span>
                          <span className="category">{fee.category}</span>
                        </div>
                        <div className="action">
                          <div className="amout">{fee.amount}</div>
                          <button onClick={(e) => deleteFee(e, fee.id)}>
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="total-fees">
                      <div> Total</div>
                      <div className="total">
                        <span className="currency"> GH₵</span>{" "}
                        {calculateTotalAmount()}
                      </div>
                    </div>
                  </div>
                  <div className="form-group select-fees">
                    <label>Select Fee</label>
                    <select
                      value={selectedFeeId}
                      onChange={handleFeeSelection}
                      // multiple
                    >
                      <option value="" disabled>
                        Select fee
                      </option>{" "}
                      {/* Default empty option */}
                      {expense.map((fee) => (
                        <option key={fee.id} value={fee.id}>
                          {fee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group add-discount">
                    <label>Add Discount (%)</label>
                    <input
                      type="number"
                      value={discount}
                      min="0"
                      max="100"
                      step="0.01"
                      onChange={handleDiscountChange}
                      placeholder="Enter discount percentage"
                    />
                  </div>
                  <div className="total-fees">
                    <label>Discounted Total </label>
                    <div className="total">
                      <span className="currency"> GH₵</span>{" "}
                      {discountedTotal.toFixed(2)}
                    </div>
                  </div>
                  <div className={`email-recipient ${showEmailRecipient}`}>
                    <div className="heading-basic">
                      <h2>Email Receipt</h2>
                    </div>
                    <div className="email-area">
                      <div className="recipients">
                        <div className="name">Isaac Yeboah</div>
                        <div className="email">
                          <span>isaac2.yeboah@gmail.com</span>
                        </div>
                        <label class="checkbox-container">
                          <input type="checkbox" />
                          <span class="custom-checkbox"></span>
                        </label>
                      </div>
                      <div className="recipients">
                        <div className="name">James Eyison</div>
                        <div className="email">
                          <span>eyison@gmail.com</span>
                        </div>
                        <label class="checkbox-container">
                          <input type="checkbox" />
                          <span class="custom-checkbox"></span>
                        </label>
                      </div>
                      <div className="recipients">
                        <div className="name">Admin User</div>
                        <div className="email">
                          <span>adminuser@mail.com</span>
                        </div>
                        <label class="checkbox-container">
                          <input type="checkbox" />
                          <span class="custom-checkbox"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-email">
                  <label>Add Email Recipient</label>
                  <div className="theme-toggler" onClick={isShowEmail}>
                    <span
                      className={`material-symbols-outlined active ${
                        emailShow ? "isChecked" : ""
                      }`}
                    >
                      radio_button_unchecked
                    </span>
                    <span className="material-symbols-outlined"></span>
                  </div>
                </div>

                <div className="submit-invoice">
                  <span onClick={viewInModal}>view </span>
                  <button type="submit" onClick={savedInvoice}>
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ViewInvoiceModal
          show={show}
          Fopen={Fopen}
          selectedInvoice={selectedInvoice}
        />
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
      </motion.div>
    </>
  );
};

export default Invoices;

export const ViewInvoiceModal = ({ show, Fopen, selectedInvoice }) => {
  const showHideClassName = show ? "modal fade-in" : "modal display-none";

  return (
    <>
      <div className={showHideClassName}>
        <div className="modal-main-invoice">
          <div className="app-logo">
            <img src={logo} alt="Logo" />
          </div>
          {/* //close icon */}
          <button className="close-btn" onClick={Fopen}>
            <i className="fas fa-times"></i>
          </button>
          <h2>Royal Streams International School</h2>

          <div className="invoice-ready">
            <div className="to-family">
              <div className="receipt-heading">
                <h3>Reciept For :</h3>
              </div>
              <span> Mrs. WHITNEY KUMI-AMEYAW</span>
            </div>
            <div className="first-three">
              <div className="name">
                <span>Student Name:</span>
                <span>{selectedInvoice.student_name}</span>
              </div>
              <div className="schedule">
                <span>Schedule </span>
                <span>{selectedInvoice.schedule}</span>
              </div>
              <div className="status">
                <span>Status</span>
                <span>{selectedInvoice.status}</span>
              </div>
            </div>
            <div className="second-three">
              <div className="date">
                <span>Issue Date </span>
                <span>{selectedInvoice.issue_date}</span>
              </div>
              <div className="date">
                <span>Date Due</span>
                <span>{selectedInvoice.due_date}</span>
              </div>
              <div className="number">
                <span>Invoice Number </span>
                <span># </span>
              </div>
            </div>
            <div className="note">
              <span>Note</span>
              <span className="notes"> {selectedInvoice.note}</span>
            </div>
            <div className="fee-table">
              <div className="heading">
                <h3>Fee Table</h3>
              </div>
              <table>
                <th> Name</th>
                <th> Category</th>
                <th> Amount</th>
                <tbody>
                  {selectedInvoice &&
                  selectedInvoice.fees &&
                  selectedInvoice.fees.length > 0 ? (
                    selectedInvoice.fees.map((fee) => (
                      <tr key={fee.id}>
                        <td>{fee.name}</td>
                        <td>{fee.category}</td>
                        <td>GH₵ {fee.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No fees available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="total">
                <div className="left"> Initial Total</div>
                <div className="far-right">
                  <span className="currency">GH₵</span>
                  <span> {selectedInvoice.totalFeeAmount} </span>
                </div>
              </div>
              <div className="discount-area">
                <div className="discount">
                  <div className="right">Discount</div>
                  <div className="get-to-the-end">
                    <span> {selectedInvoice.discount} % </span>
                  </div>
                </div>
                <div className="discounted-total">
                  <div className="right"> Discounted Total</div>
                  <div className="get-to-the-end">
                    <span className="currency">GH₵</span>
                    <span> {selectedInvoice.discountedTotal} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="submit-invoice-btns p-2">
            <div className="container">
              <button className="submit-btn">Issue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
