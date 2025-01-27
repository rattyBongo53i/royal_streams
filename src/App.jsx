
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './Pages/Login'
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import  Finance  from "./Pages/Finance";
import Invoice from "./Pages/Invoice";
import Teacher from "./Pages/Teacher";
import Reports from "./Pages/Reports";
import Students from "./Pages/Students";
import Classes from "./Pages/Classes";
import Settings from "./Pages/Settings";
import Staff from "./Pages/Staff";
import IncomeDetail from "./components/Finance/IncomeDetail";
import EditInvoice from "./components/Finance/EditInvoice";
import Invoices from "./components/Finance/Invoices";
import EditFamily from "./components/Family/edit";
import CreateFamily from "./components/Family/create";
import EditStudent from "./components/Student/edit";
import CreateStudent from "./components/Student/create";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";
import Sandbox from "./Pages/Sandbox";
import PrivateRoutes from "./PrivateRoute";
import './App.css'

function App() {
  const location = useLocation();


  return (
    <>
      <AnimatePresence wait>
        <AuthProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/sandbox" element={<Sandbox />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/income-detail" element={<IncomeDetail />} />
              <Route path="/edit-invoice" element={<EditInvoice />} />
              <Route path="/edit-invoices/:id" element={<Invoices />} />
              <Route path="/edit-family/:id" element={<EditFamily />} />
              <Route path="/create-family" element={<CreateFamily />} />
              <Route path="/edit-student/:id" element={<EditStudent />} />
              <Route path="/create-student" element={<CreateStudent />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
}

export default App;
