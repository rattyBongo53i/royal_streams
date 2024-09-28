import React from 'react'
import "./styles/view.css";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from '../Sidebar';




const EditStudent = () => {

  const chooseGender = (gender) => {
    // if()
  }

  return (
    <div className="base-wrapper">
      <div className="left">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="heading py-2 px-4">
          <h1>Students</h1>
        </div>
        <div className="student-content ">
          <div className="navigation">
            <Link to="/#">All Students</Link>
            <Link to="/#">Add New Student</Link>
          </div>
          <div className="content-area mt-8 shadow-2xl">
            <div className="filter">
              <div className="choose-heading">
                <h2>Update Student Information</h2>{" "}
              </div>
            </div>
            <div className="fake-right">
              <div></div>
            </div>
            <div className="form-area shadow-2xl rounded-2xl mt-4"></div>
            <form>
              <div className="form-group">
                <label for="family-name">First Name</label>
                <input type="text" id="first-name" required />
              </div>
              <div className="form-group">
                <label for="surname">Surname</label>
                <input type="text" id="surname" required />
              </div>
              <div className="form-group">
                <label for="officialname">Official Name</label>
                <input type="text" id="officialName" />
              </div>
              <div className="form-group">
                <label for="gender">Gender</label>
                <input type="text" id="gender" />
              </div>
              <div className="form-group">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" />
              </div>
              <div className="form-group">
                <label for="gender">Class Name</label>
                <input type="text" id="classroom" />
              </div>
              <div className="form-group">
                <label for="gender">Address</label>
                <input type="text" id="address" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;