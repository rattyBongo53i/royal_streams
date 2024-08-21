import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import "../Styles/dashboard.css";
import logo from "../assets/logo-bg.png";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 5;
    

  // set page title
  useEffect(() => {
    document.title = "RSI | Dashboard";
  }, []);
    
  const studentsData = [
    {
      name: "Alice",
      age: 7,
      class: "Year2",
      address: "123 Elm St",
      parentContact: "555-1234",
      parentEmail: "parent1@example.com",
      dob: "2016-03-15",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },
    {
      name: "Bob",
      age: 8,
      class: "Year3",
      address: "456 Maple St",
      parentContact: "555-5678",
      parentEmail: "parent2@example.com",
      dob: "2015-06-23",
    },

    // Add more student objects here...
  ];

  // Calculate total pages
  const totalPages = Math.ceil(studentsData.length / studentsPerPage);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentsData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const classes = [
    { name: "Jasmine", age: "0 - 1", level: "Babyland" },
    { name: "Olive", age: "1 - 2", level: "Creche" },
    { name: "Sunlight", age: "2 - 3", level: "Nursery1" },
    { name: "Daisy/Tulip", age: "3 - 4", level: "Nursery2" },
    { name: "Hibiscus", age: "4 - 5", level: "KG1" },
    { name: "Reception", age: "5 - 6", level: "KG2" },
    { name: "Year1", age: "6 - 7", level: "Grade 1" },
    { name: "Year2", age: "7 - 8", level: "Grade 2" },
    { name: "Year3", age: "8 - 9", level: "Grade 3" },
    { name: "Year4", age: "9 - 10", level: "Grade 4" },
    { name: "Year5", age: "10 - 11", level: "Grade 5" },
    { name: "Year6", age: "11 - 12", level: "Grade 6" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
 

  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 14rem auto 22rem;
    gap: 1rem;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    background-color: var(--background-color);
    margin: 0 auto;

    //media queries
    @media screen and (max-width: 1200px) {
      grid-template-columns: 7rem auto 23rem;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      width: 100%;
    }
  `;

  return (
    <>
      <div className="wrapper">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="close" id="close-btn">
              <span class="material-symbols-outlined">close</span>
            </div>
            <div className="open" id="open-btn">
              <span class="material-symbols-outlined">lists</span>
            </div>
          </div>
          {/* sidebar starts here */}
          <div className="sidebar">
            <Link to="#" className="active link">
              <span className="material-symbols-sharp">apps </span>
              <h3>Dashboard</h3>
            </Link>
            <Link to="#" className="link">
              <span className="material-symbols-sharp">pending</span>
              <h3>Students</h3>
            </Link>
            <Link to="#">
              <span className="material-symbols-sharp">logout </span>
              <h3>logout</h3>
            </Link>
          </div>
          {/* aside ends here */}
        </aside>
        <main>
          <div className="date">
            <input type="date" />
          </div>
          <div className="insights">
            <div className="sales">
              <span class="material-symbols-outlined">directions_walk</span>
              <div className="middle">
                <div className="left">
                  <h3>Total No. Students</h3>
                  <h1>250</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>81%</p>
                  </div>
                </div>
              </div>

              <small className="text-muted">Last 24 Hours</small>
            </div>
            {/* <!-- ------------------End of Sales --------------- --> */}

            <div className="expenses">
              <span class="material-symbols-outlined">account_balance</span>
              <div className="middle">
                <div className="left">
                  <h3>Revenue</h3>
                  <h1>18,023</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>62%</p>
                  </div>
                </div>
              </div>

              <small className="text-muted">Last 24 Hours</small>
            </div>

            {/* <!-- -------------------End of Expenses------------- --> */}

            <div className="income">
              <span className="material-symbols-outlined">
                stacked_line_chart{" "}
              </span>
              <div className="middle">
                <div className="left">
                  <h3>Active Classes</h3>
                  <h1>5</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>44%</p>
                  </div>
                </div>
              </div>

              <small className="text-muted">Last 24 Hours</small>
            </div>
          </div>
          <div className="student-table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Age</th>
                  <th>Class</th>
                  <th>Address</th>
                  <th>Parent Contact</th>
                  <th>Parent Email</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.class}</td>
                    <td>{student.address}</td>
                    <td>{student.parentContact}</td>
                    <td>{student.parentEmail}</td>
                    <td>{student.dob}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* time table */}
          <div className="timetable-container">
            <div className="timetable">
              <div className="header">Time/Day</div>
              {days.map((day) => (
                <div key={day} className="header">
                  {day}
                </div>
              ))}
              {classes.map((classItem, index) => (
                <React.Fragment key={index}>
                  <div className="class-info">
                    <strong>{classItem.name}</strong> <br />
                    {classItem.age} <br />
                    {classItem.level}
                  </div>
                  {days.map((day) => (
                    <div key={day} className="class-slot">
                      Class {index + 1} <br /> {day}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>
        <div className="right-side">
          <div className="top">
            <button id="menu-btn">
              <span class="material-symbols-outlined active">menu</span>
            </button>
            <div className="theme-toggler">
              <span class="material-symbols-outlined active">light_mode</span>
              <span class="material-symbols-outlined">dark_mode</span>
            </div>
            <div className="profile">
              <div className="info">
                <p>
                  {" "}
                  Hey, <b>Isaac</b>{" "}
                </p>
                <small className="text-muted">Admin</small>
              </div>
              <div className="profile-photo">
                <img src="./images/profile-1.jpg" alt="" srcset="" />
              </div>
            </div>
          </div>
          {/* <!-- ----- end of top---------- --> */}

          <div className="recent-updates">
            <div className="sales-analytics">
              <h2> Class Sessions</h2>
              <div className="item online">
                <div className="icon">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Hibiscus</h3>
                    <small className="text-muted"> last 24 hours</small>
                  </div>
                  <h5 className="success">+39%</h5>
                  <h3>4567</h3>
                </div>
              </div>

              <div className="item offline">
                <div className="icon">
                  <span className="material-symbols-outlined">local_mall</span>
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Dasiy/Tulip</h3>
                    <small className="text-muted"> last 24 hours</small>
                  </div>
                  <h5 className="danger">-17%</h5>
                  <h3>1100</h3>
                </div>
              </div>

              <div className="item customers">
                <div className="icon">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div className="right">
                  <div className="info">
                    <h3>Sunlight</h3>
                    <small className="text-muted"> last 24 hours</small>
                  </div>
                  <h5 className="success">+24%</h5>
                  <h3>839</h3>
                </div>
              </div>
              <div className="item add-product">
                <div>
                  <span className="material-icons-sharp">add </span>
                  <h3> add product</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
