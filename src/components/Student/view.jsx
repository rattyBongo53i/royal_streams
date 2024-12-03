import React, { useEffect, useState } from "react";
import "./styles/view.css";
import { CiEdit } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Surname");
  const [studentsData, setStudentsData] = useState([""]); //
  const [search, setSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const listPerPage = 15;
  const [loading, setLoading] = useState(true);
  //edit user
  const editUser = (id) => {
    console.log(`Editing user with ID: ${id}`);
    //redirect to edit page
    navigate(`/edit-student/${id}`);
    // alert(id)
  };

  const filterBy = [
    { id: 1, name: "Surname" },
    // { id: 2, name: "Given Name" },
    { id: 2, name: "Classroom" },
    { id: 3, name: "Year Group" },
  ];

    const classes = [
      { id: 0, name: "", age: "", level: "" },
      { id: 1, name: "Jasmine", age: "0 - 1", level: "Babyland" },
      { id: 2, name: "Olive", age: "1 - 2", level: "Creche" },
      { id: 3, name: "Sunlight", age: "2 - 3", level: "Nursery1" },
      { id: 4, name: "Daisy/Tulip", age: "3 - 4", level: "Nursery2" },
      { id: 5, name: "Hibiscus", age: "4 - 5", level: "KG1" },
      { id: 6, name: "Reception", age: "5 - 6", level: "KG2" },
      { id: 7, name: "Year1", age: "6 - 7", level: "Grade 1" },
      { id: 8, name: "Year2", age: "7 - 8", level: "Grade 2" },
      { id: 9, name: "Year3", age: "8 - 9", level: "Grade 3" },
      { id: 10, name: "Year4", age: "9 - 10", level: "Grade 4" },
      { id: 11, name: "Year5", age: "10 - 11", level: "Grade 5" },
      { id: 12, name: "Year6", age: "11 - 12", level: "Grade 6" },
    ];

      const getClassNameById = ( id) => {
        const classroom = classes.find((cls) => cls.id === id);
        // )
        console.log(classroom);
        console.log("classroom");
        return classroom ? classroom.name : "Unknown Class";
       
      };
  

  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_App_API_URL}/students/filter`;
      (async () => {
        let response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            sort_by: filter,
          }),
        });
        let data = await response.json();
        setStudentsData(data);
        // console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
  }, [filter]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value.length > 2) {
      // Start search after 3 characters
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_App_API_URL}/students/search?query=${
            e.target.value
          }`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    } else {
      setStudents([]); // Clear list if search query is short
    }
  };

  // Function to fetch the selected student's details
  const fetchStudentDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_App_API_URL}/student/${id}`
      );
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    fetchStudentDetails(student.id);
    setStudents([]); // Clear the dropdown after selection
  };

  //pagination
  const indexOfLastStudent = currentPage * listPerPage;
  const indexOfFirstStudent = indexOfLastStudent - listPerPage;
  const currenStudenttList = studentsData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Calculate total pages
  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(studentsData.length / listPerPage))
    );
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <div className="student-content ">
        <div className="navigation">
          <Link to="/create-student">Add New Student</Link>
        </div>
        <div className="content-area mt-8">
          <div className="filter">
            <div className="choose-heading">
              <h2>FILTERS</h2>{" "}
            </div>
            <div className="filter-container">
              <form action="#">
                <div className="form-group">
                  <label htmlFor="search">Search</label>
                  <input
                    type="text"
                    id="search"
                    value={query}
                    placeholder="Search"
                    onChange={handleSearch}
                  />
                </div>
                <div className="form-group">
                  <label></label>
                  {/* Display search results in a dropdown */}
                  {students.length > 0 && (
                    <ul className="dropdown">
                      {students.map((student) => (
                        <li
                          key={student.id}
                          onClick={() => handleSelectStudent(student)}
                        >
                          {/* Concatenate firstname and surname */}
                          {student.firstName} {student.surname}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="form-group">
                  <label>Sort By</label>
                  <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="" disabled>
                      Surname
                    </option>
                    {filterBy.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="fake-right">
            <div></div>
            <div>
              <button
                className="pagination-button"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <span className="material-symbols-outlined">chevron_left</span>{" "}
              </button>
              <button
                className="pagination-button"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(studentsData.length / listPerPage)
                }
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="form-area shadow-2xl rounded-2xl mt-4">
            <div
              className={`single-student ${
                studentDetails ? "load" : "display-none"
              }`}
            >
              <table className="table ">
                <thead>
                  <th>Student Name</th>
                  <th>Gender</th>
                  <th>Classroom</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {studentDetails && (
                    <tr key={studentDetails.id}>
                      <td>{studentDetails.officialName}</td>
                      <td>{studentDetails.gender}</td>
                      <td> {getClassNameById(studentDetails.classroom_id)}</td>
                      <td className="action">
                        <button className="edit">
                          <CiEdit
                            onClick={(e) => editUser(studentDetails.id)}
                          />
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className={`second-table ${
                studentDetails ? "display-none" : "load"
              } `}
            >
              <table className={`table table-striped`}>
                <thead>
                  <th>Student Name</th>
                  <th> Gender</th>
                  <th>Classroom</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {currenStudenttList.map((student) => (
                    <tr key={student.id}>
                      <td>{student.officialName}</td>
                      <td>{student.gender}</td>
                      <td> {getClassNameById(student.classroom_id)}</td>
                      <td className="action">
                        <button className="edit">
                          <CiEdit onClick={(e) => editUser(student.id)} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
