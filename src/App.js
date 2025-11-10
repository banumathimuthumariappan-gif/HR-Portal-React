import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HRDashboard from "./components/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeDetails from "./components/EmployeeDetails";
import LeaveRequest from "./components/LeaveRequest";
import "./App.css";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/hr"
          element={role === "HR" ? <HRDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/employee"
          element={
            role === "Employee" ? <EmployeeDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/employee-details"
          element={
            role === "HR" ? <EmployeeDetails /> : <Navigate to="/" />
          }
        />
        <Route
          path="/leave"
          element={
            role === "Employee" ? <LeaveRequest /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
