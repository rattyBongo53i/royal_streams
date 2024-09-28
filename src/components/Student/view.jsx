import React, { useEffect, useState } from "react";
import "./styles/view.css";
import { CiEdit } from "react-icons/ci";
import { useNavigate, Link } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Surname");
  const [studentsData, setStudentsData] = useState([""]); //
  const [currentPage, setCurrentPage] = useState(1);
  const listPerPage = 15;

  //edit user
  const editUser = (id) => {
    console.log(`Editing user with ID: ${id}`);
    //redirect to edit page
    // navigate(`/edit-family/${id}`);
    alert(id)
  };

  const filterBy = [
    { id: 1, name: "Surname" },
    // { id: 2, name: "Given Name" },
    { id: 2, name: "Classroom" },
    { id: 3, name: "Year Group" },
  ];

  useEffect(() => {
    try {
      const url = `${import.meta.env.VITE_App_API_URL}/students/filter`;
      (async () => {
          let response = await fetch(url, {
              method: 'POST',
                 mode: "cors",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
              body: JSON.stringify({
                  sort_by: filter,
              })
        });
        let data = await response.json();
        setStudentsData(data);
        // console.log(data);
      })();
    } catch (error) {
      console.error("Error fetching expenditure:", error);
    }
  }, [filter]);

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
          <Link to="/#">Add New Student</Link>
        </div>
        <div className="content-area mt-8">
          <div className="filter">
            <div className="choose-heading">
              <h2>FILTERS</h2>{" "}
            </div>
            <div className="filter-container">
              <form action="#">
                {/* Schedule Selection */}
                <div className="form-group">
                  <label>Sort By</label>
                  <select
                    value={filter || ""}
                    onChange={(e) => setFilter(e.target.value)}
                  >
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
              <button className="pagination-button"
                onClick={prevPage}
                disabled={currentPage === 1}>
                <span class="material-symbols-outlined">chevron_left</span>{" "}
              </button>
              <button className="pagination-button"
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(studentsData.length / listPerPage)}>
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="form-area shadow-2xl rounded-2xl mt-4">
            <table className="table table-striped">
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
                    <td></td>
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
    </>
  );
};

export default View;
