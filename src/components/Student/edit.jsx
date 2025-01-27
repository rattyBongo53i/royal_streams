import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/view.css";

const EditStudent = () => {
  const [language, setLanguage] = useState("English");
  const [student, setStudent] = useState([]);
  // const [studentData, setStudentsData] = useState([]);
  const [surname, setSurname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [selectClassOption, setSelectClassOption] = useState(null);
  const [address, setAddress] = useState(null);
  const [classId, setclassId] = useState(null);
  const [classData, setClassData] = useState(null);
  const [classroomInfo, setClassromInfo] = useState("")

  const { id } = useParams();
  const navigate = useNavigate();

  // set page title
  useEffect(() => {
    document.title = "RSI | Edit Student";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_App_API_URL}/get-student/${id}`)
      .then((response) => {
        if (response.status == 200 || response.status == 201) {
          setStudent(response.data);

          if (response.data.classroom_id > 0) {
            setClassromInfo((`${response.data.class.name} - ${response.data.class.description}`))
          }
        }
      });
  }, [id]);

  

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
  const selectGender = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
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

  const getClassNameById = (id) => {
    const classroom = classes.find((cls) => cls.id === id);
    return classroom ? classroom.name : "Unknown Class";
    setclassId("")

  };

  const classNameChanged = async (name) => {
    setSelectClassOption(name);
    const classroom = classes.find((cls) => cls.id === name);
    const fullname = classroom ? classroom.name : "Unknown Class";
    setclassId(fullname);
  }

  // useEffect(() => {
  //   const classroom = classes.find((c) => c.id === selectClassOption)
  //   setClassData(classroom.name)
    
  // }, [classes , classId])
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside submit func");
    let cr = selectClassOption ? selectClassOption : "";
    let su = surname ? surname : student.surname;
    let fr = firstname ? firstname : student.firstName;
    let Sex = gender ? gender : student.gender;
    let lang = language ? language : student.languageFirst;
    let addrr = address ? address : student.address1;
    let birthdate = dob ? dob : student.dob;

    // let Sex = fixSex(gd)
    const studentData = [
      {
        surname: su,
        firstName: fr,
        // officialName: fr + " " + surname,
        dob: birthdate,
        gender: Sex,
        classroom_id: parseInt(cr),
        address1: addrr,
        languageFirst: lang,
      },
    ];

    console.log(studentData);

    try {
      const url = `${import.meta.env.VITE_App_API_URL}/update/${student.id}`;
      const response = await axios.post(url, {
        id: student.id,
        surname: su,
        firstName: fr,
        // officialName: fr + " " + surname,
        dob: birthdate,
        gender: Sex,
        classroom_id: parseInt(cr),
        address1: addrr,
        languageFirst: lang,
      });

      if (response.status == 201 || response.status == 200) {
        toast.success("Student data updated successfully");
        setTimeout(() => {
          navigate("/students");

          // window.location.href = "/students";
        }, 3000);
      } else {
        toast.error("something went wrong");
      }
    } catch {
      toast.error("Error updating student data");
    }
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
              <h1>Students</h1>
            </div>
            <div className="student-content ">
              <div className="navigation">
                <Link to="/students">All Students</Link>
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
                <div className="form-area shadow-2xl rounded-2xl mt-4">
                  <form>
                    <div className="form-group">
                      <label for="family-name">First Name</label>
                      <input
                        type="text"
                        id="first-name"
                        value={firstname ?? student.firstName ?? ""}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="surname">Surname</label>
                      <input
                        type="text"
                        id="surname"
                        required
                        value={surname ?? student.surname ?? ""}
                        onChange={(e) => setSurname(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        onChange={(e) => setGender(e.target.value)} // Update the state with "M" or "F"
                        value={gender ?? student.gender} // Use the raw gender value "M" or "F"
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="M">Male</option>{" "}
                        {/* Store "M" but show "Male" */}
                        <option value="F">Female</option>{" "}
                        {/* Store "F" but show "Female" */}
                        <option value="O">Other</option>{" "}
                        {/* Store "O" for Other */}
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        value={
                          student.dob
                            ? new Date(student.dob).toISOString().slice(0, 10)
                            : ""
                        }
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="classroom">Class Name</label>
                      <input
                        type="text"
                        id="address"
                        // value={getClassNameById(classId) ?? selectClassOption}
                        value={ classroomInfo }
                      />
                    </div>
                    <div className="form-group">
                      <label for="classroom">Change classname</label>
                      <select
                        onChange={(e) => classNameChanged(e.target.value)}
                      >
                        <option value="" disabled>
                          select class
                        </option>
                        {classes.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} - {item.level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        value={student.address1 ?? address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label for="language">First language</label>
                      <select
                        value={language.languageFirst ?? language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="" disabled>
                          Please select{" "}
                        </option>
                        {Languages.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="entry"></label>
                      <button className="submit-info" onClick={handleSubmit}>
                        {" "}
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="current-date flex flex-col justify-around text-md  p-2">
            <span>Royal Streams International</span>
          </div>
        </div>
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

export default EditStudent;
