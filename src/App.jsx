
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Dashboard from "./Pages/Dashboard";
import { AnimatePresence } from "framer-motion";

import { Fragment } from "react";
import './App.css'
function App() {


  return (
    <>
      <AnimatePresence>
        <Fragment>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Login />} />
          </Routes>
        </Fragment>
      </AnimatePresence>
    </>
  );
}

export default App
